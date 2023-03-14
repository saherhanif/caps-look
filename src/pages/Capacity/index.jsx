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
        console.log('promise all', emps)
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

  console.log('empAbsences:', empAbs)

  const columns = [
    { title: 'Itration #', dataIndex: 'iterationName' },
    { title: 'Weeks #', dataIndex: 'weeksNumber' },
    { title: 'Start Date', dataIndex: 'StartDate' }
  ]

  const itrTitles = []
  itrationsTitles.map((title) => {
    title.map((subItem) => {
      itrTitles.push({
        title: `${subItem.iteration_name}.${subItem.iteration_number}`
      })
    })
  })

  const columns2 = [
    { title: 'Scrum', dataIndex: `scrum_name` },
    ...itrTitles,
    { title: `Total`, dataIndex: `total` }
  ]

  //=================================================================================
  function getDaysBetweenDates(date1, date2) {
    date1 = new Date(date1)
    date2 = new Date(date2)
    const timeDiff = date2.getTime() - date1.getTime()
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
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
      })
    })
    return scrum
  }

  React.useEffect(() => {
    async function fetchScrumEmployees() {
      console.log('selectedScrum', selectedScrum);
      const employeesDisplay = await Promise.all(
        scrums
          .filter((scrum) => selectedScrum.includes(scrum.scrum_id))
          .map(async (scrum) => {
            const scrumEmployeeTemp = await getScrumEmployee(scrum.scrum_id)
            let newScrum = enrichEmployees(scrumEmployeeTemp)

            console.log('employeeee', scrumEmployeeTemp)
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

  console.log('itrTitles: ', itrationsTitles)
  console.log('Employees Tables: ', scrumEmployeesDisplay)
  console.log('Selected Scrum: ', selectedScrum)

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

  //   console.log('what is this ', empAbs)
  //   const arrayOfSums = []
  //   empAbs.forEach((emp) => {
  //     const absenceSum = {
  //       travelSum: 0,
  //       sickLeaveSum: 0,
  //       casualLeaveSum: 0,
  //       armyDuty: 0,
  //       vacation: 0,
  //       holiday: 0
  //     }

  //     itrationsTitles.map((row) => {
  //       row.map((col) => {
  //         let date3 = new Date(col.iteration_start_date)
  //         let date4 = new Date(col.iteration_end_date)
  //         emp.absences.forEach((e) => {
  //           let date1 = new Date(e.absence_start_date)
  //           let date2 = new Date(e.absence_end_date)
  //           if (date1 >= date3 && date2 <= date4) {
  //             const difference = getDaysBetweenDates(date1, date2)
  //             absenceSum.holiday += difference
  //           }
  //         })
  //       })
  //     })

  //     const daysOfIteration = getDaysBetweenDates(
  //       iterationsDates[0],
  //       iterationsDates[iterationsDates.length - 1]
  //     )

  //     const weekendsOfIteration = countWeekends(
  //       iterationsDates[0],
  //       iterationsDates[iterationsDates.length - 1]
  //     )
  //     const availablity = daysOfIteration
  //     arrayOfSums.push(absenceSum)
  //   })

  //   let iterationsDates = []
  //   const day1ofIteration = itrationsTitles.map((row) => {
  //     row.map((col) => {
  //       iterationsDates.push(new Date(col.iteration_start_date))
  //       iterationsDates.push(new Date(col.iteration_end_date))
  //     })
  //   })

  //   const daysOfIteration = getDaysBetweenDates(
  //     iterationsDates[0],
  //     iterationsDates[iterationsDates.length - 1]
  //   )

  //   const weekendsOfIteration = countWeekends(
  //     iterationsDates[0],
  //     iterationsDates[iterationsDates.length - 1]
  //   )

  //   console.log('daysOfIteration', daysOfIteration)
  //   console.log('weekendsOfIteration', weekendsOfIteration)

  //   const combinedArray = scrumEmployee.map((employee, index) => {
  //     let item = arrayOfSums[index]
  //     let sum =
  //       (item ? item.travelSum : 0) +
  //       (item ? item.sickLeaveSum : 0) +
  //       (item ? item.casualLeaveSum : 0) +
  //       (item ? item.armyDuty : 0) +
  //       (item ? item.vacation : 0) +
  //       (item ? item.holiday : 0)
  //     return {
  //       ...employee,
  //       travelSum: item ? item.travelSum : 0,
  //       sickLeaveSum: item ? item.sickLeaveSum : 0,
  //       casualLeaveSum: item ? item.casualLeaveSum : 0,
  //       armyDuty: item ? item.armyDuty : 0,
  //       vacation: item ? item.vacation : 0,
  //       holiday: item ? item.holiday : 0,
  //       totalAbsences: sum
  //     }
  //   })

  //=================================================================================
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
          <ContentsTable source={Itrationlist} columns={columns2} footer />
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
