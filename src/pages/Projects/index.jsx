import style from './style.module.scss'
import React from 'react'
import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import ContentsTable from '../../components/ContentsTable'
import PopUpMessage from './PopUpDialog'
import EditPopUpMessage from './EditPopUpDialog'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { CSVLink } from 'react-csv'
import api from '../../config'
import EditPopUpMessage from './EditPopUpDialog'
import ArchiveProject from './ArchiveProject'

const Projects = () => {
  const [projects, setProjects] = useState([{}])
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [visibleArchive, setVisibleArchive] = React.useState(false)
  const [archive, setArchive] = React.useState({})
  const [edit, setEdit] = React.useState({})

  const getProjects = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/ProjectPage`, {
        credentials: 'include'
      })
      const res = await result.json()
      setProjects(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }

  useEffect(() => {
    getProjects()
  }, [projects])

  const columns = [
    { title: 'name', dataIndex: 'project_name' },
    { title: 'scrum #', dataIndex: 'scrum_number' },
    { title: 'Emp #', dataIndex: 'employee_number' },
    { title: 'iteration #', dataIndex: 'iteration_number' }
  ]

  return (
    <PageContainer name={'Projects'}>
      <SearchBar PlaceholderItem={'Search a Project'} />
      <div style={{ width: '90%' }}>
        <ContentsTable
          source={projects}
          columns={columns}
          onEditRow={(e) => {
            setVisibleEdit(true)
            setEdit(e)
          }}
          archiveProject={(e) => {
            setVisibleArchive(true)
            setArchive(e)
          }}
        />
      </div>

      <br />
      <div className={style.buttonsContainer}>
        <div className={style.Create}>
          <Button
            id="Create"
            label="Create Project"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className={style.export}>
          <CSVLink
            style={{
              textDecoration: 'none'
            }}
            data={projects}
            onClick={() => {
              console.log('exporting')
            }}
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
        <PopUpMessage
          clicked={'add'}
          Project={projects}
          onSubmit={() => setVisible(false)}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visibleEdit}
        onHide={() => setVisibleEdit(false)}
      >
        <EditPopUpMessage
          clicked="Edit"
          source={edit}
          onSubmit={() => setVisibleEdit(false)}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center', width: '20vw' }}
        visible={visibleArchive}
        onHide={() => setVisibleArchive(false)}
      >
        <ArchiveProject
          data={archive}
          onSubmit={() => setVisibleArchive(false)}
        />
      </Dialog>
    </PageContainer>
  )
}

export default Projects
