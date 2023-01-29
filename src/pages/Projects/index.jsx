import style from './style.module.scss'
import { BsSearch } from "react-icons/bs"
import { CiEdit } from "react-icons/ci"
import { BiArchiveIn } from "react-icons/bi"

const Projects = () => {
  return (
    <div className={style.container}>
      <div>
        <label className={style.MainLabel}>Projects</label>
      </div>
      <div>
        <br />
        <hr className={style.Line} />
      </div>
      <div>
        <input type="search" className={style.searchbar} placeholder="Select Project..." ></input>
        <button className={style.srchico}> <BsSearch /></button>
      </div>
      <br />
      <div className={style.buttonsContainer}>
        <button className={style.PageButton}> Create Project </button>
        <button className={style.PageButton}> Edit Project</button>
        <button className={style.PageButton}> Archive Project </button>
      </div>
      <br />
      <div className={style.innerContainer}>
        <div>
          <div className={style.MainInfoBar}>
            <div className={style.MaininfoText}>
              <h3 className={style.MaininfoText}>Name</h3>
              <h3 className={style.MaininfoText}>Scrums Number</h3>
              <h3 className={style.MaininfoText}>Employee Number</h3>
              <h3 className={style.MaininfoText}>Iterations Number</h3>
            </div>
          </div>
          <div className={style.childContainer}>
            <div className={style.childInfoBar}>
              <div className={style.childinfoText}>
                <h3 className={style.childinfoText}>Name</h3>
                <h3 className={style.childinfoText}>Scrums Number</h3>
                <h3 className={style.childinfoText}>Employee Number</h3>
                <h3 className={style.childinfoText}>Iterations Number</h3>
              </div>
            </div>
            <button className={style.EditContainer}> <CiEdit className={style.innerIcons} /></button>
            <button className={style.ArchiveContainer}> <BiArchiveIn className={style.innerIcons} /></button>
          </div>
          <div className={style.childContainer}>
            <div className={style.childInfoBar}>
              <div className={style.childinfoText}>
                <h3 className={style.childinfoText}>Name</h3>
                <h3 className={style.childinfoText}>Scrums Number</h3>
                <h3 className={style.childinfoText}>Employee Number</h3>
                <h3 className={style.childinfoText}>Iterations Number</h3>
              </div>
            </div>
            <button className={style.EditContainer}> <CiEdit className={style.innerIcons} /></button>
            <button className={style.ArchiveContainer}> <BiArchiveIn className={style.innerIcons} /></button>
          </div>
          <div className={style.childContainer}>
            <div className={style.childInfoBar}>
              <div className={style.childinfoText}>
                <h3 className={style.childinfoText}>Name</h3>
                <h3 className={style.childinfoText}>Scrums Number</h3>
                <h3 className={style.childinfoText}>Employee Number</h3>
                <h3 className={style.childinfoText}>Iterations Number</h3>
              </div>
            </div>
            <button className={style.EditContainer}> <CiEdit className={style.innerIcons} /></button>
            <button className={style.ArchiveContainer}> <BiArchiveIn className={style.innerIcons} /></button>
          </div>
          <div className={style.childContainer}>
            <div className={style.childInfoBar}>
              <div className={style.childinfoText}>
                <h3 className={style.childinfoText}>Name</h3>
                <h3 className={style.childinfoText}>Scrums Number</h3>
                <h3 className={style.childinfoText}>Employee Number</h3>
                <h3 className={style.childinfoText}>Iterations Number</h3>
              </div>
            </div>
            <button className={style.EditContainer}> <CiEdit className={style.innerIcons} /></button>
            <button className={style.ArchiveContainer}> <BiArchiveIn className={style.innerIcons} /></button>
          </div>
          <div className={style.childContainer}>
            <div className={style.childInfoBar}>
              <div className={style.childinfoText}>
                <h3 className={style.childinfoText}>Name</h3>
                <h3 className={style.childinfoText}>Scrums Number</h3>
                <h3 className={style.childinfoText}>Employee Number</h3>
                <h3 className={style.childinfoText}>Iterations Number</h3>
              </div>
            </div>
            <button className={style.EditContainer}> <CiEdit className={style.innerIcons} /></button>
            <button className={style.ArchiveContainer}> <BiArchiveIn className={style.innerIcons} /></button>
          </div>
          <div className={style.childContainer}>
            <div className={style.childInfoBar}>
              <div className={style.childinfoText}>
                <h3 className={style.childinfoText}>Name</h3>
                <h3 className={style.childinfoText}>Scrums Number</h3>
                <h3 className={style.childinfoText}>Employee Number</h3>
                <h3 className={style.childinfoText}>Iterations Number</h3>
              </div>
            </div>
            <button className={style.EditContainer}> <CiEdit className={style.innerIcons} /></button>
            <button className={style.ArchiveContainer}> <BiArchiveIn className={style.innerIcons} /></button>
          </div>
        </div>
      </div>
      <div className={style.export}>
        <button className={style.PageButton}> Export as CSV </button>
      </div>
    </div >
  )
}

export default Projects