import styles from '../styles/NavTop.module.css'
import Image from "next/image";
import Link from "next/link";
import User from '@rsuite/icons/legacy/User';
import { useEffect, useState } from 'react';



const NavTop = () => {
    const [breadcrumb, setBreadcrumb] = useState([]);

    useEffect(() => {

        let url = window.location.pathname;
        // '/api/v1/breadcrumb' ||
        let urlArray = url.split('/');

        // console.log(urlArray);
        let currentBreadcrumb = [];
        for (let i = 0; i < urlArray.length; i++) {
            if (urlArray[i] !== '') {
                if (currentBreadcrumb.length > 0) {
                    currentBreadcrumb.push(currentBreadcrumb.at(-1) + '/' + urlArray[i]);
                } else {
                    currentBreadcrumb.push(urlArray[i]);
                }
            }
        }

        // set currentBreadcrumb
        setBreadcrumb(currentBreadcrumb);
    
    }, []);

    return (
        <nav className={styles.NavTop}>
            <div className={styles.navWrapper}>
                <div className={styles.breadcrumbs}>
                    {
                        breadcrumb.length > 0 &&
                        (
                            <>
                                <div className={styles.eachBreadCrubs}>
                                    <Link href='/' >
                                        Home
                                    </Link>
                                </div>
                                <div className={styles.eachBreadCrubsMiddle}>&gt;</div>
                            </>
                        )
                    }
                    {
                        breadcrumb.length > 0 ?
                            breadcrumb.map((item, index) => {
                                if (index === breadcrumb.length - 1) {
                                    return (
                                        <div className={styles.eachBreadCrubs}>
                                            {item.split('/').at(-1)}
                                        </div>
                                    )
                                } else {
                                    return (
                                        <>
                                            <div key={index} className={styles.eachBreadCrubs}>
                                                <Link href={item}>
                                                    {item.split('/').at(-1)}
                                                </Link>
                                            </div>
                                            <div key={index} className={styles.eachBreadCrubsMiddle}>
                                                &gt;
                                            </div>
                                        </>
                                    )
                                }
                            })
                            :
                            <div className={styles.imageCointainer}>
                                <Image src="/GULogo.svg" width="40" height="40" alt="Logo Image" style={{ margin: "auto", }} />
                            </div>
                    }
                </div>
                <div className={styles.userLogo}>
                    <Link href="/UserAccount" passHref >
                        <User width="30" height="30" className={styles.ImageItself} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavTop;
