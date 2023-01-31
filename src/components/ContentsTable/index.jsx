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
            {/* <h3 className={style.MaininfoText}>Name</h3>
            <h3 className={style.MaininfoText}>Scrums Number</h3>
            <h3 className={style.MaininfoText}>Employee Number</h3>
            <h3 className={style.MaininfoText}>Iterations Number</h3> */}
          </div>
        </div>
        {props.source.map((data) => {
          return (
            <div className={style.childContainer}>
              <div className={style.childInfoBar}>
                <div className={style.childinfoText}>
                  {/* <h3 className={style.childinfoText}>{data[props.columns[]]}</h3>
                  <h3 className={style.childinfoText}>{data.Snumber}</h3>
                  <h3 className={style.childinfoText}>{data.Enumber}</h3>
                  <h3 className={style.childinfoText}>{data.Inumber}</h3> */}
                  {props.columns.map((e) => {
                    return (
                      <h3 className={style.childinfoText}>
                        {data[e.dataIndex]}
                        {/* e.dataIndex = 'iteration_number' -> data['iteration_number'] -> data.iteration_number */}
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
