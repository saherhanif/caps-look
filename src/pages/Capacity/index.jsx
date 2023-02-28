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
  const scrumIdExample = { scrumId: 1 }
  const [empAbs, setEmpAbs] = React.useState([])

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

  const getScrumEmployee = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/getScrumAvailablity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scrumIdExample),
        credentials: 'include'
      })
      const json = await result.json()
      setScrumEmployee(json.data)
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
    getScrumEmployee(scrumIdExample)
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      const promises = scrumEmployee.map(async (employee) => {
        let absences = await getEmployeeAbsence(employee.id)
        return absences
      })

      const emps = await Promise.all(promises)
      setEmpAbs(emps)
    }
    fetchData()

    getIterationByPi(selectedproject, selectedScrum, dataFrom, dataTo)
  }, [refresh])

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

  //console.log('selectedScrum', selectedScrum)
  // console.log('selectedproject', selectedproject)
  //console.log('Itrationlist', Itrationlist)
  // console.log('scrums', scrums)
  // console.log('projects', projects)
  // console.log('dataFrom', dataFrom)
  //console.log('date', date)
  // console.log('pi', pi)
  // console.log('dataFrom', dataFrom)
  // console.log('dataTo', dataTo)
  // console.log('scrumEmployee', scrumEmployee)
  //console.log('employeeAbsences', employeeAbsences)
  //console.log('holidays', holidays)
  //console.log('ItrationsTitles', itrationsTitles)
  //console.log('hereeee', emps)
  //console.log('nowwwwww', empAbs)
  //console.log('employees :', scrumEmployee)
  //console.log('there details :', empAbs)
  //console.log('arrayOfSums', arrayOfSums)
  //console.log('not yet', arrayOfSums)
  //console.log('we got here', combinedArray)

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
    { title: 'total Absences', dataIndex: 'totalAbsences' }
  ]

  const arrayOfSums = []
  console.log('empAbsss', empAbs)
  empAbs.forEach((emp) => {
    const absenceSum = {
      travelSum: 0,
      sickLeaveSum: 0,
      casualLeaveSum: 0,
      armyDuty: 0,
      vacation: 0,
      holiday: 0
    }
    console.log('emp:', emp)

    emp.employee_absence.forEach((e) => {
      if (e.absence_type === 'T') {
        const difference = getDaysBetweenDates(
          e.absence_type_start_date,
          e.absence_type_end_date
        )
        console.log('twst11111', difference)
        absenceSum.travelSum += difference
      }
      if (e.absence_type === 'SL') {
        const difference = getDaysBetweenDates(
          e.absence_type_start_date,
          e.absence_type_end_date
        )
        absenceSum.sickLeaveSum += difference
      }
      if (e.absence_type === 'CL') {
        const difference = getDaysBetweenDates(
          e.absence_type_start_date,
          e.absence_type_end_date
        )
        absenceSum.casualLeaveSum += difference
      }
      if (e.absence_type === 'AD') {
        const difference = getDaysBetweenDates(
          e.absence_type_start_date,
          e.absence_type_end_date
        )
        absenceSum.armyDuty += difference
      }
      if (e.absence_type === 'V') {
        const difference = getDaysBetweenDates(
          e.absence_type_start_date,
          e.absence_type_end_date
        )
        absenceSum.vacation += difference
      }
    })

    itrationsTitles.map((row) => {
      row.map((col) => {
        let date3 = new Date(col.iteration_start_date)
        let date4 = new Date(col.iteration_end_date)
        emp.absences.forEach((e) => {
          let date1 = new Date(e.absence_start_date)
          let date2 = new Date(e.absence_end_date)
          // console.log('====================================')
          // console.log('Name , date1', e.absence_name, date1)
          // console.log('Name ,date2', e.absence_name, date2)
          // console.log('date3', date3)
          // console.log('date4', date4)
          // console.log('====================================')
          if (date1 >= date3 && date2 <= date4) {
            const difference = getDaysBetweenDates(date1, date2)
            absenceSum.holiday += difference
            //console.log('absenceSum.holiday', absenceSum.holiday)
          }
        })
      })
    })

    const daysOfIteration = getDaysBetweenDates(
      iterationsDates[0],
      iterationsDates[iterationsDates.length - 1]
    )

    const weekendsOfIteration = countWeekends(
      iterationsDates[0],
      iterationsDates[iterationsDates.length - 1]
    )
    const availablity = daysOfIteration
    arrayOfSums.push(absenceSum)
  })

  // console.log('arrayOfSums', arrayOfSums)

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

  let iterationsDates = []
  const day1ofIteration = itrationsTitles.map((row) => {
    row.map((col) => {
      iterationsDates.push(new Date(col.iteration_start_date))
      iterationsDates.push(new Date(col.iteration_end_date))
    })
  })

  const daysOfIteration = getDaysBetweenDates(
    iterationsDates[0],
    iterationsDates[iterationsDates.length - 1]
  )

  const weekendsOfIteration = countWeekends(
    iterationsDates[0],
    iterationsDates[iterationsDates.length - 1]
  )

  console.log('daysOfIteration', daysOfIteration)
  console.log('weekendsOfIteration', weekendsOfIteration)

  const combinedArray = scrumEmployee.map((employee, index) => {
    let item = arrayOfSums[index]
    let sum =
      (item ? item.travelSum : 0) +
      (item ? item.sickLeaveSum : 0) +
      (item ? item.casualLeaveSum : 0) +
      (item ? item.armyDuty : 0) +
      (item ? item.vacation : 0) +
      (item ? item.holiday : 0)
    return {
      ...employee,
      travelSum: item ? item.travelSum : 0,
      sickLeaveSum: item ? item.sickLeaveSum : 0,
      casualLeaveSum: item ? item.casualLeaveSum : 0,
      armyDuty: item ? item.armyDuty : 0,
      vacation: item ? item.vacation : 0,
      holiday: item ? item.holiday : 0,
      totalAbsences: sum
    }
  })

  //=================================================================================
  //if (category === 'Pi') {
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
        {/* <div className={style.containerSelector}>
          <label>select one</label>
          <div className={style.card}>
            <div className={style.pi}>
              <RadioButton
                inputId="category1"
                name="Pi"
                value="Pi"
                onChange={(e) => {
                  setCategory(e.value)
                  fetchPi(selectedproject)
                }}
                checked={category === 'Pi'}
              />
              <label htmlFor="category1" className="ml2">
                Pi
              </label>
            </div>

            <div className={style.date}>
              <RadioButton
                inputId="category2"
                name="Date"
                value="Date"
                onChange={(e) => {
                  fetchDatePi([])
                }}
                checked={category === 'Date'}
              />
              <label htmlFor="category2" className="ml2">
                Date
              </label>
            </div>
          </div>
        </div> */}

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
              // position: 'absolute',
              bottom: '10px',
              // width: '100%',
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
        <ContentsTable source={combinedArray} columns={columns3} />
      </div>
    </PageContainer>
  )
  //}
  // else if (category === 'Date') {
  //   return (
  //     <PageContainer name={'Capacity'}>
  //       <Dropdown
  //         id="Project"
  //         name="Project"
  //         value={selectedproject}
  //         options={projects}
  //         optionValue="id"
  //         optionLabel="project_name"
  //         placeholder="Project"
  //         required
  //         className="w-full md:w-14rem"
  //         onChange={(e) => {
  //           setSelectedproject(e.value)
  //           getScrums(e.value)
  //         }}
  //       />
  //       <br />
  //       <MultiSelect
  //         id="scrums"
  //         name="scrum"
  //         value={selectedScrum}
  //         options={scrums}
  //         optionLabel="scrum_name"
  //         optionValue="scrum_name"
  //         placeholder="choose Scrum"
  //         required
  //         className="w-full md:w-14rem"
  //         onChange={(e) => {
  //           setSelectedScrum(e.value)
  //         }}
  //       />
  //       <br />
  //       <div className={style.containerSelector}>
  //         <label>select one</label>
  //         <div className={style.card}>
  //           <div className={style.pi}>
  //             <RadioButton
  //               inputId="category1"
  //               name="Pi"
  //               value="Pi"
  //               onChange={(e) => {
  //                 setCategory(e.value)
  //                 fetchPi(selectedproject)
  //               }}
  //               checked={category === 'Pi'}
  //             />
  //             <label htmlFor="category1" className="ml2">
  //               Pi
  //             </label>
  //           </div>

  //           <div className={style.date}>
  //             <RadioButton
  //               inputId="category2"
  //               name="Date"
  //               value="Date"
  //               onChange={(e) => {
  //                 setCategory(e.value)
  //                 fetchDatePi(selectedproject)
  //               }}
  //               checked={category === 'Date'}
  //             />
  //             <label htmlFor="category2" className="ml2">
  //               Date
  //             </label>
  //           </div>
  //         </div>
  //       </div>
  //       <DateDropDown id={selectedproject} update={updateState} />
  //       <br />
  //       <span className={style.iterationTables}>
  //         <ContentsTable source={Itrationlist} columns={columns} />
  //         <br />
  //         <ContentsTable source={Itrationlist} columns={columns2} />
  //       </span>
  //       <ContentsTable source={scrumEmployee} columns={columns3} />
  //       <br />
  //     </PageContainer>
  //   )
  // }
}
