import ContentsTable from '../../components/ContentsTable'
import DropdownProject from '../../components/DropDownProject'
import PageContainer from '../../components/PageContainer'
import ProjectDetails from './detailsComponent'
import style from './style.module.scss'
import SiteMix from '../../components/SiteMix/SiteMix'
import { useState } from 'react'
const Home = () => {
  const [projId, setProjId] = useState(1)
  return (
    <PageContainer name={'Home'}>
      <DropdownProject setProjId={setProjId} />
      <br />
      <ProjectDetails projectId={projId} />

      <SiteMix projectId={projId} />
    </PageContainer>
  )
}

export default Home
