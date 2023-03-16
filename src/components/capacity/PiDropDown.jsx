import React, { useState, useEffect } from 'react'
import api from '../../config'
import { Dropdown } from 'primereact/dropdown'
import style from './style.module.scss'

const PiDropdown = (props) => {
  const [selectedFrom, setSelectedFrom] = useState(null)
  const [selectedTo, setSelectedTo] = useState(null)

  const [data, setData] = useState({
    from_iteration: '',
    to_iteration: ''
  })

  const onChange = (key) => (e) => {
    setData({ ...data, [key]: e.target.value })
  }
  return (
    <>
      <div className={style.dropdown}>
        <Dropdown
          visible={props.status}
          id="FromIteration"
          name="label"
          value={data.from_iteration}
          onChange={(e) => {
            setSelectedFrom(e.value)
            onChange('from_iteration')(e)
            props.setDataFrom(e.value)
          }}
          options={props.pi}
          optionLabel="label"
          optionValue="value.id"
          placeholder="Select from iterations"
        />
        <Dropdown
          visible={props.status}
          id="toIteration"
          name="label"
          value={data.to_iteration}
          onChange={(e) => {
            setSelectedTo(e.value)
            onChange('to_iteration')(e)
            props.setDataTo(e.value)
            props.update(e.value)
          }}
          options={props.pi}
          optionLabel="label"
          optionValue="value.id"
          placeholder="Select to iterations"
        />
      </div>
    </>
  )
}
export default PiDropdown
