import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Router from 'next/router'
import { Notification, toaster } from 'rsuite';
import Link from "next/link";
import Loading from '../../components/Loading';


function UserGroup() {
    const [loading, setLoading] = useState(true);
    const pushNotification = (type, header, message) => {
        toaster.push(
            <Notification type={type} header={header} closable>
                {message}
                <hr />
                {JSON.parse(localStorage.getItem('userData')).email}
            </Notification>, {
            placement: 'topEnd'
        });
        return true;
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const redirect = () => {
        Router.push('/');
    }

    return (
        <>
            {loading ? <Loading /> : "Null"}
            {!loading && pushNotification('info', 'Redirect', 'Select your group to continue') && redirect()}
        </>
    )
}

export default UserGroup
