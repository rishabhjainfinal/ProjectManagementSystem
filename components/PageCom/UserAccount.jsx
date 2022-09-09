import React from 'react';
import Image from "next/image";
import Link from "next/link";
import useSWR from 'swr';
import axios from 'axios';
import styles from '../../styles/eachPage/UserAccount.module.css';
import { useState, useEffect } from 'react';
import { Notification, toaster } from 'rsuite';

{/* <div className={"styles.inputCointainer"}>
<div className={styles.lableforInput}>{field}</div>
<input type="text" className={styles.inputItself} value={value} />
</div> */}

function UserAccount() {
    const [request, setRequest] = useState([]);
    const [currentCotogry, setCurrentCotogry] = useState('');
    const [dataChnaged, setDataChnaged] = useState(false);

    const pushNotification = (type, header, message) => {
        toaster.push(
            <Notification type={type} header={header} closable>
                {message}
                <hr />
                {JSON.parse(localStorage.getItem('userData')).email}
            </Notification>, {
            placement: 'topEnd'
        });
    }

    useEffect(() => {
        axios.get('/api2/userData', { withCredentials: true })
            .then(res => setRequest(res.data.fieldNames))
            .catch(err => {
                // setRequest({ status: 'fail', err });
                pushNotification('error', 'Error', 'Something went wrong, Try Login Again')
                // after 500ms redirect to login
                setTimeout(() => {
                    window.location.href = '/Login';
                }, 500);
            });
        setCurrentCotogry(JSON.parse(localStorage.getItem('userData')).catogory);
    }, [])

    const reloadDataIssue = () => {
        pushNotification('Error', 'Login Error', 'Relogin to see results, redirecting to Login in 1 sec')
        setTimeout(() => {
            window.location.href = '/Login';
        }, 1500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const elements = e.target.elements;
        const data = {};
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].name || elements[i].value) {
                data[elements[i].name] = elements[i].value;
            }
        }
        if (data.user_mobile.toString().length < 10 ) {
            console.log(data.user_mobile.toString().length ,data.teacher_mobile_num.toString().length )
            
            pushNotification('error', 'Error', 'Mobile Number must be 10 digits', { email: '' })
        } else {
            // console.log(data);
            axios.post('/api2/userData', data, { withCredentials: true })
                .then(res => {
                    pushNotification('success', 'Success', 'Data Updated Successfully', { email: '' })
                    setDataChnaged(false);
                }
                ).catch(err => {
                    pushNotification('error', 'Error', 'Something went wrong, Try Login Again', { email: '' })
                    // after 500ms redirect to login
                    setTimeout(() => {
                        window.location.href = '/Login';
                    }, 500);
                }
                );
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.catogoryCointainer}>
                <span className={styles.spamCointainer}>Role : </span>{currentCotogry}
            </div>
            <form onSubmit={handleSubmit}>
                {!request && reloadDataIssue()}
                {request && request.map(({ field, value, type, isdiable, name },index) => {
                    // console.log(isdiable);
                    return (
                        <div key={index} className={styles.inputCointainer}>
                            <div className={styles.lableforInput}>{field}</div>
                            <input
                                type={type}
                                name={name}
                                disabled={isdiable}
                                defaultValue={value}
                                className={styles.inputItself}
                                onInput={(e) => { if (e) { setDataChnaged(true) } }}
                            />
                        </div>
                    )
                })
                }
                {
                    dataChnaged && <button type="submit" className={styles.updateBtn}>Update Data</button>
                }
            </form>
        </div>
    )
}

export default UserAccount
