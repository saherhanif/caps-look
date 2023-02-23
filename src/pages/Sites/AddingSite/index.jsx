import React, { useRef } from 'react'
import { Button } from 'primereact/button'

import { InputText } from 'primereact/inputtext'
import api from '../../../config'
const Addingsite = () => {
  const [data, setData] = React.useState({
    site_name: '',
    country_name: ''
  })
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const createSite = async () => {
    try {
      const body = data
      const result = await fetch(`${api.apiRequest}/createsite`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    } catch (err) {}
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
        id=" siteName"
        value={data.site_name}
        name="site_name"
        placeholder="Site Name"
        required
        onChange={onChange('site_name')}
      />
      <br />
      <InputText
        id="countryName"
        value={data.country_name}
        type="text"
        name="country_name"
        placeholder="Country Name"
        style={{ width: '208px' }}
        required
        onChange={onChange('country_name')}
      />
      <br />

      <br />
      <Button
        id="add"
        label="add site"
        icon="pi pi-check"
        autoFocus
        onClick={createSite}
      />
    </div>
  )
}
export default Addingsite
