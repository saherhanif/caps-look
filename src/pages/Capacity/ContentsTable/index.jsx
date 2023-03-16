import React from 'react'
import style from './style.module.scss'
import { CSVLink } from 'react-csv'

const ContentsTable = (props) => {
  return (
    <div className={style.innerContainer}>
      <div
        className={style.tableHeader}
        style={{
          width: props.columns.length > 8 ? `fit-content` : '100%'
        }}
      >
        {props.columns.map((e) => {
          return (
            <h3
              style={{
                width:
                  props.columns.length > 8
                    ? '100px'
                    : `${100 / props.columns.length}%`
              }}
              className={style.MaininfoText}
            >
              {e.title.replace('iteration-', 'I ')}
            </h3>
          )
        })}
      </div>
      <div className={style.tableBody}>
        {props.source.map((data) => {
          return (
            <div className={style.dataRow}>
              <div
                className={style.dataContainer}
                style={{
                  width: props.columns.length > 8 ? `fit-content` : '100%'
                }}
              >
                {props.columns.map((e) => {
                  return (
                    <h3
                      style={{
                        width:
                          props.columns.length > 8
                            ? '100px'
                            : `${100 / props.columns.length}%`
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
      {/* {props.footer && (
        <div
          className={style.dataRow}
          style={{
            position: 'absolute',
            top: '250px',
            width: '100%'
          }}
        >
          <div
            className={style.dataContainer}
            style={{
              width: props.columns.length > 8 ? `fit-content` : '100%'
            }}
          >
            {props.columns.map((e) => {
              return (
                <h3
                  style={{
                    width:
                      props.columns.length > 8
                        ? '100px'
                        : `${100 / props.columns.length}%`
                  }}
                  className={style.dataNode}
                >
                  {'total'}
                </h3>
              )
            })}
          </div>
        </div>
      )} */}
      {/* <div className={style.export}>
        <CSVLink data={props.source}>
          <button>Export as CSV</button>
        </CSVLink>
      </div> */}
    </div>
  )
}
export default ContentsTable
