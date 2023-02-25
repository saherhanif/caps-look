import style from './style.module.scss'
import React from 'react'
import { useState } from 'react'
import PageContainer from '../../components/PageContainer'
import PITable from './PITable'
import MilestoneTable from './MilestoneTable'
import SelectProject from './SelectProject'
import SelectPI from './SelectPI'
import PopupMilestone from './PopupMilestone'
import PopupPI from './PopupPI'
import PopupIteration from './PopupIteration'
const Cadence = () => {
  const [selectProjectState, setSelectProjectState] = useState('')
  const [selectPIState, setSelectPIState] = useState('')
  const [mileStoneForm, setMileStoneForm] = useState(false)
  const [PIForm, setPIForm] = useState(false)
  const [iterationForm, setIterationForm] = useState(false)
  return (
    <PageContainer>
      <div style={{ width: '90%' }}></div>
      <div className={style.innerContainer}>
        <SelectProject
          selectProjectState={selectProjectState}
          setSelectProjectState={setSelectProjectState}
        ></SelectProject>
        <SelectPI
          selectPIState={selectPIState}
          setSelectPIState={setSelectPIState}
          selectProjectState={selectProjectState}
        ></SelectPI>

        <button
          className={style.PI}
          onClick={() => {
            setPIForm(true)
          }}
        >
          + Add PI
        </button>
        <button
          className={style.iteration}
          onClick={() => {
            setIterationForm(true)
          }}
        >
          + Add iteration
        </button>
        <PopupIteration
          iterationForm={iterationForm}
          setIterationForm={setIterationForm}
          selectPIState={selectPIState}
          selectProjectState={selectProjectState}
          onSubmit={() => setIterationForm(false)}
        ></PopupIteration>

        <PITable selectPIState={selectPIState}></PITable>
        <PopupPI
          PIForm={PIForm}
          setPIForm={setPIForm}
          selectProjectState={selectProjectState}
          onSubmit={() => setPIForm(false)}
        ></PopupPI>

        <button
          className={style.mileStone}
          onClick={() => {
            setMileStoneForm(true)
          }}
        >
          + Add Milestone
        </button>
        <PopupMilestone
          mileStoneForm={mileStoneForm}
          setMileStoneForm={setMileStoneForm}
          selectProjectState={selectProjectState}
          onSubmit={() => setMileStoneForm(false)}
        ></PopupMilestone>
        <h1
          style={{ fontSize: '40px', color: '#210f61', marginRight: '1000px' }}
        >
          Milestones
        </h1>
        <MilestoneTable
          selectProjectState={selectProjectState}
        ></MilestoneTable>
      </div>

      {/* <CSVLink
        style={{
          textDecoration: 'none'
        }}
        data={projects}
      >
        <button className={style.exportbutton}>Export as CSV</button>
      </CSVLink> */}
    </PageContainer>
  )
}

export default Cadence
