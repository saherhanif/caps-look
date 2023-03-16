import style from './style.module.scss'
import api from '../../config'
import { React, useState, useEffect, useRef, useReducer } from 'react'
import PageContainer from '../../components/PageContainer'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Dialog } from 'primereact/dialog'
import CreatePi from './CreatePi'
import ContentsTable from '../../components/ContentsTable'
import { TreeSelect } from 'primereact/treeselect'
import { CSVLink } from 'react-csv'
import AddPi from './addPi'
import DeletePi from './deletePi'
import CreateIteration from './CreateIteration'
import EditIterationDetails from './EditIterationDetails'
import ContentsTableIterations from '../ContentTableIteration'
import DeleteIteration from './DeleteIteration'
const Cadence = () => {
  const toast = useRef(null)
  const [projects, setProjects] = useState([{}])
  const [selectedproject, setSelectedproject] = useState(null)
  const [pis, setPis] = useState([])
  const [iterations, setIterations] = useState([])
  const [selectedpi, setSelectedpi] = useState(null)
  const [nodes, setNodes] = useState(null)
  const [selectedNodeKey, setSelectedNodeKey] = useState(null)
  const [visibleCreatePi, setVisibleCreatePi] = useState(false)
  const [visibleAddPi, setVisibleAddPi] = useState(false)
  const [visibleAddIteration, setVisibleAddIteration] = useState(false)
  const [hideShowIteration, setHideShowIeration] = useState(false)
  const [visibleDeletePi, setVisibleDeletePi] = useState(false)
  const [visibleDeleteIteration, setVisibleDeleteIteration] = useState(false)
  const [showHideCreate, setShowHideCreate] = useState(false)
  const [showHideAdd, setShowHideAdd] = useState(false)
  const [showHideDeleteIteration, setShowHideDeleteIteration] = useState(false)

  const [expandedKeys, setExpandedKeys] = useState({})
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [deletePis, setDeletePi] = useState({})
  const [edit, setEdit] = useState({})
  const [selectedData, setSelectedData] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [filteredData, setFilteredData] = useState(null)
  const [filteredPi, setFilteredPi] = useState(null)

  console.log('selectedpi', selectedpi)

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

  const getPi = async (id) => {
    try {
      const body = {
        id: id
      }
      const result = await fetch(`${api.apiRequest}/pisProject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      const res = await result.json()
      setPis(res.data)
      if (res.data.length == 0) {
        setShowHideCreate(true)
        setShowHideAdd(false)
        setHideShowIeration(false)
        setShowHideDeleteIteration(false)
      } else {
        setShowHideAdd(true)
        setShowHideCreate(false)
        setHideShowIeration(true)
        setShowHideDeleteIteration(true)
      }
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }
  const getIterationsByPi = async (project_id, pi_id) => {
    try {
      const body = {
        project_id: project_id,
        pi_id: pi_id
      }
      const result = await fetch(`${api.apiRequest}/iterationsPi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      const res = await result.json()
      setIterations(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }
  const search = (event) => {
    setTimeout(() => {
      let filtered
      if (!event.query.trim().length) {
        filtered = [projects]
      } else {
        filtered = projects.filter((item) => {
          return item.project_name
            .toLowerCase()
            .startsWith(event.query.toLowerCase())
        })
      }
      setFilteredData(filtered)
    }, 250)
  }

  const searchPi = (event) => {
    setTimeout(() => {
      let filtered
      if (!event.query.trim().length) {
        filtered = [pis]
      } else {
        filtered = pis.filter((item) => {
          return item.pi_name
            .toLowerCase()
            .startsWith(event.query.toLowerCase())
        })
      }
      setFilteredPi(filtered)
    }, 250)
  }

  const searchNodeKey = (event) => {
    setTimeout(() => {
      let filtered
      if (!event.query.trim().length) {
        filtered = [pis]
      } else {
        filtered = pis.filter((item) => {
          return item.pi_name
            .toLowerCase()
            .startsWith(event.query.toLowerCase())
        })
      }
      setFilteredPi(filtered)
    }, 250)
  }

  useEffect(() => {
    getProjectsName()
  }, [])

  const columns = [
    { title: 'Number', dataIndex: 'iteration_number' },
    { title: 'Iteration Name', dataIndex: 'iteration_name' },
    { title: 'Start Date', dataIndex: 'iteration_start_date' },
    { title: 'End Date', dataIndex: 'iteration_end_date' }
  ]

  return (
    <PageContainer name={'Cadence'}>
      <div className="card flex justify-content-center">
        <Dropdown
          style={{ margin: 10 }}
          type="search"
          className="w-full md:w-14rem"
          placeholder="Select a Project"
          field="project_name"
          value={selectedproject}
          suggestions={filteredData}
          completeMethod={search}
          options={projects}
          optionLabel="project_name"
          optionValue="id"
          onChange={(e) => {
            setSelectedproject(e.value)
            getPi(e.value)
          }}
          filter
        />
        <Dropdown
          style={{ margin: 10 }}
          type="search"
          className="w-full md:w-14rem"
          placeholder="Select a Pi"
          field="pi_name"
          value={selectedpi}
          suggestions={filteredPi}
          completeMethod={searchPi}
          options={pis}
          optionLabel="pi_name"
          optionValue="id"
          onChange={(e) => {
            console.log('TEST', e.value)
            setSelectedpi(e.value)
            getIterationsByPi(selectedproject, e.value)
          }}
          filter
        />
        <br />

        <div>
          <Button
            style={{ marginRight: '15px' }}
            visible={showHideAdd}
            label="add pi"
            onClick={() => setVisibleAddPi(true)}
          />

          <Button
            visible={showHideAdd}
            label="delete pi"
            onClick={() => setVisibleDeletePi(true)}
          />
        </div>

        <Button
          visible={showHideCreate}
          id="Create PI"
          label="Create PI"
          onClick={() => setVisibleCreatePi(true)}
        />
      </div>
      <ContentsTableIterations source={iterations} columns={columns} />
      <br />
      <div className={style.export}>
        <CSVLink
          style={{
            textDecoration: 'none'
          }}
          data={iterations}
        >
          <button>Export as CSV</button>
        </CSVLink>
      </div>
      <div>
        <Button
          style={{ marginRight: '15px' }}
          visible={hideShowIteration}
          id="Create ieration"
          label="Create iteration"
          onClick={() => setVisibleAddIteration(true)}
        />
        <Button
          visible={showHideDeleteIteration}
          label="delete Iteration"
          onClick={() => setVisibleDeleteIteration(true)}
        />
      </div>

      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visibleCreatePi}
        onHide={() => {
          setVisibleCreatePi(false)
        }}
      >
        <CreatePi
          project={selectedproject}
          pis={pis}
          onSubmit={() => {
            setVisibleCreatePi(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'adding Pi done successfully'
            })
          }}
        />
      </Dialog>

      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visibleAddPi}
        onHide={() => {
          setVisibleAddPi(false)
        }}
      >
        <AddPi
          project={selectedproject}
          pis={pis}
          onSubmit={() => {
            setVisibleAddPi(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'adding Pi done successfully'
            })
          }}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center', width: '20vw' }}
        visible={visibleDeletePi}
        onHide={() => setVisibleDeletePi(false)}
      >
        <DeletePi
          project={selectedproject}
          pis={pis}
          onSubmit={() => {
            setVisibleDeletePi(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'removing site done successfully'
            })
          }}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visibleAddIteration}
        onHide={() => {
          setVisibleAddIteration(false)
        }}
      >
        <CreateIteration
          project={selectedproject}
          pis={pis}
          onSubmit={() => {
            setVisibleAddIteration(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'adding iteration done successfully'
            })
          }}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visibleEdit}
        onHide={() => {
          setVisibleEdit(false)
        }}
      >
        <EditIterationDetails
          source={edit}
          onSubmit={() => {
            setVisibleEdit(false)
          }}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center', width: '20vw' }}
        visible={visibleDeleteIteration}
        onHide={() => setVisibleDeleteIteration(false)}
      >
        <DeleteIteration
          project={selectedproject}
          pis={selectedpi}
          iterations={iterations}
          onSubmit={() => {
            setVisibleDeleteIteration(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'removing site done successfully'
            })
          }}
        />
      </Dialog>
    </PageContainer>
  )
}

export default Cadence
