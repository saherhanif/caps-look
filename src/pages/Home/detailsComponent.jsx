import React from 'react'
import style from './style.module.scss'

const ListItem = ({ item }) => {
  return (
    <div className={style.listItem}>
      <div className={style.item}>11 sites are working on this project</div>
      <div className={style.item}>230 Scrums are working on this project</div>
      <div className={style.item}>
        3450 Employees are working on this project
      </div>
      <div className={style.item}>Project started in 19.03.2021</div>
      <div className={style.item}>19 PI made on this project</div>
    </div>
  )
}

export default ListItem
