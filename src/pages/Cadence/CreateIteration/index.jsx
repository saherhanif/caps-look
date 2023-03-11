import api from '../../../config'
import React from 'react'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'

const CreateIteration = (props) => {
  const [data, setData] = React.useState({
    pi_id: props.pis,
    project_id: props.project,
    StartDate: null,
    endDate: null,
    iteration_number: null
  })
  console.log('DATA', data)
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const addIteration = async () => {
    try {
      const body = data
      console.log(body)
      await fetch(`${api.apiRequest}/createIteration`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    } catch (error) {
      throw new Error('no data found ')
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
        value={data.iteration_number}
        type="number"
        name="iteration_number"
        placeholder="iteration number"
        style={{ width: '208px' }}
        required
        onChange={onChange('iteration_number')}
      />
      <br />
      <Calendar
        id="icon"
        value={data.StartDate}
        onChange={onChange('StartDate')}
        showIcon
        name="StartDate"
        placeholder="choose start date"
        required
        style={{ width: '208px' }}
      />
      <br />
      <Calendar
        id="icon"
        value={data.endDate}
        onChange={onChange('endDate')}
        showIcon
        name="endDate"
        placeholder="choose end date"
        required
        style={{ width: '208px' }}
      />
      <Button
        id="add"
        label="Add iteration"
        icon="pi pi-check"
        autoFocus
        onClick={addIteration}
      />
    </div>
  )
}
export default CreateIteration
