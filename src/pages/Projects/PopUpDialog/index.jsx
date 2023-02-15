import React, { useEffect } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import api from '../../../config'

export default function PopUpMessage(props) {
  const [data, setData] = React.useState({
    ProjectName: '',
    StartDate: '',
    PiNumber: ''
  })
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const createProject = async () => {
    try {
      const body = data
      if (body == null) {
        return 'you must to insert data'
      }

      await fetch(`${api.apiRequest}/AddingProject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })

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
        id="ProjectName"
        value={data.ProjectName}
        name="ProjectName"
        placeholder="ProjectName"
        onChange={onChange('ProjectName')}
      />

      <br />
      <InputText
        id="PiNumber"
        value={data.PiNumber}
        type="number"
        name="PiNumber"
        placeholder="Pi Number"
        style={{ width: '208px' }}
        onChange={onChange('PiNumber')}
      />
      <br />
      <Calendar
        id="icon"
        value={data.StartDate}
        onChange={onChange('StartDate')}
        showIcon
        name="StartDate"
        placeholder="choose date"
        style={{ width: '208px' }}
      />
      <br />
      <br />
      <Button
        id="add"
        label="add project"
        icon="pi pi-check"
        autoFocus
        onClick={createProject}
      />
    </div>
  )
}
