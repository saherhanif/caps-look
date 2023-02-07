import style from './style.module.scss'
import React from 'react'
import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import ContentsTable from '../../components/ContentsTable'
import { CSVLink } from 'react-csv'

const Projects = () => {
  const [projects, setProjects] = useState([{}])
  const getProjects = async () => {
    try {
      const result = await fetch('http://localhost:4000/Projects')
      const res = await result.json()
      setProjects(res)
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
    <PageContainer>
      <SearchBar PlaceholderItem={'Search a Project'} />
      <div style={{ width: '90%' }}>
        <ContentsTable source={projects} columns={columns} />
      </div>

      <br />
      <div className={style.buttonsContainer}>
        <div className={style.Create}>
          <button> Create Project </button>
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
    </PageContainer>
  )
}

export default Projects