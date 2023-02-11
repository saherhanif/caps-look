import style from './style.module.scss'
import React from 'react'
import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import ContentsTable from '../../components/ContentsTable'
import PopUpMessage from './PopUpDialog'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { CSVLink } from 'react-csv'
import api from '../../config'

const Projects = () => {
  const [projects, setProjects] = useState([{}])
  const [visible, setVisible] = React.useState(false)

  const getProjects = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/ProjectPage`)
      const res = await result.json()
      setProjects(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

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
        <ContentsTable source={projects} columns={columns} />
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
        onHide={() => setVisible(false)}
      >
        <PopUpMessage clicked={'add'} />
      </Dialog>
    </PageContainer>
  )
}

export default Projects
