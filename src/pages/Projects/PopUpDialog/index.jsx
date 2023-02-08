import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'

const PopUpMessage = () => {
  const [data, setData] = React.useState({
    PiNumber: '',
    StartDate: ' ',
    ProjectName: ''
  })
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const createProject = async (req, res) => {
    try {
      const body = data
      await fetch(`${process.env.REACT_APP_API_URL}/AddingProject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      res.status(200).json({
        massage: 'adding project is succssesfully'
      })
    } catch (err) {
      res.status(500).json({ message: `failed to add project, `, err })
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
        placeholder="project name"
        onChange={onChange('ProjectName')}
      />

      <br />
      <InputText
        id="PiNumber"
        value={data.PiNumber}
        type="number"
        name="PiNumber"
        placeholder="pi number"
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
        label="add project"
        icon="pi pi-check"
        autoFocus
        onClick={createProject}
      />
    </div>
  )
}
export default PopUpMessage
