import style from './style.module.scss'
import React from 'react'
import { useState, useEffect } from 'react'
import ContentsTable from '../../../components/ContentsTable'
import { CSVLink } from 'react-csv'
import api from '../../../config'
import { Dialog } from 'primereact/dialog'
import EditMilestonesProject from './EditMilestonesProject'
import ArchiveMilestone from './ArchiveMilestonesProject'
const MilestoneTable = ({ selectProjectState }) => {
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [edit, setEdit] = React.useState({})
  const [visibleArchive, setVisibleArchive] = React.useState(false)
  const [archive, setArchive] = React.useState({})
  const columns = [
    { title: 'Name', dataIndex: 'milestone_name' },
    { title: 'Start Date', dataIndex: 'milestone_start_date' },
    { title: 'End Date', dataIndex: 'milestone_end_date' },
    { title: 'Description', dataIndex: 'description' }
  ]
  const [milestonesProject, setMilestonesProject] = useState([
    {
      id: '',
      milestone_name: '',
      milestone_start_date: '',
      milestone_end_date: '',
      description: ''
    }
  ])
  const [data, setData] = useState({
    project_id: selectProjectState
  })
  useEffect(() => {
    setData({
      project_id: selectProjectState
    })
  }, [selectProjectState])
  const getMilestonesProject = async () => {
    if (data.project_id !== '') {
      try {
        console.log(data)
        const body = data
        const result = await fetch(`${api.apiRequest}/milestoneProject`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        const res = await result.json()
        console.log(res.data)
        setMilestonesProject(res.data)
      } catch (error) {
        throw new Error('No data found !!!')
      }
    }
  }
  useEffect(() => {
    getMilestonesProject()
  }, [data])
  return (
    <>
      <div style={{ width: '90%' }}>
        <ContentsTable
          source={milestonesProject}
          columns={columns}
          onEditRow={(e) => {
            setVisibleEdit(true)
            setEdit(e)
          }}
          archiveRow={(e) => {
            setVisibleArchive(true)
            setArchive(e)
          }}
        />
      </div>
      <Dialog
        visible={visibleEdit}
        onHide={() => {
          setVisibleEdit(false)
        }}
        style={{
          width: '20vw'
        }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      >
        <EditMilestonesProject
          source={edit}
          onSubmit={() => setVisibleEdit(false)}
        ></EditMilestonesProject>
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center', width: '20vw' }}
        visible={visibleArchive}
        onHide={() => setVisibleArchive(false)}
      >
        <ArchiveMilestone
          data={archive}
          onSubmit={() => setVisibleArchive(false)}
        />
      </Dialog>
      <br />
      <div className={style.buttonsContainer}>
        <br />
      </div>
      <CSVLink
        style={{
          textDecoration: 'none'
        }}
        data={milestonesProject}
      >
        <button className={style.exportbutton}>Export as CSV</button>
      </CSVLink>
    </>
  )
}

export default MilestoneTable
