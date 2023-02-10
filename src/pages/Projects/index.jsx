import style from './style.module.scss'
import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import ContentsTable from '../../components/ContentsTable'
import { CSVLink } from 'react-csv'
import api from '../../config'

const Projects = () => {
  const [projects, setProjects] = useState([{}])
  const [visible, setVisible] = React.useState(false)

  const getProjects = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/Projects`)
      const res = await result.json()
      setProjects(res)
    } catch (err) {
      return `failed to retrieve projects `
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
