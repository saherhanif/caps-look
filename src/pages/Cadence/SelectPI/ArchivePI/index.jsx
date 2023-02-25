import { Button } from 'primereact/button'
import { CiEdit } from 'react-icons/ci'
import { BiArchiveIn } from 'react-icons/bi'
import style from './style.module.scss'
import { Dialog } from 'primereact/dialog'
import React from 'react'
import PopupArchivePI from '../PopupArchivePI'
const ArchivePI = ({ PIobject }) => {
  const [visibleArchive, setVisibleArchive] = React.useState(false)
  const [archive, setArchive] = React.useState({})
  return (
    <>
      <div>
        <Button
          style={{
            height: '50px',
            width: '50px',
            background: '#8a84aa',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '10px',
            border: 'none',
            marginLeft: '150px',
            padding: '10px',
            top: '-90px'
          }}
          onClick={() => {
            setVisibleArchive(true)
          }}
        >
          <BiArchiveIn style={{ height: '100px', width: '100px' }} />
        </Button>
      </div>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center', width: '20vw' }}
        visible={visibleArchive}
        onHide={() => setVisibleArchive(false)}
      >
        <PopupArchivePI
          data={PIobject}
          onSubmit={() => setVisibleArchive(false)}
        />
      </Dialog>
    </>
  )
}
export default ArchivePI
