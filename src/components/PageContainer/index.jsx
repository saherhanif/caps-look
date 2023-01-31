import React from 'react'
import style from './style.module.scss'
const PageContainer = (props) => {
  return (
    <div className={style.container}>
      <div>
        <label className={style.MainLabel}>Projects</label>
      </div>
      <div>
        <br />
        <hr className={style.Line} />
      </div>
      {/* <div>{props.component}</div>
      <div>{props.secondComponent}</div> */}
      {props.children}
    </div>
  )
}
export default PageContainer
