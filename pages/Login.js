import { motion } from "framer-motion"
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Login.module.css'
import InputPicker from 'rsuite/InputPicker';
import { useEffect, useState } from "react";
import { Notification, toaster } from 'rsuite';
import axios from "axios";

const Login = () => {
    const [value, setValue] = useState(null);
    const [CatogoryData, setCatogoryData] = useState([]);
    useEffect(() => {
        // fetch catogory data
        fetch('/api/catogoryOptions')
            .then(res => res.json())
            .then(setCatogoryData)
    }, [])


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


    const handleLogin = (e) => {
        e.preventDefault();

        console.log("handling the login")

        // check on catogory first if not selected make it select one
        if (value === null) {
            pushNotification('error', 'Chose Catogory', 'Please select a catogory to continue 😕', { email: e.target.userMail.value })
            return;
        }

        // pushNotification('info', 'Making Login request!', <Loading />, { email: e.target.userMail.value })

        // sanitize data
        const data = {
            email: e.target.userMail.value,
            password: e.target.userPassword.value,
            catogory: value
        }

        // make request to server
        axios.post('/api2/login', data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                withCredentials: true
            }
        ).then(res => {
            console.log(res)
            if (res.status === 200) {
                pushNotification('success',
                    'Login Successful',
                    'You are logged in successfully 😎',
                    { email: e.target.userMail.value })
                // save user data to local storage
                localStorage.setItem('userData', JSON.stringify(res.data))
                // redirect to home page
                window.location.href = '/'
            } else {
                pushNotification('error', 'Login Failed', 'Please check your credentials and try again 😕', { email: e.target.userMail.value })
            }
        }
        ).catch(err => {
            console.log(data)
            pushNotification('error', 'Login Failed', 'Please check your credentials and try again 😕', { email: e.target.userMail.value })
        }

        )
    }

    return (
        <motion.section
            className={styles.sectionMotion}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.3,
                type: "spring",
                damping: 10,
                mass: 1,
                stiffness: 100
            }}
            exit={{
                opacity: 0,
                y: 300
            }}
            key="hi"
        >
            <div id="container" className={styles.container}>
                <div className={styles.leftside}>
                    <div className={styles.imageCointainer}>
                        <Image src="/GULogo.svg" width="400" height="350" alt="Logo Image" className={styles.imageItself} />
                    </div>
                </div>

                <form className={styles.rightside} onSubmit={handleLogin}>
                    <h1 className={styles.heading}>
                        Project Login Portal
                    </h1>
                    <label className={styles.label}>Official Email</label>
                    <input className={styles.input}
                        type="email"
                        name="userMail"
                        autoComplete="on"
                        autoFocus
                        required
                    />

                    <label className={styles.label}>Password</label>
                    <input className={styles.input}
                        type="password"
                        name="userPassword"
                        autoComplete="on"
                        required
                    />

                    {/* DROP DOWN TO CHOSE CETOGORY */}
                    <label className={styles.label}>User Catogoty</label>
                    <InputPicker className={styles.inputCatogoty}
                        value={value}
                        onChange={setValue}
                        data={CatogoryData}
                    />

                    <div className={styles.btnContainer}>
                        <button className={styles.submit} type="submit" >
                            Sign In
                        </button>
                    </div>

                    <div className={styles.orSeperator}>
                        ------ or ------
                    </div>

                    <div className={styles.btnContainerRegister}>
                        <Link href="/Register"
                        passHref >
                            <button className={styles.register} type="button">
                                Register
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </motion.section>
    )
}


export default Login