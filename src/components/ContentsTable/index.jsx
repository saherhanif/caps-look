import React from 'react'
import style from './style.module.scss'
import { CiEdit } from 'react-icons/ci'
import { BiArchiveIn } from 'react-icons/bi'
import EditPopUpMessage from '../../pages/Projects/EditPopUpDialog'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

const ContentsTable = (props) => {
  const [visible, setVisible] = React.useState(false)
  const [edit, setEdit] = React.useState({})

  const editRow = (e) => {
    setVisible(true)
    setEdit(e)
  }
  return (
    <div className={style.innerContainer}>
      <div className={style.tableHeader}>
        {props.columns.map((e) => {
          return (
            <h3
              style={{
                width: `${100 / props.columns.length}%`
              }}
              className={style.MaininfoText}
            >
              {e.title}
            </h3>
          )
        })}
      </div>
      <div className={style.tableBody}>
        {props.source.map((data) => {
          return (
            <div className={style.dataRow}>
              <div className={style.dataContainer}>
                {props.columns.map((e) => {
                  return (
                    <h3
                      style={{
                        width: `${100 / props.columns.length}%`
                      }}
                      className={style.dataNode}
                    >
                      {data[e.dataIndex]}
                    </h3>
                  )
                })}
              </div>
              <Button
                id="Edit"
                className={style.EditContainer}
                onClick={() => {
                  if (editRow) {
                    editRow(data)
                  }
                }}
              >
                {' '}
                <CiEdit className={style.innerIcons} />
              </Button>

              <button className={style.ArchiveContainer}>
                <BiArchiveIn className={style.innerIcons} />
              </button>
            </div>
          )
        })}
      </div>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <EditPopUpMessage clicked="Edit" source={edit} />
      </Dialog>
    </div>
  )
}
export default ContentsTable
