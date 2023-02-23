import style from './style.module.scss'
import React from 'react'
import { useState, useEffect } from 'react'
import PageContainer from '../../components/PageContainer'
import SearchBar from '../../components/SearchBar'
import ContentsTable from '../../components/ContentsTable'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { CSVLink } from 'react-csv'
import api from '../../config'
import Addingsite from './AddingSite/index'
import EditSite from './EditSite'
import ArchiveSite from './ArchiveSite'

const Sites = () => {
  const [locations, setLocations] = useState([{}])
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [visibleArchive, setVisibleArchive] = React.useState(false)
  const [archive, setArchive] = React.useState({})
  const [edit, setEdit] = React.useState({})
  const [sites, setSites] = React.useState([{}])
  const [selectedData, setSelectedData] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const columns = [
    { title: 'Country', dataIndex: 'country_name' },
    { title: 'Location', dataIndex: 'site_name' },
    { title: 'Employee Numbers', dataIndex: 'employee_number' }
  ]
  const getSites = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/SitesDetails`, {
        credentials: 'include'
      })
      const res = await result.json()
      setSites(res.data)
      console.log(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }

  useEffect(() => {
    getSites()
  }, [])

  return (
    <PageContainer name={'Sites'}>
      <br />
      <div style={{ width: '90%' }}>
        <ContentsTable
          columns={columns}
          source={sites}
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
      <div className={style.buttonsContainer}>
        <div className={style.Create}>
          <Button
            id="Create"
            label="Create Site"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className={style.export}>
          <CSVLink
            style={{
              textDecoration: 'none'
            }}
            data={sites}
            onClick={() => {
              console.log('exporting')
            }}
          >
            <button>Export as CSV</button>
          </CSVLink>
        </div>
        <br />
        <Dialog
          header="Caps Look"
          style={{ textAlign: 'center' }}
          visible={visible}
          onHide={() => {
            setVisible(false)
          }}
        >
          <Addingsite onSubmit={() => setVisible(false)} />
        </Dialog>
      </div>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visibleEdit}
        onHide={() => setVisibleEdit(false)}
      >
        <EditSite source={edit} onSubmit={() => setVisibleEdit(false)} />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center', width: '20vw' }}
        visible={visibleArchive}
        onHide={() => setVisibleArchive(false)}
      >
        <ArchiveSite data={archive} onSubmit={() => setVisibleArchive(false)} />
      </Dialog>
    </PageContainer>
  )
}

export default Sites
