import PageContainer from '../../components/PageContainer'
import DropdownProject from '../../components/DropDownProject'
import { Dropdown } from 'primereact/dropdown'
import React, { useEffect, useState } from 'react'
import api from '../../config'
import { MultiSelect } from 'primereact/multiselect'

const Capacity = () => {
  const [scrums, setScrums] = useState([])
  const [projects, setProjects] = useState([])

  const [selectedScrum, setSelectedScrum] = useState(null)
  const [selectedproject, setSelectedproject] = useState(null)

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
      console.log(res.data)
    } catch (err) {
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

  useEffect(() => {
    getProjectsName()
    getScrums()
  }, [])
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
        }}
      />
      <br />
      <MultiSelect
        id="scrums"
        name="scrum"
        value={selectedScrum}
        options={scrums}
        optionLabel="scrum_name"
        optionValue="scrum_name"
        placeholder="choose Scrum"
        required
        className="w-full md:w-14rem"
        onChange={(e) => {
          setSelectedScrum(e.value)
        }}
      />
    </PageContainer>
  )
}
export default Capacity
