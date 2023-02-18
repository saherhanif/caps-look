import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart'

export default function SiteMix() {
  const [chartPlannedData, setChartPlannedData] = useState({})
  const [chartActualData, setChartActualData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  require('dotenv').config()
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/GetActualSiteMix/2`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        }
      )
      const actData = await response.json()
      let actual = []
      let actualLabels = []
      actData.data.forEach((element) => {
        actualLabels.push(element.cost_level)
        actual.push(parseInt(element.site_ee))
      })

      const plannedresponse = await fetch(
        `${process.env.REACT_APP_API_URL}/GetPlannedSiteMix/2`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        }
      )
      const planData = await plannedresponse.json()
      let planned = planData.data[0].planned_site_mix
      const documentStyle = getComputedStyle(document.documentElement)
      const plannedData = {
        labels: Object.keys(planned),
        datasets: [
          {
            data: Object.values(planned),
            backgroundColor: [
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500')
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--yellow-400'),
              documentStyle.getPropertyValue('--green-400')
            ]
          }
        ]
      }

      const actualData = {
        labels: actualLabels,

        datasets: [
          {
            data: actual,
            backgroundColor: [
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500')
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--yellow-400'),
              documentStyle.getPropertyValue('--green-400')
            ]
          }
        ]
      }

      const options = {
        cutout: '60%'
      }

      setChartPlannedData(plannedData)
      setChartActualData(actualData)
      setChartOptions(options)
    }
    getData()
  }, [])

  return (
    <div className=" card flex justify-content-center">
      <Chart
        type="doughnut"
        data={chartPlannedData}
        options={chartOptions}
        className="w-4"
      />
      <Chart
        type="doughnut"
        data={chartActualData}
        options={chartOptions}
        className="w-4"
      />
    </div>
  )
}
