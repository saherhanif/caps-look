import React, { useState, useEffect } from 'react'
import api from '../../config'
import { Dropdown } from 'primereact/dropdown'
import style from './style.module.scss'

const DateDropdown = (props) => {
  const [selectedFromDate, setSelectedFromDate] = useState(null)
  const [selectedToDate, setSelectedToDate] = useState(null)

  const [data, setData] = useState({
    from_date: '',
    to_date: ''
  })

  useEffect(() => {}, [])
  const onChange = (key) => (e) => {
    setData({ ...data, [key]: e.target.value })
  }

  return (
    <div className={style.dropdown}>
      <Dropdown
        id="startDate"
        name="value.iteration_start_date"
        value={data.from_date}
        onChange={(e) => {
          setSelectedFromDate(e.value)
          onChange('from_date')(e)
        }}
        options={props.fromDate}
        optionLabel="value.iteration_start_date"
        optionValue="value.id"
        placeholder="Select from Date"
      />
      <Dropdown
        id="endDate"
        name="value.iteration_end_date"
        value={data.to_date}
        onChange={(e) => {
          setSelectedToDate(e.value)
          onChange('to_date')(e)
        }}
        options={props.toDate}
        optionLabel="value.iteration_end_date"
        optionValue="value.id"
        placeholder="Select to Date"
      />
    </div>
  )
}
export default DateDropdown
