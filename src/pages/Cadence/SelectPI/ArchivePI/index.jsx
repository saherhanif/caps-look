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
      <div className={style.editArchivePi}>
        <Button
          className={style.ArchiveContainer}
          onClick={() => {
            setVisibleArchive(true)
          }}
        >
          <BiArchiveIn className={style.innerIcons} />
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
