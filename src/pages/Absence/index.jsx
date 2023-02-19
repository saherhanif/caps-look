import React from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import ContentsTable from '../../components/ContentsTable'
import api from '../../config'
import CreateAbsence from './createAbsence'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { CSVLink } from 'react-csv'
import style from './style.module.scss'
import ArchiveAbsence from './absenceArchive'
import EditAbsence from './editAbsence'

export default function Absence() {
  const [list, setList] = React.useState([])
  const [visible, setVisible] = React.useState(false)
  const [visbleArchive, setVisibleArchive] = React.useState(false)
  const [archive, setArchive] = React.useState({})
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [selectedData, setSelectedData] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])

  const [edit, setEdit] = React.useState({})

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
    console.log('1111111');
    
  }, [])

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
          .join(' ')
          .toLowerCase()
          .includes(selectedData.toLowerCase())
      })
      setSearchResults(newAbsenceList)
    } else {
      setSearchResults(list)
    }
  }

  return (
    <div>
      <PageContainer name={'Absences'}>
        <SearchBar  PlaceholderItem={'Search a Absence'}
        name={'absence_name'}
        selectedData={selectedData}
        searchKeyword={searchAbsence}/>
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
          <div className={style.Create}>
            <Button
              id="Create"
              label="Create Absence"
              onClick={() => setVisible(true)}
            />
          </div>
          <div className={style.export}>
            <CSVLink
              style={{
                textDecoration: 'none'
              }}
              data={list}
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
          <CreateAbsence onSubmit={() => setVisible(false)} />
        </Dialog>
        <Dialog
          header="Caps Look"
          style={{ textAlign: 'center' }}
          visible={visibleEdit}
          onHide={() => setVisibleEdit(false)}
        >
          <EditAbsence source={edit} onSubmit={() => setVisibleEdit(false)} />
        </Dialog>
        <Dialog
          header="Caps Look"
          style={{ textAlign: 'center', width: '20vw' }}
          visible={visbleArchive}
          onHide={() => setVisibleArchive(false)}
        >
          <ArchiveAbsence
            data={archive}
            onSubmit={() => setVisibleArchive(false)}
          />
        </Dialog>
      </PageContainer>
    </div>
  )
}
