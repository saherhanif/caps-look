import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import api from '../../../config'
import { Dropdown } from 'primereact/dropdown'

export default function AddEmployeePopUp(props) {
  const [selectTier, setTier] = useState(null)

  const [data, setData] = React.useState({
    Id: '',
    employeeName: '',
    email: '',
    phone: '',
    siteId: null,
    jobId: null,
    accessTier: null
  })
  console.log(data)

  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const addEmployee = async () => {
    try {
      const body = data
      await fetch(`${api.apiRequest}/addingEmployee`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    } catch (error) {
      throw new Error('adding employee failed')
    }
  }
  useEffect(() => {}, [])
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
        id="Id"
        value={data.Id}
        name="Id"
        placeholder="ID Number"
        required
        onChange={onChange('Id')}
      />
      <br />
      <InputText
        id="employeeName"
        value={data.employeeName}
        type="text"
        name="employeeName"
        placeholder="employee Name"
        style={{ width: '208px' }}
        required
        onChange={onChange('employeeName')}
      />
      <br />
      <InputText
        id="email"
        value={data.email}
        type="text"
        name="email"
        placeholder="email"
        style={{ width: '208px' }}
        required
        onChange={onChange('email')}
      />
      <br />
      <InputText
        id="phone"
        value={data.phone}
        type="text"
        name="phone"
        placeholder="phone"
        style={{ width: '208px' }}
        required
        onChange={onChange('phone')}
      />
      <br />
      <Dropdown
        value={data.siteId}
        onChange={onChange('siteId')}
        options={props.sites}
        optionLabel="site_name"
        optionValue="id"
        placeholder="Select site"
        className="w-full md:w-14rem"
      />
      <br />
      <Dropdown
        value={data.jobId}
        onChange={onChange('jobId')}
        options={props.jobs}
        optionLabel="job_name"
        placeholder="Select job"
        optionValue="id"
        className="w-full md:w-14rem"
      />
      <br />
      <Dropdown
        value={data.accessTier}
        onChange={onChange('accessTier')}
        options={props.arr}
        optionLabel="access_tier"
        optionValue="access_tier"
        placeholder="Select tier"
        className="w-full md:w-14rem"
      />
      <br />
      <Button
        id="add"
        label="add employee"
        icon="pi pi-check"
        autoFocus
        onClick={addEmployee}
      />
    </div>
  )
}
