import React, { useState, useReducer } from 'react'
import ContentsTable from './ContentsTable/index'
import api from '../../config'
import style from './style.module.scss'
import { MultiSelect } from 'primereact/multiselect'
import { Dropdown } from 'primereact/dropdown'
import PageContainer from '../../components/PageContainer'
import PiDropDown from '../../components/capacity/PiDropDown'
import DateDropDown from '../../components/capacity/DateDropDown'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { RadioButton } from 'primereact/radiobutton'

export default function Capacity(props) {
  const [selectedScrum, setSelectedScrum] = useState(null)
  const [selectedproject, setSelectedproject] = useState(null)
  const [Itrationlist, setItrationList] = useState([])
  const [itrationsTitles, setItrationsTitles] = useState([])
  //const [category, setCategory] = useState('Pi')
  const [scrums, setScrums] = useState([])
  const [projects, setProjects] = useState([])
  const [date, setDate] = useState([])
  const [pi, setPi] = useState([])

  const [dataFrom, setDataFrom] = useState(-1)
  const [dataTo, setDataTo] = useState(-1)

  const [refresh, updateState] = useReducer((x) => x + 1, 0)
  const [scrumEmployee, setScrumEmployee] = React.useState([])
  const [employeeAbsences, setEmployeeAbsences] = React.useState([])
  const [holidays, setHolidays] = React.useState([])
  const [empAbs, setEmpAbs] = React.useState([])
  const [scrumEmployeesDisplay, setScrumEmployeesDisplay] = React.useState([])
  const [scrumDisplay, setScrumDisplay] = React.useState([])
  const [total, setTotal] = React.useState(null)
  const [CapacityPerIterationTotal, setCapacityPerIterationTotal] =
    React.useState(null)
  const [TotalCapsItr, setTotalCapsItr] = React.useState([])

  const getItrations = async (id) => {
    try {
      const body = {
        id: id
      }
      const data = await fetch(`${api.apiRequest}/GetItration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      const Itration = await data.json()
      setItrationList(Itration.data)
    } catch (error) {
      throw new Error('No data found !!!')
    }
  }

  const getProjectsName = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/projects`, {
        credentials: 'include'
      })
      const res = await result.json()
      setProjects(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }

  const getScrums = async (id) => {
    try {
      const body = {
        id: id
      }
      const result = await fetch(`${api.apiRequest}/GetScrums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      const res = await result.json()
      setScrums(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }

  const getIterationByPi = async (project_id, scrum_ids, pi_from, pi_to) => {
    try {
      const body = {
        project_id: project_id,
        scrum_ids: scrum_ids,
        pi_from: pi_from,
        pi_to: pi_to
      }
      const result = await fetch(`${api.apiRequest}/getIterationByPi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      const res = await result.json()
      setItrationsTitles(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }

  const getScrumEmployee = async (scrumId) => {
    try {
      const result = await fetch(`${api.apiRequest}/getScrumAvailablity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scrumId: scrumId }),
        credentials: 'include'
      })
      const json = await result.json()
      return json.data
    } catch (err) {
      console.log(err)
    }
  }

  const getEmployeeAbsence = async (id) => {
    const body = {
      id: id
    }
    try {
      const result = await fetch(`${api.apiRequest}/getEmployeeAbsence`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      const json = await result.json()
      return json.data
    } catch (err) {
      console.log(err)
    }
  }

  const fetchDatePi = async (id) => {
    const body = { id: id }
    try {
      const result = await fetch(`${api.apiRequest}/GetpiDate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      const res = await result.json()
      const dataItems = res.data.map((item) => ({
        label: item.iteration_name,
        value: item
      }))
      setDate(dataItems)
    } catch (err) {
      setDate([])
      throw new Error('No data found !!!')
    }
  }
  const fetchPi = async (id) => {
    const body = { id: id }
    try {
      const result = await fetch(`${api.apiRequest}/Getpis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      const res = await result.json()
      const dataItems = res.data.map((item) => ({
        label: item.pi_name,
        value: item
      }))
      setPi(dataItems)
    } catch (err) {
      setPi([])
      throw new Error('No data found !!!')
    }
  }

  React.useEffect(() => {
    getProjectsName()
    getScrums()
    getItrations()
    fetchPi()
    fetchDatePi()
  }, [])

  React.useEffect(() => {
    const fetchAbsences = async () => {
      try {
        const promises = scrumEmployeesDisplay.map((scrum) => {
          return Promise.all(
            scrum.employees.map(async (employee) => {
              let absences = await getEmployeeAbsence(employee.id)
              return absences
            })
          )
        })
        const emps = await Promise.all(promises)
        setEmpAbs(emps)
      } catch (error) {
        console.error(error)
      }
    }

    const fetchData = async () => {
      try {
        await getIterationByPi(selectedproject, selectedScrum, dataFrom, dataTo)
        await fetchAbsences()
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [refresh])

  const columns = [
    { title: 'Iteration #', dataIndex: 'iterationName' },
    { title: 'Weeks #', dataIndex: 'weeksNumber' },
    { title: 'Start Date', dataIndex: 'StartDate' }
  ]
  let totalCapacityScrum = []

  const flatten = (arr) => {
    return arr.reduce((acc, val) => {
      return acc.concat(val)
    }, [])
  }

  const capacityScrumPerIteration = scrumEmployeesDisplay.map((scrum, si) => ({
    scrum_name: scrum.scrum_name,
    capacityPerIteration: totalCapacityScrum?.map((e) => e.sum),
    // slice TotalCapsItr from 0 to 2
    totalcapsT: TotalCapsItr[0]
      ?.slice(
        si * flatten(itrationsTitles).length,
        si * flatten(itrationsTitles).length + flatten(itrationsTitles).length
      )
      .reduce((acc, val) => acc + val.sum, 0),
    ...flatten(itrationsTitles).reduce((acc, subItem, index) => {
      if (!TotalCapsItr.length) return

      return {
        ...acc,
        [`${subItem.iteration_name}.${subItem.iteration_number}`]:
          TotalCapsItr[0][index + si * flatten(itrationsTitles).length]?.sum
      }
    }, {})
  }))

  const itrTitles = []
  itrationsTitles.map((title) => {
    title.map((subItem, index) => {
      if (!TotalCapsItr.length) return
      console.log(2, totalCapacityScrum)
      itrTitles.push({
        title: `${subItem.iteration_name}.${subItem.iteration_number}`,
        dataIndex: `${subItem.iteration_name}.${subItem.iteration_number}`
      })
    })
  })

  const columns2 = [
    { title: 'Scrum', dataIndex: `scrum_name` },
    ...itrTitles,
    { title: `Total`, dataIndex: `totalcapsT` }
  ]
  console.log(columns2)
  console.log(capacityScrumPerIteration)
  // const itrcapacities = []
  // const secondTable = []
  // if (scrums) {
  //   itrationsTitles.forEach((title) => {
  //     title.forEach((subItem) => {
  //       const propName = `${subItem.iteration_name}.${subItem.iteration_number}`
  //       const diff = getDaysBetweenDates(
  //         subItem.iteration_start_date,
  //         subItem.iteration_end_date
  //       )
  //       const capacity = (scrumCapacity / diff).toFixed(1)
  //       itrcapacities.push({ [propName]: capacity })
  //     })
  //   })
  //   const totalCapacity = itrcapacities.reduce((total, obj) => {
  //     const capacityValue = Object.values(obj)[0]
  //     return total + parseFloat(capacityValue)
  //   }, 0)
  //   const mergedCapacities = Object.assign(
  //     {},
  //     { scrumName: scrums.length > 0 ? scrums[0].scrum_name : 0 },
  //     ...itrcapacities,
  //     { total: totalCapacity.toFixed(1) }
  //   )

  //=================================================================================
  function getDaysBetweenDates(date1, date2) {
    date1 = new Date(date1)
    date2 = new Date(date2)
    let timeDiff = date2.getTime() - date1.getTime()
    let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    daysDiff += 1
    return daysDiff
  }

  function countWeekends(startDate, endDate) {
    let count = 0
    let currentDate = new Date(startDate)
    while (currentDate <= endDate) {
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        count++
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return count
  }
  let totalcaps = 0

  const enrichEmployees = (scrum) => {
    scrum.map((employee) => {
      employee.travelSum = 0
      employee.sickLeaveSum = 0
      employee.casualLeaveSum = 0
      employee.armyDuty = 0
      employee.vacation = 0
      employee.holiday = 0
      employee.totalAbsences = 0
      employee.availablity = 0
      employee.capacity = 0

      empAbs.map((employeeAbsence) => {
        let result = employeeAbsence.find(
          ({ employee_id }) => employee.id === employee_id
        )
        if (!result) return
        let firstPiStartDate = new Date(
          itrationsTitles[0][0].iteration_start_date
        )
        let lastPiEndDate = new Date(
          itrationsTitles[itrationsTitles.length - 1][
            itrationsTitles[itrationsTitles.length - 1].length - 1
          ].iteration_end_date
        )
        if (result.absences) {
          result.absences.forEach((e) => {
            const date1 = new Date(e.absence_start_date)
            const date2 = new Date(e.absence_end_date)
            if (date1 >= firstPiStartDate && date2 <= lastPiEndDate) {
              const difference = getDaysBetweenDates(date1, date2)
              employee.holiday += difference
            }
          })
        }

        result.employee_absence.forEach((e) => {
          if (
            e.absence_type_start_date >= firstPiStartDate &&
            e.absence_type_end_date <= lastPiEndDate
          ) {
            if (e.absence_type === 'T') {
              const difference = getDaysBetweenDates(
                e.absence_type_start_date,
                e.absence_type_end_date
              )
              employee.travelSum += difference
            }
            if (e.absence_type === 'SL') {
              const difference = getDaysBetweenDates(
                e.absence_type_start_date,
                e.absence_type_end_date
              )
              employee.sickLeaveSum += difference
            }
            if (e.absence_type === 'CL') {
              const difference = getDaysBetweenDates(
                e.absence_type_start_date,
                e.absence_type_end_date
              )
              employee.casualLeaveSum += difference
            }
            if (e.absence_type === 'AD') {
              const difference = getDaysBetweenDates(
                e.absence_type_start_date,
                e.absence_type_end_date
              )
              employee.armyDuty += difference
            }
            if (e.absence_type === 'V') {
              const difference = getDaysBetweenDates(
                e.absence_type_start_date,
                e.absence_type_end_date
              )
              employee.vacation += difference
            }
          }
        })

        let totalAbsence =
          employee.vacation +
          employee.armyDuty +
          employee.casualLeaveSum +
          employee.sickLeaveSum +
          employee.travelSum +
          employee.holiday

        let totalPiDays = getDaysBetweenDates(firstPiStartDate, lastPiEndDate)
        let totalWhithoutAbsences =
          totalPiDays -
          countWeekends(firstPiStartDate, lastPiEndDate) -
          totalAbsence

        employee.availablity = totalWhithoutAbsences
        employee.totalAbsences = totalAbsence
        employee.capacity =
          (+employee.productivity * totalWhithoutAbsences) / 100
        totalcaps += employee.capacity
      })

      setTotal(totalcaps)
    })
    return scrum
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++

  let totalcapcityPerIteration = 0
  let sumcapcityPerIteration = 0

  const enrichIteration = (scrum) => {
    itrationsTitles.map((row) => {
      row.map((col) => {
        scrum.map((employee) => {
          employee.travelSum = 0
          employee.sickLeaveSum = 0
          employee.casualLeaveSum = 0
          employee.armyDuty = 0
          employee.vacation = 0
          employee.holiday = 0
          employee.totalAbsences = 0
          employee.availablity = 0
          employee.capacity = 0
          console.log({ empAbs, scrum })
          empAbs.map((employeeAbsence) => {
            let result = employeeAbsence.find(
              ({ employee_id }) => employee.id === employee_id
            )
            if (!result) return
            let iterationStartDate = new Date(col.iteration_start_date)
            let iterationEndDate = new Date(col.iteration_end_date)
            if (result.absences) {
              result.absences.forEach((e) => {
                const date1 = new Date(e.absence_start_date)
                const date2 = new Date(e.absence_end_date)
                if (date1 >= iterationStartDate && date2 <= iterationEndDate) {
                  const difference = getDaysBetweenDates(date1, date2)
                  employee.holiday += difference
                }
              })
            }

            result.employee_absence.forEach((e) => {
              if (
                e.absence_type_start_date >= iterationStartDate &&
                e.absence_type_end_date <= iterationEndDate
              ) {
                if (e.absence_type === 'T') {
                  const difference = getDaysBetweenDates(
                    e.absence_type_start_date,
                    e.absence_type_end_date
                  )
                  employee.travelSum += difference
                }
                if (e.absence_type === 'SL') {
                  const difference = getDaysBetweenDates(
                    e.absence_type_start_date,
                    e.absence_type_end_date
                  )
                  employee.sickLeaveSum += difference
                }
                if (e.absence_type === 'CL') {
                  const difference = getDaysBetweenDates(
                    e.absence_type_start_date,
                    e.absence_type_end_date
                  )
                  employee.casualLeaveSum += difference
                }
                if (e.absence_type === 'AD') {
                  const difference = getDaysBetweenDates(
                    e.absence_type_start_date,
                    e.absence_type_end_date
                  )
                  employee.armyDuty += difference
                }
                if (e.absence_type === 'V') {
                  const difference = getDaysBetweenDates(
                    e.absence_type_start_date,
                    e.absence_type_end_date
                  )
                  employee.vacation += difference
                }
              }
            })

            let totalAbsence =
              employee.vacation +
              employee.armyDuty +
              employee.casualLeaveSum +
              employee.sickLeaveSum +
              employee.travelSum +
              employee.holiday

            let totalPiDays = getDaysBetweenDates(
              iterationStartDate,
              iterationEndDate
            )
            let totalWhithoutAbsences =
              totalPiDays -
              countWeekends(iterationStartDate, iterationEndDate) -
              totalAbsence

            employee.availablity = totalWhithoutAbsences
            employee.totalAbsences = totalAbsence
            employee.capacity =
              (+employee.productivity * totalWhithoutAbsences) / 100
            totalcapcityPerIteration += employee.capacity
            setCapacityPerIterationTotal(totalcapcityPerIteration)
            sumcapcityPerIteration += totalcapcityPerIteration
            console.log('totalcapcityPerIteration', totalcapcityPerIteration)

            totalcapcityPerIteration = 0
            console.log('sumcapcityPerIteration', sumcapcityPerIteration)
          })
        })
        totalCapacityScrum.push({ sum: sumcapcityPerIteration })
        sumcapcityPerIteration = 0
      })
    })
    setTotalCapsItr(
      TotalCapsItr.concat([totalCapacityScrum]).filter((x) => x.length)
    )
    return scrum
  }
  console.log('TotalCapsItr', TotalCapsItr)

  React.useEffect(() => {
    async function fetchScrumEmployees() {
      const employeesDisplay = await Promise.all(
        scrums
          .filter((scrum) => selectedScrum.includes(scrum.scrum_id))
          .map(async (scrum) => {
            const scrumEmployeeTemp = await getScrumEmployee(scrum.scrum_id)
            let newScrum = enrichEmployees(scrumEmployeeTemp)
            console.log('TEST', newScrum)
            return {
              scrum_name: scrum.scrum_name,
              employees: newScrum
            }
          })
      )

      setScrumEmployeesDisplay(employeesDisplay)
    }

    fetchScrumEmployees()
  }, [selectedScrum, scrums, empAbs])

  //=========================================================
  React.useEffect(() => {
    async function fetchScrum() {
      const employeesDisplay = await Promise.all(
        scrums
          .filter((scrum) => selectedScrum.includes(scrum.scrum_id))
          .map(async (scrum) => {
            const scrumTemp = await getScrumEmployee(scrum.scrum_id)
            let newScrum = enrichIteration(scrumTemp)

            return {
              scrum_name: scrum.scrum_name,
              scrumDetails: newScrum
            }
          })
      )

      setScrumDisplay(employeesDisplay)
    }

    fetchScrum()
  }, [selectedScrum, scrums, empAbs])
  //=========================================================

  const columns3 = [
    { title: 'ID', dataIndex: 'id_number' },
    { title: 'Name', dataIndex: 'employee_name' },
    { title: 'Location', dataIndex: 'country_name' },
    { title: 'Role', dataIndex: 'job_name' },
    { title: 'App', dataIndex: 'application_name' },
    { title: 'Weekend', dataIndex: 'weekend_days' },
    { title: 'Productivity', dataIndex: 'productivity' },
    { title: 'Travel', dataIndex: 'travelSum' },
    { title: 'Sick Leave', dataIndex: 'sickLeaveSum' },
    { title: 'Casual Leave', dataIndex: 'casualLeaveSum' },
    { title: 'Holiday', dataIndex: 'holiday' },
    { title: 'Army Duty', dataIndex: 'armyDuty' },
    { title: 'Vacation', dataIndex: 'vacation' },
    { title: 'total Absences', dataIndex: 'totalAbsences' },
    { title: 'Availablity', dataIndex: 'availablity' },
    { title: 'Capacity', dataIndex: 'capacity' }
  ]

  return (
    <PageContainer name={'Capacity'}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        <Dropdown
          id="Project"
          name="Project"
          value={selectedproject}
          options={projects}
          optionValue="id"
          optionLabel="project_name"
          placeholder="Project"
          required
          className="w-full md:w-14rem"
          onChange={(e) => {
            setSelectedproject(e.value)
            getScrums(e.value)
            getItrations(e.value)
            setSelectedScrum([])
          }}
        />
        <span>&nbsp;</span>
        <MultiSelect
          id="scrums"
          name="scrum"
          value={selectedScrum}
          options={scrums}
          optionLabel="scrum_name"
          optionValue="scrum_id"
          placeholder="choose Scrum"
          required
          className="w-full md:w-14rem"
          onChange={(e) => {
            setSelectedScrum(e.value)
            fetchPi(selectedproject)
            fetchDatePi(selectedproject)
          }}
        />
        <br />

        <PiDropDown
          pi={pi}
          setDataFrom={setDataFrom}
          setDataTo={setDataTo}
          update={updateState}
        />
      </div>

      <br />
      <div className={style.iterationTables}>
        <div className={style.leftTable}>
          <ContentsTable source={Itrationlist} columns={columns} />
        </div>
        <div className={style.rightTable}>
          <ContentsTable
            source={capacityScrumPerIteration}
            columns={columns2}
            footer
          />
          <div
            style={{
              bottom: '10px',

              backgroundColor: 'red'
            }}
          >
            Total
          </div>
        </div>
      </div>

      <br />
      <div
        style={{
          width: '98%',
          padding: '10px',
          backgroundColor: 'white',
          borderRadius: '10px'
        }}
      >
        {scrumEmployeesDisplay.map((scrumEmployees) => (
          <div key={scrumEmployees.scrum_name}>
            <h2>{scrumEmployees.scrum_name} Scrum </h2>
            <ContentsTable
              source={scrumEmployees.employees}
              columns={columns3}
            />
          </div>
        ))}
      </div>
    </PageContainer>
  )
}
