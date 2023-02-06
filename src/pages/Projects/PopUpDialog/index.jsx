import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'

const PopUpMessage = () => {
  const [data, setData] = React.useState({
    pinumber: '',
    date: ' ',
    pname: ''
  })
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const createProject = async () => {
    try {
      const body = data
      await fetch('http://localhost:4000/AddingProject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    } catch (err) {
      throw new Error('failed to add project')
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
        id="pname"
        value={data.pname}
        name="pname"
        placeholder="project name"
        onChange={onChange('pname')}
      />

      <br />
      <InputText
        id="piNumber"
        value={data.pinumber}
        type="number"
        name="piNumber"
        placeholder="pi number"
        style={{ width: '208px' }}
        onChange={onChange('pinumber')}
      />
      <br />
      <Calendar
        id="icon"
        value={data.date}
        onChange={onChange('date')}
        showIcon
        name="date"
        placeholder="choose date"
        style={{ width: '208px' }}
      />
      <br />
      <br />
      <Button
        label="add project"
        icon="pi pi-check"
        autoFocus
        onClick={createProject}
      />
    </div>
  )
}
export default PopUpMessage
