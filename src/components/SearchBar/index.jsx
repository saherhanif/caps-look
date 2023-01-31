import React from 'react'
import { BsSearch } from 'react-icons/bs'
import style from './style.module.scss'
const SearchBar = () => {
  return (
    <div
    style={{
      display: 'flex',
      justifyContent:'center'
    }}
    >
      <input
        type="search"
        className={style.searchbar}
        placeholder="Search Project..."
      />
      <button className={style.srchico}> <BsSearch /></button>
    </div>
  )
}
export default SearchBar
