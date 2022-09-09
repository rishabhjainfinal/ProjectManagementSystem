import Sidenavigation from '../components/Sidenavigation'
import { Container, Header, Content } from 'rsuite';
import { useEffect } from 'react';
import NavTop from '../components/NavTop';
import AddUser from '../components/PageCom/AddUser';


export default function Home({ theme, setTheme }) {
    useEffect(() => {
        // check local storage for the session token
        if (localStorage.getItem('userData') === null) {
            // redirect to login page
            window.location.href = '/Login';
        }
        // if user catogory is not admin, redirect to login page
        let userData = JSON.parse(localStorage.getItem('userData'));
        if (userData.catogory === 'Dean' || userData.catogory === 'Program Chair') {
        } else {
            window.location.href = '/';
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
                    <Content className='mainPageContent'><AddUser /></Content>
                </Container>
            </Container>
        </>
    )
}