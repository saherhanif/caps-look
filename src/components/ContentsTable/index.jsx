import React from 'react'
import style from './style.module.scss'
import { CiEdit } from 'react-icons/ci'
import { BiArchiveIn } from 'react-icons/bi'

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
              <button className={style.EditContainer}>
                <CiEdit className={style.innerIcons} />
              </button>
              <button className={style.ArchiveContainer}>
                <BiArchiveIn className={style.innerIcons} />
              </button>
            </div>
          )
        })}
      </div>
      1 1
    </div>
  )
}
export default ContentsTable
