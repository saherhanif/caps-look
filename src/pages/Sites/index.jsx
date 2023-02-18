import style from './style.module.scss'
import React from 'react'
import { useState, useEffect } from 'react'
import PageContainer from '../../components/PageContainer'
import SearchBar from '../../components/SearchBar'
import ContentsTable from '../../components/ContentsTable'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { CSVLink } from 'react-csv'

const Sites = () => {
  const [locations, setLocations] = useState([{}])
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [visibleArchive, setVisibleArchive] = React.useState(false)
  const [archive, setArchive] = React.useState({})
  const [edit, setEdit] = React.useState({})

  const columns = [
    { title: 'Country', dataIndex: 'country_name' },
    { title: 'Location', dataIndex: 'location' },
    { title: 'Project Name', dataIndex: 'project_name' },
    { title: 'Employee Names', dataIndex: 'employee_name' }
  ]

  return (
    <PageContainer name={'Sites'}>
      <SearchBar placeholderItem={'Search a site...'} />
      <br />
      <div style={{ width: '90%' }}>
        <ContentsTable columns={columns} source={[]} />
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
          {/* <CSVLink
            style={{
              textDecoration: 'none'
            }}
            onClick={() => {
              console.log('exporting')
            }}
          >
            // <button>Export as CSV</button>
            //{' '}
          </CSVLink> */}
        </div>
        <br />
      </div>
    </PageContainer>
  )
}

export default Sites
