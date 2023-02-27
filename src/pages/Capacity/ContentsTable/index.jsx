import React from 'react'
import style from './style.module.scss'
import { CSVLink } from 'react-csv'

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
            </div>
          )
        })}
      </div>
      <div className={style.export}>
        <CSVLink data={props.source}>
          <button>Export as CSV</button>
        </CSVLink>
      </div>
    </div>
  )
}
export default ContentsTable
