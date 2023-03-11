import api from '../../../config'
import React from 'react'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'

const EditIterationDetails = (props) => {
  const [editData, setEditData] = React.useState({
    iteration_number: props.source.iteration_number,
    startDate: props.source.iteration_start_date,
    endDate: props.source.iteration_end_date
  })
  const onChangeData = (key) => (e) =>
    setEditData({ ...editData, [key]: e.target.value })

  const updateIterationDetail = async () => {
    const body = editData
    try {
      await fetch(`${api.apiRequest}/editIterationDetails/${props.source.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      props.updateState()
      props.onSubmit()
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
        id="Pi"
        value={editData.iteration_number}
        type="number"
        name="iteration_number"
        placeholder="iteration number"
        style={{ width: '208px' }}
        required
        onChange={onChangeData('iteration_number')}
      />
      <br />
      <Calendar
        id="icon"
        value={editData.startDate}
        onChange={onChangeData('startDate')}
        showIcon
        name="iteration_start_date"
        placeholder="choose start date"
        required
        style={{ width: '208px' }}
      />
      <br />
      <Calendar
        id="icon"
        value={editData.endDate}
        onChange={onChangeData('endDate')}
        showIcon
        name="iteration_end_date"
        placeholder="choose end date"
        required
        style={{ width: '208px' }}
      />
      <Button
        id="add"
        label="Add iteration"
        icon="pi pi-check"
        autoFocus
        onClick={updateIterationDetail}
      />
    </div>
  )
}
export default EditIterationDetails
