import React from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from '../../styles/eachPage/AddFaculty.module.css';
import Uploader from 'rsuite/Uploader';
import Divider from 'rsuite/Divider';
import axios from 'axios';
import { Notification, toaster } from 'rsuite';

function AddFaculty() {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        var elements = e.target.elements;
        const data = {};
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].name || elements[i].value) {
                data[elements[i].name] = elements[i].value;
            }
        }
        // check if these fields exist if not add them empty string user_name
        const fields = [
            'user_mobile',
            'user_department',
            'user_cate',
            'user_email',
            'user_pwd',
            'student_enrol_num',
            'student_admi_num',
            'student_deg',
            'student_branch',
            'student_sem',
            'teacher_employment_num',
            'teacher_mobile_num',
            'teacher_cabin_num'
        ]
        for (let i = 0; i < fields.length; i++) {
            if (!data[fields[i]]) {
                data[fields[i]] = '';
            }
        }
        // console.log(data);



        // send data to server
        axios.post('/api2/register', data, { withCredentials: true })
            .then(res => {
                pushNotification('success', 'Success', 'User Added Successfully', { email: '' })
            }
            ).catch(err => {
                pushNotification('error', 'Error', 'Something went wrong, Try Login Again', { email: '' })
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.uploadcsv}>
                <Uploader
                    action={axios.defaults.baseURL + "/api2/csvUser"}
                    withCredentials={true}
                    multiple={false}
                    draggable>
                    <div>Click or Drag CSV files to this area to upload and add Faculty</div>
                </Uploader>
            </div>
            {/* divider */}
            <Divider>Or</Divider>
            {/* input fields to add data to upload */}
            <form name="register" className={styles.formItself} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <div className={styles.tittle}>Upload it Manually</div>
                    <button type="submit" className={styles.updateBtn}>Add Faculty</button>
                </div>
                <div className={styles.inputAreaCointainer}>
                    <div className={styles.inputCointainer}>
                        <div className={styles.lableforInput}>Name</div>
                        <input required type="text" className={styles.inputItself} name='user_name' />
                    </div>
                    <div className={styles.inputCointainer}>
                        <div className={styles.lableforInput}>Mobile</div>
                        <input required type="number" className={styles.inputItself} name='user_mobile' />
                    </div>
                    <div className={styles.inputCointainer}>
                        <div className={styles.lableforInput}>Email</div>
                        <input required type="email" className={styles.inputItself} name='user_email' />
                    </div>
                    <div className={styles.inputCointainer}>
                        <div className={styles.lableforInput}>Password</div>
                        <input required type="password" className={styles.inputItself} name='user_pwd' />
                    </div>
                    <div className={styles.inputCointainer}>
                        <div className={styles.lableforInput}>Department</div>
                        <input required type="text" className={styles.inputItself} name='user_department' />
                    </div>
                    <div className={styles.inputCointainer}>
                        <div className={styles.lableforInput}>Catogory</div>
                        <input required type="text" className={styles.inputItself} name='user_cate' />
                    </div>
                    <div className={styles.inputCointainer}>
                        <div className={styles.lableforInput}>Entolement no.</div>
                        <input required type="text" className={styles.inputItself} name='teacher_employment_num' />
                    </div>
                    <div className={styles.inputCointainer}>
                        <div className={styles.lableforInput}>Cabin no.</div>
                        <input required type="text" className={styles.inputItself} name='teacher_cabin_num' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddFaculty