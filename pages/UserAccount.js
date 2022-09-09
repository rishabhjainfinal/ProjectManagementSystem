import Sidenavigation from '../components/Sidenavigation'
import { Container, Header, Content } from 'rsuite';
import { useEffect } from 'react';
import NavTop from '../components/NavTop';
import UserAccount from '../components/PageCom/UserAccount';

import { Suspense } from 'react'
import Loading from '../components/Loading';

// import { Suspense } from 'react'
// import Loading from '../components/Loading';
// <Suspense fallback={<Loading className='LoadingElement' />}>
//     <UserAccount/>
// </Suspense>

export default function Home({ theme, setTheme }) {
  useEffect(() => {
    // check local storage for the session token
    if (localStorage.getItem('userData') === null) {
      // redirect to login page
      window.location.href = '/Login';
    }
  }, [])

  return (
    <>
      <Container>
        <Sidenavigation theme={theme} setTheme={setTheme} />
        <Container>
          <Header>
            <NavTop />
          </Header>
          <Content className='mainPageContent'>
            <Suspense fallback={<Loading className='LoadingElement' />}>
              <UserAccount/>
            </Suspense>
          </Content>
        </Container>
      </Container>
    </>
  )
}