import style from './style.module.scss'
import React from 'react'
import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import IterationTable from '../../components/IterationTable'
import { CSVLink } from 'react-csv'

const Cadence = () => {
  return (
    <PageContainer>
      <div style={{ width: '90%' }}></div>
      <div className={style.innerContainer}>
        <button>
          Select project
          <i className={style.arrowDown}></i>
        </button>
        <button className={style.mileStone}>+ add milestone</button>
        <fieldset className={style['detailsPI']}>
          <legend>
            <strong>How many iteration is the PI</strong>
            <i className={style.arrowColor}></i>
            <text></text>
          </legend>
        </fieldset>

        <fieldset className={style['detailsPI']} id={style['itertion']}>
          <legend>
            <strong>How many weeks is iteration 1</strong>
            <i className={style.arrowColor}></i>
            <text></text>
          </legend>
        </fieldset>
        <fieldset className={style['detailsPI']} id={style['dateItertion']}>
          <legend>
            <strong>start date iteration 1:</strong>
            <i className={style.arrowColor}></i>
            <text></text>
          </legend>
        </fieldset>
        <p className={style.ms}>
          <span class={style.mileStoneCir}></span> <strong>Milestone</strong>
        </p>
        <IterationTable></IterationTable>
      </div>
      <button className={style.exportbutton}>Export as CSV</button>
    </PageContainer>
  )
}

export default Cadence
