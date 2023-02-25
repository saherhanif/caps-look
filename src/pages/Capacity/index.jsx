import style from './style.module.scss'
import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import PageContainer from '../../components/PageContainer'
import DateDropDown from '../../components/capacity/DateDropDown'
import PiDropDown from '../../components/capacity/PiDropDown'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { RadioButton } from 'primereact/radiobutton'

const Selection = () => {
  const [visibleDate, setVisibleDate] = useState(false)
  const [visiblePi, setVisiblePi] = useState(false)
  const [category, setCategory] = useState('Pi')

  console.log(category)
  if (category === 'Pi') {
    return (
      <PageContainer name={'Capicity'}>
        <div className={style.containerSelector}>
          <label>select one</label>
          <div className={style.card}>
            <div className={style.pi}>
              <RadioButton
                inputId="category1"
                name="Pi"
                value="Pi"
                onChange={(e) => {
                  setCategory(e.value)
                }}
                checked={category === 'Pi'}
              />
              <label htmlFor="category1" className="ml2">
                Pi
              </label>
            </div>

            <div className={style.date}>
              <RadioButton
                inputId="category2"
                name="Date"
                value="Date"
                onChange={(e) => {
                  setCategory(e.value)
                }}
                checked={category === 'Date'}
              />
              <label htmlFor="category2" className="ml2">
                Date
              </label>
            </div>
          </div>
        </div>
        <PiDropDown />
      </PageContainer>
    )
  } else if (category === 'Date') {
    return (
      <PageContainer name={'Capicity'}>
        <div className={style.containerSelector}>
          <label>select one</label>
          <div className={style.card}>
            <div className={style.pi}>
              <RadioButton
                inputId="category1"
                name="Pi"
                value="Pi"
                onChange={(e) => {
                  setCategory(e.value)
                }}
                checked={category === 'Pi'}
              />
              <label htmlFor="category1" className="ml2">
                Pi
              </label>
            </div>

            <div className={style.date}>
              <RadioButton
                inputId="category2"
                name="Date"
                value="Date"
                onChange={(e) => {
                  setCategory(e.value)
                }}
                checked={category === 'Date'}
              />
              <label htmlFor="category2" className="ml2">
                Date
              </label>
            </div>
          </div>
        </div>
        <DateDropDown />
      </PageContainer>
    )
  }
}

export default Selection
