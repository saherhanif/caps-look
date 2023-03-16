import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import api from '../../../config'
import { Messages } from 'primereact/messages'

export default function CreatePi(props) {
  const [data, setData] = React.useState({
    pis: null,
    project_id: props.project
  })

  const msgs = useRef('null')

  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const createPi = async () => {
    try {
      const body = data
      console.log(body)
      await fetch(`${api.apiRequest}/createPi`, {
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
        value={data.pis}
        type="number"
        name="pi_name"
        placeholder="Pi"
        style={{ width: '208px' }}
        required
        onChange={onChange('pis')}
      />
      <br />
      <Button
        id="add"
        label="Add Pi"
        icon="pi pi-check"
        autoFocus
        onClick={createPi}
      />
      <Messages ref={msgs} />
    </div>
  )
}
