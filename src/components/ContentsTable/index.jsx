import React from 'react'
import style from './style.module.scss'
import { CiEdit } from 'react-icons/ci'
import { BiArchiveIn } from 'react-icons/bi'

const ContentsTable = (props) => {
  return (
    <div className={style.innerContainer}>
      <div>
        <div className={style.MainInfoBar}>
          <div className={style.MaininfoText}>
            {props.columns.map((e) => {
              return <h3 className={style.MaininfoText}>{e.title}</h3>
            })}
          </div>
        </div>
        {props.source.map((data) => {
          return (
            <div className={style.childContainer}>
              <div className={style.childInfoBar}>
                <div className={style.childinfoText}>
                  {props.columns.map((e) => {
                    return (
                      <h3 className={style.childinfoText}>
                        {data[e.dataIndex]}
                      </h3>
                    )
                  })}
                </div>
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
    </div>
  )
}
export default ContentsTable
