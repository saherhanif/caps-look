import style from './style.module.scss'
import React, { useRef, useState, useEffect, useReducer } from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import ContentsTable from '../../components/ContentsTable'
import { Dropdown } from 'primereact/dropdown'
// import PopUpMessage from './PopUpDialog'
// import EditPopUpMessage from './EditPopUpDialog'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { CSVLink } from 'react-csv'
//import ArchiveProject from './ArchiveProject'
import api from '../../config'
import CreateMilestone from './CreateMilestone'
import ArchiveMilestone from './ArchiveMilestone'
import EditMilestone from './EditMilestone'

const Milestone = () => {
  const [milestones, setMilestones] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [visibleArchive, setVisibleArchive] = React.useState(false)
  const [archive, setArchive] = React.useState({})
  const [edit, setEdit] = React.useState({})
  const [selectedData, setSelectedData] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [refresh, updateState] = useReducer((x) => x + 1, 0)
  const [projects, setProjects] = useState([{}])
  const [selectedproject, setSelectedproject] = useState(null)

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

  const getMilestones = async (project_id) => {
    try {
      const body = {
        project_id: project_id
      }
      const result = await fetch(`${api.apiRequest}/milestoneProject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      const res = await result.json()
      setMilestones(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }

  const searchMilestone = (selectedData) => {
    setSelectedData(selectedData)
    if (selectedData !== '') {
      const newMilestoneList = milestones.filter((milestone) => {
        return Object.values(milestone.milestone_name)
          .join('')
          .toLowerCase()
          .includes(selectedData.toLowerCase())
      })
      setSearchResults(newMilestoneList)
    } else {
      return searchResults(selectedData)
    }
  }

  useEffect(() => {
    getProjectsName()
  }, [refresh])

  const columns = [
    { title: 'Name', dataIndex: 'milestone_name' },
    { title: 'Start Date', dataIndex: 'milestone_start_date' },
    { title: 'End Date', dataIndex: 'milestone_end_date' },
    { title: 'Description', dataIndex: 'description' }
  ]

  return (
    <PageContainer name={'Milestones'}>
      <Dropdown
        style={{ margin: 10 }}
        className="w-full md:w-14rem"
        placeholder="Select a Project"
        value={selectedproject}
        options={projects}
        optionLabel="project_name"
        optionValue="id"
        onChange={(e) => {
          setSelectedproject(e.value)
          getMilestones(e.value)
        }}
      />
      <SearchBar
        PlaceholderItem={'Search a Milestone'}
        name={'milestone_name'}
        selectedData={selectedData}
        searchKeyword={searchMilestone}
      />
      <div style={{ width: '90%' }}>
        <ContentsTable
          source={selectedData.length < 1 ? milestones : searchResults}
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

      <br />
      <div className={style.buttonsContainer}>
        <div className={style.Create}>
          <Button
            id="Create"
            label="Create Milestone"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className={style.export}>
          <CSVLink
            style={{
              textDecoration: 'none'
            }}
            data={milestones}
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
        <CreateMilestone
          project={selectedproject}
          onSubmit={() => {
            setVisible(false)
          }}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visibleEdit}
        onHide={() => setVisibleEdit(false)}
      >
        <EditMilestone
          source={edit}
          project={selectedproject}
          onSubmit={() => {
            setVisibleEdit(false)
          }}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center', width: '20vw' }}
        visible={visibleArchive}
        onHide={() => setVisibleArchive(false)}
      >
        <ArchiveMilestone
          data={archive}
          onSubmit={() => {
            setVisibleArchive(false)
          }}
          refresh={updateState}
        />
      </Dialog>
    </PageContainer>
  )
}

export default Milestone
