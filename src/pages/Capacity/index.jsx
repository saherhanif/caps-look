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

  // console.log('selectedScrum', selectedScrum)
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
        return absences;
      });
  
      const emps = await Promise.all(promises);
      setEmpAbs(emps);
      console.log('hereeee',emps);
    };
   fetchData()

    getIterationByPi(selectedproject, selectedScrum, dataFrom, dataTo);
  }, [refresh]);
  
  console.log('nowwwwww',empAbs);
  
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

  console.log('employees :' ,scrumEmployee);
  console.log('there details :' ,empAbs);

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
    { title: 'Travel', dataIndex: 'travelSum' },
    { title: 'Sick Leave', dataIndex: 'sickLeaveSum' },
    { title: 'Casual Leave', dataIndex: 'casualLeaveSum' },
    { title: 'Holiday', dataIndex: 'holiday' },
    { title: 'Army Duty', dataIndex: 'armyDuty' },
    { title: 'Vacation', dataIndex: 'vacation' },
    { title: 'total Absences', dataIndex: 'totalAbsences' }
   
  ]

  // console.log('holidays:', holidays)
  // console.log('employeeAbsences:', employeeAbsences)
  // console.log('111111', itrationsTitles)
  // console.log(
  //   'aaaaaa',
  //   itrationsTitles[0],
  //   itrationsTitles[itrationsTitles.length - 1]
  // )
  const arrayOfSums = [];

  empAbs.forEach((emp) => {
    const absenceSum = {
      travelSum: 0,
      sickLeaveSum: 0,
      casualLeaveSum: 0,
      armyDuty: 0,
      vacation: 0,
      holiday: 0,
    };
  
    emp.employee_absence.forEach((e) => {
      if (e.absence_type === 'T') {
        const difference = getDaysBetweenDates(
          e.absence_type_start_date,
          e.absence_type_end_date
        );
        absenceSum.travelSum += difference;
      }
      if (e.absence_type === 'SL') {
        const difference = getDaysBetweenDates(
          e.absence_type_start_date,
          e.absence_type_end_date
        );
        absenceSum.sickLeaveSum += difference;
      }
      if (e.absence_type === 'CL') {
        const difference = getDaysBetweenDates(
          e.absence_type_start_date,
          e.absence_type_end_date
        );
        absenceSum.casualLeaveSum += difference;
      }
      if (e.absence_type === 'AD') {
        const difference = getDaysBetweenDates(
          e.absence_type_start_date,
          e.absence_type_end_date
        );
        absenceSum.armyDuty += difference;
      }
      if (e.absence_type === 'V') {
        const difference = getDaysBetweenDates(
          e.absence_type_start_date,
          e.absence_type_end_date
        );
        absenceSum.vacation += difference;
      }
    });
  
    emp.absences.forEach((e) => {
      const date1 = new Date(e.absence_start_date);
      const date2 = new Date(e.absence_end_date);
      const difference = getDaysBetweenDates(date1, date2);
      absenceSum.holiday += difference;
    });
  
    arrayOfSums.push(absenceSum);
  });
  
  console.log('arrayOfSums', arrayOfSums);
  
  
  function getDaysBetweenDates(date1, date2) {
    date1 = new Date(date1)
    date2 = new Date(date2)
    const timeDiff = date2.getTime() - date1.getTime()
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    return daysDiff
  }

  // for (let i = 0; i < scrumEmployee.length; i++) {
    //   scrumEmployee.push({
      //     ...scrumEmployee[i],
      //     attendanceCount: arrayOfSums[i]
      //   });
      // }
      
console.log('not yet',arrayOfSums);     
const combinedArray = scrumEmployee.map((employee, index) => {
  let item = arrayOfSums[index];
  let sum =  (item ? item.travelSum : 0)+(item ? item.sickLeaveSum : 0)+(item ? item.casualLeaveSum : 0)+(item ? item.armyDuty : 0)+(item ? item.vacation : 0)+(item ? item.holiday : 0)
  return {
    ...employee,
    travelSum: item ? item.travelSum : 0,
    sickLeaveSum: item ? item.sickLeaveSum : 0,
    casualLeaveSum: item ? item.casualLeaveSum : 0,
    armyDuty: item ? item.armyDuty : 0,
    vacation: item ? item.vacation : 0,
    holiday: item ? item.holiday : 0,
    totalAbsences: sum
  };
});

console.log('we got here',combinedArray);
      // console.log('employees: ', scrumEmployee)
      
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
      <ContentsTable source={combinedArray} columns={columns3} />
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
