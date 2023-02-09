import style from './style.module.scss'
import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import ContentsTable from '../../components/ContentsTable'
import PopUpMessage from './PopUpDialog'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import React from 'react'

const RESPONSE_STATUS = {
  FAIL: false,
  SUCCESS: true
};


const Projects = () => {
  const [projects, setProjects] = useState([{}])
  const [visible, setVisible] = React.useState(false) 

  const getProjects = async () => {
    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/ProjectPage`)
      const res = await result.json()
      setProjects(res.data)
      if(res?.status===RESPONSE_STATUS.SUCCESS){
        return "projects retreived successfully" ;
      }
      else {
        return "";
      }
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }


  useEffect(() => {
    getProjects()
  }, [])

  const columns = [
    { title: 'Name', dataIndex: 'project_name' },
    { title: 'Scrum #', dataIndex: 'scrum_number' },
    { title: 'Employee #', dataIndex: 'employee_number' },
    { title: 'Iteration #', dataIndex: 'iteration_number' }
  ]

  return (
    <PageContainer>
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
          <button>Export as CSV</button>
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
