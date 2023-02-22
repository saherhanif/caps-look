import React from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import ContentsTable from '../../components/ContentsTable'
import api from '../../config'
import CreateAbsence from './createAbsence'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { CSVLink, CSVReader } from 'react-csv'

import { parse } from 'papaparse'

import style from './style.module.scss'
import ArchiveAbsence from './absenceArchive'
import EditAbsence from './editAbsence'

export default function Absence() {
  const [list, setList] = React.useState([])
  const [visible, setVisible] = React.useState(false)
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [visibleArchive, setVisibleArchive] = React.useState(false)
  const [archive, setArchive] = React.useState({})
  const [selectedData, setSelectedData] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])
  const [edit, setEdit] = React.useState({})
  const [refresh, updateState] = React.useReducer((x) => x + 1, 0)

  const getAbsences = async () => {
    try {
      const data = await fetch(`${api.apiRequest}/absences`, {
        credentials: 'include'
      })
      const absences = await data.json()

      setList(absences.data)
    } catch (error) {
      setList([])
      throw new Error('No data found !!!')
    }
  }

  React.useEffect(() => {
    getAbsences()
  }, [refresh])

  const columns = [
    { title: 'absence', dataIndex: 'absence_name' },
    { title: 'site', dataIndex: 'site_name' },
    { title: 'country', dataIndex: 'country_name' },
    { title: 'start date', dataIndex: 'absence_start_date' },
    { title: 'end date', dataIndex: 'absence_end_date' },
    { title: 'opti/mand', dataIndex: 'mandatory' }
  ]

  const searchAbsence = (selectedData) => {
    setSelectedData(selectedData)
    if (selectedData !== '') {
      const newAbsenceList = list.filter((absence) => {
        return Object.values(absence.absence_name)
          .join('')
          .toLowerCase()
          .includes(selectedData.toLowerCase())
      })
      setSearchResults(newAbsenceList)
    } else {
      setSearchResults(list)
    }
  }

  const importCSV = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = async () => {
      const csvData = reader.result
      const parsedData = parse(csvData, { header: true }).data
      await fetch(`${api.apiRequest}/importAbsence`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData),
        credentials: 'include'
      })
    }
    reader.readAsText(file)
  }

  return (
    <div>
      <PageContainer name={'Absences'}>
        <SearchBar
          PlaceholderItem={'Search a Absence'}
          name={'absence_name'}
          selectedData={selectedData}
          searchKeyword={searchAbsence}
        />
        <ContentsTable
          source={selectedData.length < 1 ? list : searchResults}
          columns={columns}
          archiveRow={(e) => {
            setVisibleArchive(true)
            setArchive(e)
          }}
          onEditRow={(e) => {
            setVisibleEdit(true)
            setEdit(e)
          }}
        />
        <br />
        <div className={style.buttonsContainer}>
          <Button
            id="Create"
            label="Create Absence"
            onClick={() => setVisible(true)}
          />

          <label htmlFor="myFileInput" className="custom-file-upload">
            Import CSV
          </label>
          <input
            type="file"
            onChange={importCSV}
            accept=".csv"
            id="myFileInput"
            style={{ display: 'none' }}
          />

          <CSVLink style={{ textDecoration: 'none' }} data={list}>
            <button>Export as CSV</button>
          </CSVLink>
        </div>
        <Dialog
          header="Caps Look"
          style={{ textAlign: 'center' }}
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <CreateAbsence
            onSubmit={() => setVisible(false)}
            updateState={updateState}
          />
        </Dialog>
        <Dialog
          header="Caps Look"
          style={{ textAlign: 'center' }}
          visible={visibleEdit}
          onHide={() => setVisibleEdit(false)}
        >
          <EditAbsence
            source={edit}
            onSubmit={() => setVisibleEdit(false)}
            updateState={updateState}
          />
        </Dialog>
        <Dialog
          header="Caps Look"
          style={{ textAlign: 'center', width: '20vw' }}
          visible={visibleArchive}
          onHide={() => setVisibleArchive(false)}
        >
          <ArchiveAbsence
            data={archive}
            onSubmit={() => setVisibleArchive(false)}
            updateState={updateState}
          />
        </Dialog>
      </PageContainer>
    </div>
  )
}
