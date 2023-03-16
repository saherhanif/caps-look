import React from 'react'
import style from './style.module.scss'
import { CiEdit } from 'react-icons/ci'
import { BiArchiveIn } from 'react-icons/bi'
import { Button } from 'primereact/button'

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
        {props.source.map((data, index) => {
          let color
          if (index % 2 == 0) {
            color = '#141432'
          } else {
            color = '#26264F'
          }
          return (
            <div className={style.dataRow}>
              <div
                className={style.dataContainer}
                style={{ background: color }}
              >
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
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default ContentsTable
