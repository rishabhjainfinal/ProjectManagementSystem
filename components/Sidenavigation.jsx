// https://rsuitejs.com/components/sidenav/
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Sidenav, Nav, Navbar, Dropdown, Sidebar, Button, ButtonToolbar } from 'rsuite';
import Popover from 'rsuite/Popover';
import Whisper from 'rsuite/Whisper';

// import Cog from '@rsuite/icons/legacy/cog';
import GearIcon  from '@rsuite/icons/Gear';
import PageNext from '@rsuite/icons/legacy/PageNext';
import PagePrevious from '@rsuite/icons/legacy/PagePrevious';
import Dashboard from '@rsuite/icons/legacy/Dashboard';
import Group from '@rsuite/icons/legacy/Group';
import User from '@rsuite/icons/legacy/User';
import Magic from '@rsuite/icons/legacy/Magic';
import ThLarge from '@rsuite/icons/legacy/ThLarge';
import SignIn from '@rsuite/icons/legacy/SignIn';
import AddOutline from '@rsuite/icons/AddOutline';
import SignOut from '@rsuite/icons/legacy/SignOut';
import MoonO from '@rsuite/icons/legacy/MoonO';
import SunO from '@rsuite/icons/legacy/SunO';
import EyeSlash from '@rsuite/icons/legacy/EyeSlash';
import Combination from '@rsuite/icons/Combination';
import { Notification, toaster } from 'rsuite';

import style from '../styles/Sidenavigation.module.css';
import axios from 'axios';


const NavToggle = ({ theme, setTheme, expand, onChange }) => {
    const [currentCogClass, setCurrentCogClass] = useState(style.CogItselfStart);
    const ref = React.useRef();
    function handleSelectMenu(eventKey, event) {
        ref.current.close();
    }
    return (
        <Navbar className="nav-toggle">
            <Navbar>
                <Nav>
                    <Whisper
                        placement={expand ? 'autoVerticalStart' : "rightBottom"}
                        trigger="click"
                        ref={ref}
                        speaker={
                            <MenuPopover theme={theme} setTheme={setTheme} onSelect={handleSelectMenu} />
                        }
                    >
                        <Button appearance="subtle" className={style.CogBtn}>
                            <GearIcon className={currentCogClass} onClick={() => {
                                if (currentCogClass === style.CogItselfStart) {
                                    setCurrentCogClass(style.CogItselfRotated);
                                } else {
                                    setCurrentCogClass(style.CogItselfStart);
                                }
                            }} />
                        </Button>
                    </Whisper>
                </Nav>

                <Nav pullRight>
                    <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                        {expand ? <PagePrevious style={{ fontSize: 20 }} /> : <PageNext style={{ fontSize: 20, position: 'relative', left: '5px' }} />}
                    </Nav.Item>
                </Nav>
            </Navbar>
        </Navbar>
    );
};

const MenuPopover = React.forwardRef(({ theme, setTheme, onSelect, ...rest }, ref) => (
    <Popover ref={ref} {...rest} >
        <Dropdown.Menu title="Theme Dropdown">
            <Dropdown.Item icon={<ThLarge />}><strong>Select Theme</strong></Dropdown.Item>
            <Dropdown.Item
                icon={<MoonO />}
                active={theme === 'light' ? true : false}
                onClick={() => setTheme('light')}
            >
                Light
            </Dropdown.Item>
            <Dropdown.Item icon={<SunO />} active={theme === 'dark' ? true : false} onClick={() => setTheme('dark')} >
                Dark
            </Dropdown.Item>
            <Dropdown.Item icon={<EyeSlash />} active={theme === 'high-contrast' ? true : false} onClick={() => setTheme('high-contrast')} >
                Contrast
            </Dropdown.Item>
        </Dropdown.Menu>
        <Dropdown.Item divider />

        {/* <Dropdown.Menu title="lenguage dropdown">
            <Dropdown.Item icon={<ThLarge />}><strong>Select Language</strong></Dropdown.Item>
            <Dropdown.Item>English</Dropdown.Item>
            <Dropdown.Item >Mandarin</Dropdown.Item>
        </Dropdown.Menu>
        <Dropdown.Item divider /> */}

        <Dropdown.Item icon={<SignIn />} onClick={() => {
            window.location.href = '/Login';
        }}><strong>New Login</strong></Dropdown.Item>
        <Dropdown.Item divider />

        <Dropdown.Item icon={<AddOutline />} onClick={() => {
            window.location.href = '/Register';
        }}><strong>New Register</strong></Dropdown.Item>
        <Dropdown.Item divider />
        
        <Dropdown.Item icon={<SignOut />} onClick={() => {
            // clear the local storage
            localStorage.removeItem('userData');
            // redirect to login page
            // window.location.href = '/Login';
            axios.get('/api2/logout', { withCredentials: true })
                .then(res => res.data)
                .then(data => {
                    if (data.success) {
                        window.location.href = '/Login';
                    } else {
                        // clear all cookies
                        document.cookie.split(";")
                            .forEach(function (c) {
                                document.cookie = c.replace(/^ +/, "")
                                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                            });
                        window.location.href = '/Login';
                    }
                })
        }}><strong>Logout</strong></Dropdown.Item>
    </Popover>
));

const Sidenavigation = ({ theme, setTheme }) => {
    const router = useRouter();
    // console.log(theme, 5555)
    const [expand, setExpand] = useState(false);
    const [localDB, setlocalDB] = useState({});
    const [currentPage, setCurrentPage] = useState('');
    function handleToggle() {
        setExpand(!expand);
    }
    const pushNotification = (type, header, message, data) => {
        toaster.push(
            <Notification type={type} header={header} closable>
                {message}
                <hr />
                {data.email}
            </Notification>, {
            placement: 'topEnd'
        });
    }


    useEffect(() => {
        setlocalDB(JSON.parse(localStorage.getItem('userData')))
        setCurrentPage(router.pathname)
        // console.log(router.query);
    }, [router.pathname] )


    return (
        <Sidebar
            width={expand ? 260 : 50}
            collapsible
            className={style.sidenavigation}
        >
            <div>
                <Sidenav.Header>
                    <div className={style.headerStyles}>
                        <Combination />
                        <span style={{ marginLeft: 12 }}>PMS</span>
                    </div>
                </Sidenav.Header>
                <Sidenav
                    expanded={expand}
                    defaultOpenKeys={['3']}
                    defaultActiveKey="2"
                    appearance="subtle"
                >
                    <Sidenav.Body>
                        <Nav>
                            <Nav.Item eventKey="1" active={currentPage === '/' ? true : false} icon={<Dashboard />} onClick={() => {
                                // redirect to Dashboard
                                window.location.href = '/';
                            }}>
                                Dashboard
                            </Nav.Item>
                            <Nav.Item eventKey="2" active={currentPage === '/UserGroup' ? true : false} icon={<Group />} onClick={() => {
                                // redirect to Dashboard
                                window.location.href = '/UserGroup';
                            }} >
                                User Group
                            </Nav.Item>
                            <Nav.Item eventKey="3" active={currentPage === '/UserAccount' ? true : false} icon={<User />} onClick={() => {
                                // redirect to Dashboard
                                window.location.href = '/UserAccount';
                            }} >
                                User Account
                            </Nav.Item>
                            <Dropdown
                                eventKey="4"
                                trigger="hover"
                                title="Advanced"
                                icon={<Magic />}
                                placement="rightTop"
                            >
                                <Dropdown.Item
                                    eventKey="4-1"
                                    active={currentPage === '/AddUser' ? true : false}
                                    onClick={() => {
                                        if (localDB.catogory !== "Project Team Member") {
                                            // console.log(user_category)
                                            window.location.href = '/AddUser'
                                        } else {
                                            pushNotification('warning', 'Warning', 'You are not authorized to access this page. Only Dean or Program Chair can access this Pages', localDB)
                                        }
                                    }}
                                >
                                    Add User
                                </Dropdown.Item>
                                <Dropdown.Item
                                    eventKey="4-2"
                                    active={currentPage === '/AddFaculty' ? true : false}
                                    onClick={() => {
                                        if (localDB.catogory !== "Project Team Member") {
                                            // console.log(user_category)
                                            window.location.href = '/AddFaculty';
                                        } else {
                                            pushNotification('warning', 'Warning', 'You are not authorized to access this page. Only Dean or Program Chair can access this Pages', localDB)
                                        }
                                    }}>
                                    Add Faculty
                                </Dropdown.Item>
                            </Dropdown>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
            <NavToggle theme={theme} setTheme={setTheme} expand={expand} onChange={handleToggle} />
        </Sidebar>
    );
}


export default Sidenavigation;