import React from 'react'
import style from './style.module.scss'
import { CiEdit } from 'react-icons/ci'
import { BiArchiveIn } from 'react-icons/bi'
import { Button } from 'primereact/button'
import Pagination from '../Pagination'

const ContentsTable = (props) => {
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
                  if (props.onEditRow) {
                    props.onEditRow(data)
                  }
                }}
              >
                <CiEdit className={style.innerIcons} />
              </Button>
              <Button
                className={style.ArchiveContainer}
                onClick={() => {
                  if (props.archiveRow) {
                    props.archiveRow(data)
                  }
                }}
              >
                <BiArchiveIn className={style.innerIcons} />
              </Button>
            </div>
          )
        })}
      </div>
      <Pagination />
    </div>
  )
}
export default ContentsTable
