import React, { useEffect, useRef } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import api from '../../../config'
import { Messages } from 'primereact/messages'

export default function PopUpMessage(props) {
  const [data, setData] = React.useState({
    ProjectName: '',
    StartDate: null,
    PiNumber: null
  })
  const msgs = useRef('null')
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const createProject = async () => {
    try {
      const body = data

      const result = await fetch(`${api.apiRequest}/AddingProject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const resultBody = await result.json()
      if (resultBody.message == 'create project is done successfully') {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'success',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      } else if (resultBody.message == 'Please Inseat a name for the project') {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      } else if (resultBody.message == 'Please Inseat number of iterations') {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      } else if (
        resultBody.message == 'Please Inseat starting date for the project'
      ) {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      }
    } catch (err) {
      return msgs.current.show([
        {
          sticky: false,
          severity: 'error',
          summary: '',
          detail: err,
          closable: true
        }
      ])
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
      <Messages ref={msgs} />
    </div>
  )
}
