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

  // console.log('selectedScrum', selectedScrum)
  // console.log('selectedproject', selectedproject)
  //console.log('Itrationlist', Itrationlist)
  console.log('itrationsTitles', itrationsTitles)
  // console.log('scrums', scrums)
  // console.log('projects', projects)
  // console.log('dataFrom', dataFrom)
  //console.log('date', date)
  // console.log('pi', pi)
  // console.log('dataFrom', dataFrom)
  // console.log('dataTo', dataTo)
  // console.log('scrumEmployee', scrumEmployee)
  // console.log('employeeAbsences', employeeAbsences)
  // console.log('holidays', holidays)

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
  console.log('ItrationsTitles', itrationsTitles)

  const getScrumEmployee = async (ids) => {
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
      setEmployeeAbsences(json.data.employee_absence)
      setHolidays(json.data.absences)
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
  //console.log('scrumEmployee', scrumEmployee)
  React.useEffect(() => {
    getProjectsName()
    getScrums()
    getItrations()
    fetchPi()
    fetchDatePi()
    getScrumEmployee(scrumIdExample)
    getEmployeeAbsence(1)
  }, [])
  React.useEffect(() => {
    getIterationByPi(selectedproject, selectedScrum, dataFrom, dataTo)
  }, [refresh])
  const columns = [
    { title: 'Itration Number', dataIndex: 'iterationName' },
    { title: 'No.Weeks', dataIndex: 'weeksNumber' },
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
  const columns3 = [
    { title: 'ID', dataIndex: 'id_number' },
    { title: 'Name', dataIndex: 'employee_name' },
    { title: 'Location', dataIndex: 'country_name' },
    { title: 'Role', dataIndex: 'job_name' },
    { title: 'App', dataIndex: 'application_name' },
    { title: 'Weekend', dataIndex: 'weekend_days' },
    { title: 'Productivity', dataIndex: 'productivity' },
    { title: 'Travel', dataIndex: 'absence_type_start_date' },
    { title: 'Absence Type', dataIndex: 'absence_type_end_date' },
    { title: 'Holiday', dataIndex: 'holiday' },
    { title: 'Army Duty', dataIndex: 'absence_type' },
    { title: 'Vacation', dataIndex: '' }
  ]

  // console.log('holidays:', holidays)
  // console.log('employeeAbsences:', employeeAbsences)
  // console.log('111111', itrationsTitles)
  // console.log(
  //   'aaaaaa',
  //   itrationsTitles[0],
  //   itrationsTitles[itrationsTitles.length - 1]
  // )
  const absenceSum = {
    travelSum: 0,
    sickLeaveSum: 0,
    casualLeaveSum: 0,
    armyDuty: 0,
    vacation: 0,
    holiday: 0
  }

  employeeAbsences.map((e) => {
    if (e.absence_type == 'T') {
      const differnce = getDaysBetweenDates(
        e.absence_type_start_date,
        e.absence_type_end_date
      )
      absenceSum.travelSum += differnce
    }
    if (e.absence_type == 'SL') {
      const differnce = getDaysBetweenDates(
        e.absence_type_start_date,
        e.absence_type_end_date
      )
      absenceSum.sickLeaveSum += differnce
    }
    if (e.absence_type == 'CL') {
      const differnce = getDaysBetweenDates(
        e.absence_type_start_date,
        e.absence_type_end_date
      )
      absenceSum.casualLeaveSum += differnce
    }
    if (e.absence_type == 'AD') {
      const differnce = getDaysBetweenDates(
        e.absence_type_start_date,
        e.absence_type_end_date
      )
      absenceSum.armyDuty += differnce
    }
    if (e.absence_type == 'V') {
      const differnce = getDaysBetweenDates(
        e.absence_type_start_date,
        e.absence_type_end_date
      )
      absenceSum.vacation += differnce
    }
  })

  function getDaysBetweenDates(date1, date2) {
    date1 = new Date(date1)
    date2 = new Date(date2)
    const timeDiff = date2.getTime() - date1.getTime()
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    return daysDiff
  }
  if (itrationsTitles[0] && itrationsTitles[0][0]) {
    //   console.log(
    //     'itrationsTitles::: ',
    //     itrationsTitles[0][0].iteration_start_date
    //   )
    const iterationStart = new Date(itrationsTitles[0][0].iteration_start_date)
    const iterationEnd = new Date(itrationsTitles[1][1].iteration_end_date)
    holidays.map((e) => {
      const date1 = new Date(e.absence_start_date)
      const date2 = new Date(e.absence_end_date)
      if (date1 >= iterationStart && date2 <= iterationEnd) {
        const differnce = getDaysBetweenDates(date1, date2)
        absenceSum.holiday += differnce
        console.log('test', absenceSum.holiday)
      }
    })
  }
  // console.log('dataFrom', dataFrom)
  // console.log('date', date)
  console.log('absenceSum', absenceSum)

  //=================================================================================
  //if (category === 'Pi') {
  return (
    <PageContainer name={'Capacity'}>
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
      <br />
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
      <br />
      <span className={style.iterationTables}>
        <ContentsTable source={Itrationlist} columns={columns} />
        <br />
        <ContentsTable source={Itrationlist} columns={columns2} />
      </span>
      <ContentsTable source={scrumEmployee} columns={columns3} />
      <br />
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
