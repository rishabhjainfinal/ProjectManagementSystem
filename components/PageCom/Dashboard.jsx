import React, { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Notification, toaster } from 'rsuite';
import Divider from 'rsuite/Divider';
import styles from '../../styles/eachPage/Dashboard.module.css';
import { Panel, PanelGroup } from 'rsuite';
import Input from 'rsuite/Input';

function Dashboard() {
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

    const data = [
        { id: 1, title: 'Dashboard' },
        { id: 2, title: 'Dashboard' },
        { id: 3, title: 'Dashboard' },
    ]

    useEffect(() => {

    }, []);
    return (
        <div className={styles.cointainer}>
            <div className={styles.groupHeadTitle}>
                Your Groups
            </div>
            <Divider />
            <div className="searchBar">
                <Input placeholder="🔍 Filter Groups" />
            </div>
            <div className={styles.groupCardCointainer}>
                {data.map((item, index) => (
                    <Panel md={6}
                        sm={12}
                        bordered
                        header={item.title}
                        className={styles.card}
                        key={index}
                    >
                        {item.id} {item.title}
                    </Panel>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
