import React, { useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import api from '../../../config'

const AddPi = (props) => {
  const [data, setData] = React.useState({
    pis_input: null,
    project_id: props.project,
    pis: props.pis
  })

  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const addPi = async () => {
    try {
      const body = data
      console.log(body)
      await fetch(`${api.apiRequest}/addPi`, {
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
        value={data.pis_input}
        type="number"
        name="pi_name"
        placeholder="Pi"
        style={{ width: '208px' }}
        required
        onChange={onChange('pis_input')}
      />
      <br />
      <Button
        id="add"
        label="Add Pi"
        icon="pi pi-check"
        autoFocus
        onClick={addPi}
      />
    </div>
  )
}
export default AddPi
