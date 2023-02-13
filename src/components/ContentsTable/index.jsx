import React from 'react'
import style from './style.module.scss'
import { CiEdit } from 'react-icons/ci'
import { BiArchiveIn } from 'react-icons/bi'
import EditPopUpMessage from '../../pages/Projects/EditPopUpDialog'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import ArchiveProject from '../../pages/Projects/ArchiveProject'

const ContentsTable = (props) => {
  const [visible, setVisible] = React.useState(false)
  const [edit, setEdit] = React.useState({})
  const [visible1, setVisible1] = React.useState(false)
  const [edit1, setEdit1] = React.useState({})

  const editRow = (e) => {
    setVisible(true)
    setEdit(e)

  }
  const editRow1 = (e) => {
    setVisible1(true)

    setEdit1(e)

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

              <Button className={style.ArchiveContainer} 
               onClick={() => {
                  if (editRow1) {
                    editRow1(data)
                  }
                }}>
                <BiArchiveIn className={style.innerIcons} />
              </Button>
            </div>
          )
        })}
      </div>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center', width: '20vw' }}
        visible={visible1}
        onHide={() => setVisible1(false)}
      >
        <ArchiveProject  data={edit1}/>
      </Dialog>

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
