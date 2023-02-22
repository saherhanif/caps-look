import ContentsTable from '../../components/ContentsTable'
import DropdownProject from '../../components/DropDownProject'
import PageContainer from '../../components/PageContainer'
import ProjectDetails from './detailsComponent'
import style from './style.module.scss'

const Home = () => {
  return (
    <PageContainer>
      <ProjectDetails />
      <DropdownProject />
    </PageContainer>
  )
}

export default Home
