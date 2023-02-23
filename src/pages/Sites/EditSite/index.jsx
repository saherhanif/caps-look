import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import api from '../../../config'
import React from 'react'

const EditSite = (props) => {
  const [editData, setEditData] = React.useState({
    site_name: props.source.site_name,
    country_name: props.source.country_name
  })
  const onChangeData = (key) => (e) =>
    setEditData({ ...editData, [key]: e.target.value })

  const updateSiteRow = async () => {
    const body = editData
    try {
      await fetch(`${api.apiRequest}/editsite/${props.source.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
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
        id="siteName"
        value={editData.site_name}
        name="site_name"
        required
        onChange={onChangeData('site_name')}
      />
      <br />

      <InputText
        id="country"
        value={editData.country_name}
        type="text"
        name=" country_name"
        style={{ width: '208px' }}
        required
        onChange={onChangeData('country_name')}
      />
      <br />
      <Button
        id="edit"
        label="edit"
        icon="pi pi-check"
        autoFocus
        onClick={updateSiteRow}
      />
    </div>
  )
}
export default EditSite
