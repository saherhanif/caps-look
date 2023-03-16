import React, { useRef } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import api from '../../../config'
import { InputTextarea } from 'primereact/inputtextarea'

export default function CreateMilestone(props) {
  const [data, setData] = React.useState({
    mileStoneName: '',
    StartDate: '',
    EndDate: '',
    description: '',
    project_id: props.project
  })
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const CreateMilestone = async () => {
    try {
      const body = data
      await fetch(`${api.apiRequest}/createMilestone`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    } catch (err) {
      throw new Error(err)
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
        id="MilestonetName"
        value={data.mileStoneName}
        name="mileStoneName"
        placeholder="mileStone Name"
        required
        onChange={onChange('mileStoneName')}
      />
      <br />
      <Calendar
        id="icon"
        value={data.StartDate}
        onChange={onChange('StartDate')}
        showIcon
        name="StartDate"
        placeholder="choose date"
        required
        style={{ width: '208px' }}
      />
      <br />
      <Calendar
        id="icon"
        value={data.EndDate}
        onChange={onChange('EndDate')}
        showIcon
        name="EndDate"
        placeholder="choose date"
        required
        style={{ width: '208px' }}
      />

      <br />
      <InputTextarea
        value={data.description}
        onChange={onChange('description')}
        name="description"
        placeholder="type description"
      />
      <br />
      <Button
        id="add"
        label="add Milstone"
        icon="pi pi-check"
        autoFocus
        onClick={CreateMilestone}
      />
    </div>
  )
}
