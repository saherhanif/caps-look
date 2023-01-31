import style from './style.module.scss'
import React from 'react'
import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import ContentsTable from '../../components/ContentsTable'

const Projects = () => {
  const [projects, setProjects] = useState([{}])
  const getProjects = async () => {
    try {
      const result = await fetch('http://localhost:4000/Products')
      const res = await result.json()
      console.log(1, res)
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
    { title: 'scrum number', dataIndex: 'scrum_number' },
    { title: 'employees number', dataIndex: 'employee_number' },
    { title: 'iteration number', dataIndex: 'iteration_number' }
  ]

  return (
    <div>
      <PageContainer>
        <SearchBar />
        <ContentsTable source={projects} columns={columns} />
      </PageContainer>
      <br />
      <div className={style.buttonsContainer}>
        <button className={style.PageButton}> Create Project </button>
      </div>
      <br />
      <div className={style.export}>
        <button> Export as CSV </button>
      </div>
    </div>
  )
}

export default Projects

// const Table = (props ) => {
//   // props.onClick

//   return (
//     <div className={props.className}>
//       1
//     </div>
//   )
// }

// <Table
// columns={[]}
// data={[]}
// onEdit={() => 1}
// onArchive={() => 1}

// className = "test"
// />
