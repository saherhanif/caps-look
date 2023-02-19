import React, { useEffect } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import api from '../../../config'
import { Dropdown } from 'primereact/dropdown'

export default function EditAbsence(props) {
  const [sites, setSites] = React.useState([])
  const [data, setData] = React.useState({
    absenceName: props.source.absence_name,
    siteId: props.source.site_id,
    startDate: new Date(props.source.absence_start_date),
    endDate: new Date(props.source.absence_end_date),
    mandatory: props.source.mandatory
  })

  const fetchSites = async () => {
    try {
      const response = await fetch(`${api.apiRequest}/getAbsenceSites`, {
        credentials: 'include'
      })
      const data = await response.json()
      const rows = data.data.rows
      const modifiedData = rows.map((item) => ({
        label: item.site_name,
        value: item.id,
        site: item.site_name,
        country: item.country_name,
        isarchived: item.isarchived
      }))
      setSites(modifiedData)
    } catch (err) {
      console.error('Failed to fetch sites:', err)
    }
  }

  useEffect(() => {
    fetchSites()
  }, [])

  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })
  // const onChange = (key) => (value) => setData({ ...data, [key]: value })

  const editAbsence = async () => {
    try {
      const body = data

      await fetch(`${api.apiRequest}/EditAbsence/${props.source.absence_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      if (body == null) {
        return 'you must to insert data'
      }
      props.onSubmit()
    } catch (err) {
      throw new Error('failed to connect to the server')
    }
  }

  return (
    <div
      className="card flex justify-content-center"
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        alignItems: 'center'
      }}
    >
      <InputText
        id="AbsenceName"
        value={data.absenceName}
        name="AbsenceName"
        placeholder="Absence Name"
        onChange={onChange('absenceName')}
      />

      <br />
      <Dropdown
        value={data.siteId}
        onChange={onChange('siteId')}
        options={sites}
        optionLabel="label"
        optionValue="value"
        placeholder="Select a site"
        filter
        className="w-full md:w-14rem"
      />
      <br />
      <Calendar
        id="icon"
        value={data.startDate}
        onChange={onChange('startDate')}
        showIcon
        name="startDate"
        placeholder="start date"
        dateFormat="yy-mm-dd"
        style={{ width: '208px' }}
      />

      <br />
      <Calendar
        id="icon"
        value={data.endDate}
        onChange={onChange('endDate')}
        showIcon
        name="endDate"
        placeholder="end date"
        dateFormat="yy-mm-dd"
        style={{ width: '208px' }}
      />
      <br />
      <br />
      <span className="p-float-label">
        <Dropdown
          inputId="dd-city"
          value={data.mandatory}
          onChange={onChange('mandatory')}
          options={[{ mandatory: 'mandatory' }, { mandatory: 'optional' }]}
          optionLabel="mandatory"
          optionValue="mandatory"
          className="w-full md:w-14rem"
        />

        <label htmlFor="dd-city">Mandatory/optional</label>
      </span>
      <br />
      <br />
      <Button
        id="add"
        label="edit Absence"
        icon="pi pi-check"
        autoFocus
        onClick={editAbsence}
      />
    </div>
  )
}
