import React from 'react'
import api from '../../../config'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
const DeletePi = (props) => {
  const [data, setData] = React.useState({
    pis_input: '',
    project_id: props.project,
    pis: props.pis
  })

  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })
  const deletePi = async () => {
    try {
      const body = data
      console.log(body)
      await fetch(`${api.apiRequest}/deletePi`, {
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
      <p style={{ fontWeight: 'bold', marginBottom: '50px' }}>
        How much PIs Would you want to remove?
      </p>
      <InputText
        id="Pi"
        value={data.pis_input}
        type="number"
        name="id"
        placeholder="Pi"
        style={{ width: '208px' }}
        required
        onChange={onChange('pis_input')}
      />
      <br />
      <Button
        id="delete"
        label="delete"
        icon="pi pi-check"
        autoFocus
        onClick={deletePi}
      />
    </div>
  )
}
export default DeletePi
