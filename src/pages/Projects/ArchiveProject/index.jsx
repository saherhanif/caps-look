import React, { useState } from 'react'
import { Button } from 'primereact/button'
import api from '../../../config'
const ArchiveProject = (props) => {
  const[visible,setVisible]=useState(false)
  const archivedProject = async () => {
    try {
      await fetch(`${api.apiRequest}/Archive/${props.data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      })
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
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <p style={{ fontWeight: 'bold', marginBottom: '50px' }}>
        Are you sure you want to remove the project ?
      </p>
      <div>
        <Button icon="pi pi-times" label="No"  value={visible} onClick={() => setVisible(false)}/>
      </div>
      <br />
      <div>
        <Button
          icon="pi pi-check"
          label="Yes"
          autoFocus
          onClick={archivedProject}
        />
      </div>
    </div>
  )
}
export default ArchiveProject
