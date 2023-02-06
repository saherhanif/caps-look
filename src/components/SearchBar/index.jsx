import React from 'react'
import { BsSearch } from 'react-icons/bs'
import style from './style.module.scss'
import { AutoComplete } from 'primereact/autocomplete'
const SearchBar = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <input
        type="search"
        className={style.searchbar}
        placeholder={props.PlaceholderItem}
      />
      <button className={style.srchico}>
        {' '}
        <BsSearch />
      </button>
    </div>
  )
}
export default SearchBar