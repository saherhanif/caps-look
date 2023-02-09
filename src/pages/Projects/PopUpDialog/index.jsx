import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'


const PopUpMessage = (props) => {
  const [data, setData] = React.useState({
    ProjectName: '',
    StartDate: '',
    PiNumber: ''
  })

  const [editData, setEditData] = React.useState({
    ProjectName: props.source.project_name,
    PiNumber: props.source.iteration_number,
    StartDate: ''
  })

  let date = new Date(props.source.start_date)
  const yyyy = date.getFullYear()
  let mm = date.getMonth() + 1
  let dd = date.getDate()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  const formattedDate = dd + '/' + mm + '/' + yyyy
  console.log(Date(formattedDate))

  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })
  const onChangeData = (key) => (e) =>setEditData({ ...editData, [key]: e.target.value })

    
  const createProject = async () => {
    try {
      const body = data

      console.log(data)
      await fetch(`${process.env.REACT_APP_API_URL}/AddingProject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if(body==null){
        return "you must to insert data"
      }
    } catch (err) {
      throw new Error('failed to connect to the server')
    }
  }

  const updateProject = async () => {
    const body = editData
    console.log(body)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/EditProject/${props.source.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      )
 
    } catch (err) {
      throw new Error('failed to connect to the server,')
    }
  }

  if (props.clicked == 'add') {
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
  } else if (props.clicked == 'Edit') {
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
          value={editData.ProjectName}
          name="ProjectName"
          onChange={onChangeData('ProjectName')}
        />

        <br />
        <InputText
          id="PiNumber"
          value={editData.PiNumber}
          type="number"
          name="PiNumber"
          style={{ width: '208px' }}
          onChange={onChangeData('PiNumber')}
        />
        <br />
        <Calendar
          id="icon"
          value={formattedDate}
          onChange={onChangeData('StartDate')}
          showIcon
          name="StartDate"
          placeholder={formattedDate}
          style={{ width: '208px' }}
        />
        <br />
        <br />
        <Button
          id="Edit"
          label="Edit"
          icon="pi pi-check"
          autoFocus
          onClick={updateProject}
        />
      </div>
    )
  }
}
export default PopUpMessage
