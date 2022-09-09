import Sidenavigation from '../components/Sidenavigation'
import { Container, Header, Content } from 'rsuite';
import { useEffect } from 'react';
import NavTop from '../components/NavTop';
import Dashboard from '../components/PageCom/Dashboard';

export default function Home({ theme, setTheme }) {
  // useEffect(() => {
  //   // check local storage for the session token
  //   if (localStorage.getItem('userData') === null) {
  //     // redirect to login page
  //     window.location.href = '/Login';
  //   }
  // }, [])

  return (
    <>
      <Container>
        <Sidenavigation theme={theme} setTheme={setTheme} />
        <Container>
          <Header>
            <NavTop />
          </Header>
          <Content className='mainPageContent'><Dashboard /></Content>
        </Container>
      </Container>
    </>
  )
}