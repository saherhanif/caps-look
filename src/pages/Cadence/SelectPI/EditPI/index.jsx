import { Button } from 'primereact/button'
import { CiEdit } from 'react-icons/ci'
import { BiArchiveIn } from 'react-icons/bi'
import style from './style.module.scss'
import { Dialog } from 'primereact/dialog'
import React from 'react'
import PopupEditPI from '../PopupEditPI'
const EditPI = ({ PIobject }) => {
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [edit, setEdit] = React.useState({})
  return (
    <div className={style.editArchivePi}>
      <Button
        id="Edit"
        className={style.EditContainer}
        onClick={() => {
          setVisibleEdit(true)
        }}
      >
        <CiEdit className={style.innerIcons} />
      </Button>
      <Dialog
        visible={visibleEdit}
        onHide={() => {
          setVisibleEdit(false)
        }}
        style={{
          width: '20vw'
        }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      >
        <PopupEditPI
          source={PIobject}
          onSubmit={() => setVisibleEdit(false)}
        ></PopupEditPI>
      </Dialog>
    </div>
  )
}
export default EditPI
