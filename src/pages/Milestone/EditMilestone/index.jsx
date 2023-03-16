import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import api from '../../../config'
import { InputTextarea } from 'primereact/inputtextarea'

export default function EditMilestone(props) {
  const [editData, setEditData] = React.useState({
    mileStoneName: props.source.milestone_name,
    StartDate: new Date(props.source.milestone_start_date),
    EndDate: new Date(props.source.milestone_end_date),
    description: props.source.description,
    project_id: props.project
  })

  const onChangeData = (key) => (e) =>
    setEditData({ ...editData, [key]: e.target.value })

  const updateMilestoneDetails = async () => {
    const body = editData
    try {
      await fetch(`${api.apiRequest}/editMilestone/${props.source.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
    } catch (err) {
      throw new Error('failed to connect to the server,')
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
        value={editData.mileStoneName}
        name="mileStoneName"
        placeholder="mileStone Name"
        required
        onChange={onChangeData('mileStoneName')}
      />
      <br />
      <Calendar
        id="icon"
        value={editData.StartDate}
        onChange={onChangeData('StartDate')}
        showIcon
        name="StartDate"
        placeholder="choose date"
        required
        style={{ width: '208px' }}
      />
      <br />
      <Calendar
        id="icon"
        value={editData.EndDate}
        onChange={onChangeData('EndDate')}
        showIcon
        name="EndDate"
        placeholder="choose date"
        required
        style={{ width: '208px' }}
      />

      <br />
      <InputTextarea
        value={editData.description}
        onChange={onChangeData('description')}
        name="description"
        placeholder="type description"
      />
      <br />
      <Button
        id="add"
        label="edit"
        icon="pi pi-check"
        autoFocus
        onClick={updateMilestoneDetails}
      />
    </div>
  )
}
