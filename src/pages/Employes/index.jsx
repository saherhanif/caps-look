import React from 'react'
import style from './style.module.scss'
import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import ContentsTable from '../../components/ContentsTable'
import AddEmployeePopUp from './addEmployeePopUp/index'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { CSVLink } from 'react-csv'
import api from '../../config'
import ArchiveEmployee from './ArchiveEmployee'
import EditEmployeeDetails from './EditEmployeeDetails'

const Employee = () => {
  const [employees, setEmployees] = useState([{}])
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [visibleArchiveEmployee, setVisibleArchiveEmployee] =
    React.useState(false)
  const [archiveEmployee, setArchiveEmployee] = React.useState({})
  const [edit, setEdit] = React.useState({})
  const [sites, setSites] = useState([{}])
  const [jobs, setJobs] = useState([{}])

  const arr = [
    { access_tier: 'no_access' },
    { access_tier: 'scrum_master' },
    { access_tier: 'project_manager' },
    { access_tier: 'resource_manager' }
  ]

  const getEmployees = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/Employee`, {
        credentials: 'include'
      })
      const res = await result.json()
      setEmployees(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }
  const getSites = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/Sites`, {
        credentials: 'include'
      })
      const res = await result.json()
      setSites(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }
  const getJobsName = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/Jobs`, {
        credentials: 'include'
      })
      const res = await result.json()
      setJobs(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }
  useEffect(() => {
    getEmployees()
    getJobsName()
    getSites()
  }, [])

  const columns = [
    { title: 'ID', dataIndex: 'id_number' },
    { title: 'Name', dataIndex: 'employee_name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone ', dataIndex: 'phone' },
    { title: 'Productivity', dataIndex: 'productivity' },
    { title: 'Role', dataIndex: 'job_name' },
    { title: 'Project', dataIndex: 'project_name' },
    { title: 'Scrum', dataIndex: 'scrum_name' },
    { title: 'Application', dataIndex: 'application_name' }
  ]

  return (
    <PageContainer name={'Employees'}>
      <SearchBar PlaceholderItem={'Search an employee'} />
      <div style={{ width: '90%' }}>
        <ContentsTable
          source={employees}
          columns={columns}
          onEditRow={(e) => {
            setVisibleEdit(true)
            setEdit(e)
          }}
          archiveRow={(e) => {
            setVisibleArchiveEmployee(true)
            setArchiveEmployee(e)
          }}
        />
      </div>

      <br />
      <div className={style.buttonsContainer}>
        <div className={style.Create}>
          <Button
            id="add"
            label="add employee"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className={style.export}>
          <CSVLink
            style={{
              textDecoration: 'none'
            }}
            data={employees}
          >
            <button>Export as CSV</button>
          </CSVLink>
        </div>
        <br />
      </div>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visible}
        onHide={() => {
          setVisible(false)
        }}
      >
        <AddEmployeePopUp
          source={employees}
          sites={sites}
          jobs={jobs}
          arr={arr}
          onSubmit={() => setVisible(false)}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visibleEdit}
        onHide={() => setVisibleEdit(false)}
      >
        <EditEmployeeDetails
          source={edit}
          sites={sites}
          jobs={jobs}
          arr={arr}
          onSubmit={() => setVisibleEdit(false)}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center', width: '20vw' }}
        visible={visibleArchiveEmployee}
        onHide={() => setVisibleArchiveEmployee(false)}
      >
        <ArchiveEmployee
          data={archiveEmployee}
          onSubmit={() => setVisibleArchiveEmployee(false)}
        />
      </Dialog>
    </PageContainer>
  )
}

export default Employee
