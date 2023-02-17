import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart'

export default function SiteMix() {
  const [chartPlannedData, setChartPlannedData] = useState({})
  const [chartActualData, setChartActualData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    async function getData() {
      const response = await fetch('http://localhost:4000/GetActualSiteMix/2', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
      const actual = await response.json()

      const plannedresponse = await fetch(
        'http://localhost:4000/GetPlannedSiteMix/2',
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        }
      )
      const planned = await plannedresponse.json()

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
        labels: Object.keys(actual),

        datasets: [
          {
            data: Object.values(actual),
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
