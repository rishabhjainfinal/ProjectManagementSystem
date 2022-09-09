import { motion } from "framer-motion"
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Register.module.css'
import InputPicker from 'rsuite/InputPicker';
import { useEffect, useState } from "react";
import { Notification, toaster } from 'rsuite';
import Loading from "../components/Loading";
import StepsLine from "../components/StepsLine";
import axios from 'axios';

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


const BasicInfo = ({ user_name,
    setUserName,
    user_mobile,
    setUserMobile,
    user_department,
    setUserDepartment,
    user_cate,
    setUserCate, setError }) => {

    const [departmentData, setDepartmentData] = useState([]);

    const [cateData, setCateData] = useState([]);

    // mobile number input field validator
    const validateMobile = (value) => {
        // console.log(value)
        if (value.length === 0) {
            setError('Mobile number is required');
            return;
        }
        if (value.length !== 10) {
            setError('Mobile number must be 10 digits');
            return;
        }
        if (!/^[0-9]+$/.test(value)) {
            setError('Mobile number must be digits only');
            return;
        }
        setError('');
    }


    useEffect(() => {
        // get departmentData from server
        fetch("/api/departmentData")
            .then(res => res.json())
            .then(setDepartmentData);

        // get cateData from server
        fetch("/api/catogoryOptions")
            .then(res => res.json())
            .then(setCateData);
    }, []);

    return (
        <>
            {/* name */}
            <div className={styles.inputcointainer}>
                <label className={styles.label}>User Name</label>
                <input className={styles.input}
                    type="text"
                    name="user_name"
                    value={user_name}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>

            {/* mobile */}
            <div className={styles.inputcointainer}>
                <label className={styles.label}>User Mobile</label>
                <input className={styles.input}
                    type="number"
                    name="user_mobile"
                    value={user_mobile}
                    onChange={(e) => setUserMobile(e.target.value)}
                    onInput={(e) => validateMobile(e.target.value)}
                />
            </div>

            {/* department */}
            <div className={styles.inputcointainer}>
                <label className={styles.label}>User Department</label>
                <InputPicker className={styles.inputCatogoty}
                    value={user_department}
                    onChange={setUserDepartment}
                    data={departmentData}
                />
            </div>

            {/* catogory */}
            <div className={styles.inputcointainer}>
                <label className={styles.label}>User catogory</label>
                <InputPicker className={styles.inputCatogoty}
                    value={user_cate}
                    onChange={setUserCate}
                    data={cateData}
                    placement="topStart"
                />
            </div>
        </>
    )
}

const LoginInfo = ({ user_email, setUserEmail, user_pwd, setUserPwd, setError }) => {
    // email validator
    const validateEmail = (value) => {
        if (value.length === 0) {
            setError('Email is required');
            return;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            setError('Invalid email address');
            return;
        }
        setError('');
    }
    useEffect(() => {
        setError('Password is required');
    })

    const passwordValueCheck = (value) => {
        // check if both the password and confirm password are same
        if (value.length === 0) {
            setError('Password is required');
            return;
        } else if (value !== user_pwd) {
            setError('Confirm Password must be same as Password');
            return;
        } else {
            setError('');
        }
    }

    return (
        <>
            {/* email */}
            <div className={styles.inputcointainer}>
                <label className={styles.label}>User Email</label>
                <input className={styles.input}
                    type="email"
                    name="user_email"
                    value={user_email}
                    onChange={(e) => setUserEmail(e.target.value)}
                    onInput={(e) => validateEmail(e.target.value)}

                />
            </div>

            {/* password */}
            <div className={styles.inputcointainer}>
                <label className={styles.label}>User Password</label>
                <input className={styles.input}
                    type="password"
                    name="user_pwd"
                    value={user_pwd}
                    onChange={(e) => setUserPwd(e.target.value)}
                />
            </div>

            {/* confirm password */}
            <div className={styles.inputcointainer}>
                <label className={styles.label}>Confirm Password</label>
                <input className={styles.input}
                    type="password"
                    onInput={(e) => passwordValueCheck(e.target.value)}
                />
            </div>

        </>
    )
}

const UserSpecificInfo = ({
    user_cate,
    student_enrol_num,
    setStudentEnrolNum,
    student_admi_num,
    setStudentAdmiNum,
    student_deg,
    setStudentDeg,
    student_branch,
    setStudentBranch,
    student_sem,
    setStudentSem,

    teacher_employment_num,
    setTeacherEmploymentNum,
    teacher_mobile_num,
    setTeacherMobileNum,
    teacher_cabin_num,
    setTeacherCabinNum,
    setError
}) => {
    const [degData, setDegData] = useState([]);
    const [branchData, setBranchData] = useState([]);
    const semData = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
    ];

    // mobile number input field validator
    const validateMobile = (value) => {
        // console.log(value)
        if (value.length === 0) {
            setError('Mobile number is required');
            return;
        }
        if (value.length !== 10) {
            setError('Mobile number must be 10 digits');
            return;
        }
        if (!/^[0-9]+$/.test(value)) {
            setError('Mobile number must be digits only');
            return;
        }
        setError('');
    }

    useEffect(() => {
        setError(e => {
            console.log(e)
            return e;
        });
        // get degData from server
        if (user_cate === 'Project Team Member') {
            fetch("/api/degreeData")
                .then(res => res.json())
                .then(setDegData);

            // get branchData from server
            fetch("/api/branchData")
                .then(res => res.json())
                .then(setBranchData);
        }
    },[user_cate, setError])

    if (user_cate === 'Project Team Member') {
        return (
            <>
                {/* student_enrol_num */}
                <div className={styles.inputcointainer}>
                    <label className={styles.label}>Student Enrollment Number</label>
                    <input className={styles.input}
                        type="text"
                        name="student_enrol_num"
                        value={student_enrol_num}
                        onChange={(e) => setStudentEnrolNum(e.target.value)}
                    />
                </div>

                {/* student_admi_num */}
                <div className={styles.inputcointainer}>
                    <label className={styles.label}>Student Admission Number</label>
                    <input className={styles.input}
                        type="text"
                        name="student_admi_num"
                        value={student_admi_num}
                        onChange={(e) => setStudentAdmiNum(e.target.value)}
                    />
                </div>

                {/* student_deg */}
                <div className={styles.inputcointainer}>
                    <label className={styles.label}>Student Degree</label>
                    <InputPicker className={styles.inputCatogoty}
                        value={student_deg}
                        onChange={setStudentDeg}
                        data={degData}
                    />
                </div>

                {/* student_branch */}
                <div className={styles.inputcointainer}>
                    <label className={styles.label}>Student Branch</label>
                    <InputPicker className={styles.inputCatogoty}
                        value={student_branch}
                        onChange={setStudentBranch}
                        data={branchData}
                        placement="topStart"
                    />
                </div>

                {/* student_sem */}
                <div className={styles.inputcointainer}>
                    <label className={styles.label}>Student Semester</label>
                    <InputPicker className={styles.inputCatogoty}
                        value={student_sem}
                        onChange={setStudentSem}
                        data={semData}
                        placement="topStart"
                    />
                </div>
            </>
        )
    } else {
        return (
            <>
                {/* teacher_employment_num */}
                <div className={styles.inputcointainer}>
                    <label className={styles.label}>Faculty Employment Number</label>
                    <input className={styles.input}
                        type="text"
                        name="teacher_employment_num"
                        value={teacher_employment_num}
                        onChange={(e) => setTeacherEmploymentNum(e.target.value)}
                    />
                </div>

                {/* teacher_mobile_num */}
                <div className={styles.inputcointainer}>
                    <label className={styles.label}>Faculty Mobile Number</label>
                    <input className={styles.input}
                        type="number"
                        name="teacher_mobile_num"
                        value={teacher_mobile_num}
                        onChange={(e) => setTeacherMobileNum(e.target.value)}
                        onInput={(e) => validateMobile(e.target.value)}
                    />
                </div>

                {/* teacher_cabin_num */}
                <div className={styles.inputcointainer}>
                    <label className={styles.label}>Faculty Cabin Number</label>
                    <input className={styles.input}
                        type="text"
                        name="teacher_cabin_num"
                        value={teacher_cabin_num}
                        onChange={(e) => setTeacherCabinNum(e.target.value)}
                    />
                </div>
            </>
        )
    }
}


const Register = () => {
    const [step, setStep] = useState(0);

    const [user_name, setUserName] = useState("");
    const [user_mobile, setUserMobile] = useState("");
    const [user_department, setUserDepartment] = useState("");
    const [user_cate, setUserCate] = useState("");

    const [user_email, setUserEmail] = useState('');
    const [user_pwd, setUserPwd] = useState('');

    const [student_enrol_num, setStudentEnrolNum] = useState("");
    const [student_admi_num, setStudentAdmiNum] = useState("");
    const [student_deg, setStudentDeg] = useState("");
    const [student_branch, setStudentBranch] = useState("");
    const [student_sem, setStudentSem] = useState("");

    const [teacher_employment_num, setTeacherEmploymentNum] = useState("");
    const [teacher_mobile_num, setTeacherMobileNum] = useState("");
    const [teacher_cabin_num, setTeacherCabinNum] = useState("");



    const [error, setError] = useState("");
    const [submiting, setSubmiting] = useState(false);

    const updateSteps = (count) => {
        if ((step + count) > 2) {
            setStep(2);
        } else if ((step + count) < 0) {
            setStep(0);
        } else {
            setStep(step + count);
        }
    }


    const handleStepChange = () => {
        return new Promise((resolve, reject) => {
            if (step === 0) {
                if (error.length) {
                    pushNotification('error', 'Mobile No.', error, { email: '' });
                    reject()
                } else if (user_name && user_mobile && user_department && user_cate) {
                    resolve()
                } else {
                    pushNotification('error', 'Error', 'Please fill all the fields 🙄', { email: '' })
                    reject()
                }
            }
            else if (step === 1) {
                // update data in defaults value
                if (error.length) {
                    // check if error cointains email then show email error
                    if (error.includes('Email')) {
                        pushNotification('error', 'Email', error, { email: '' });
                    } else {
                        pushNotification('error', 'Password', error, { email: '' });
                    }
                    reject()
                } else if (user_email && user_pwd) {
                    resolve()
                } else {
                    pushNotification('error', 'Error', 'Please fill all the fields 🙄', { email: '' })
                    reject()
                }
            } else {
                if (error.length) {
                    pushNotification('error', 'Mobile No.', error, { email: '' });
                    resolve()
                } else if ((student_enrol_num && student_admi_num && student_deg && student_branch && student_sem) || (teacher_employment_num && teacher_mobile_num && teacher_cabin_num)) {
                    reject()
                } else {
                    pushNotification('error', 'Error', 'Please fill all the fields 🙄', { email: '' })
                    resolve()
                }
            }
        })
    }

    // handle submit
    const handleSubmit = () => {
        const formData = {
            user_name,
            user_mobile,
            user_department,
            user_cate,

            user_email,
            user_pwd,

            student_enrol_num,
            student_admi_num,
            student_deg,
            student_branch,
            student_sem,

            teacher_employment_num,
            teacher_mobile_num,
            teacher_cabin_num
        }

        axios.post('/api2/register', formData, {
            headers: {
                'Content-Type': 'application/json',
            }, withCredentials: true
        }).then(res => {
            if (res.status === 200) {
                pushNotification('success', 'Success', 'Registration Successful 🙌', { email: formData.user_email });
                window.location.href = '/Login'
            } else {
                // console.log(res.data)
                pushNotification('error', 'Error', res.data.message+'. Try with different Email', { email: '' })
                setSubmiting(false)
            }
        }).catch(err => {
            // console.log
            pushNotification('error', 'Error', 'Something went wrong 🙄', { email: '' })
            setSubmiting(false)
        })

        // finally
        setSubmiting(false);

    }

    // on the basis of step value render the form
    const renderForm = () => {
        if (step === 0) {
            return (
                <BasicInfo
                    user_name={user_name}
                    setUserName={setUserName}
                    user_mobile={user_mobile}
                    setUserMobile={setUserMobile}
                    user_department={user_department}
                    setUserDepartment={setUserDepartment}
                    user_cate={user_cate}
                    setUserCate={setUserCate}
                    setError={setError} />
            )
        } else if (step === 1) {
            return (
                <LoginInfo
                    user_email={user_email}
                    setUserEmail={setUserEmail}
                    user_pwd={user_pwd}
                    setUserPwd={setUserPwd}
                    setError={setError} />
            )
        } else {
            return (
                <UserSpecificInfo
                    user_cate={user_cate}
                    student_enrol_num={student_enrol_num}
                    setStudentEnrolNum={setStudentEnrolNum}
                    student_admi_num={student_admi_num}
                    setStudentAdmiNum={setStudentAdmiNum}
                    student_deg={student_deg}
                    setStudentDeg={setStudentDeg}
                    student_branch={student_branch}
                    setStudentBranch={setStudentBranch}
                    student_sem={student_sem}
                    setStudentSem={setStudentSem}
                    teacher_employment_num={teacher_employment_num}
                    setTeacherEmploymentNum={setTeacherEmploymentNum}
                    teacher_mobile_num={teacher_mobile_num}
                    setTeacherMobileNum={setTeacherMobileNum}
                    teacher_cabin_num={teacher_cabin_num}
                    setTeacherCabinNum={setTeacherCabinNum}
                    setError={setError} />
            )
        }
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
            <nav className={styles.nav}>
                <StepsLine current={step} />
            </nav>
            {/* <StepsLine current={-1}/> */}
            <div id="container" className={styles.container} >
                <div className={styles.leftside}>
                    <div className={styles.imageCointainer}>
                        <Image src="/GULogo.svg" width="400" height="350" alt="Logo Image" className={styles.imageItself} />
                    </div>
                </div>

                <form className={styles.rightside} name="register" onSubmit={handleSubmit}
                >
                    <h2 className={styles.heading}>
                        Project Register Portal
                    </h2>
                    {renderForm()}
                    <div className={styles.btnContainer}>
                        <button className={styles.BtnItself}
                            type="button"
                            onClick={() => {
                                updateSteps(-1)
                                setError("")
                            }}
                            disabled={step < 0 ? true : false}>
                            Previous
                        </button>
                        <button className={styles.BtnItself}
                            type='button'
                            onClick={(e) => {
                                handleStepChange()
                                    .then(res => updateSteps(1))
                                    .catch(err => {
                                        if (step === 2) {
                                            setSubmiting(true)
                                            handleSubmit()
                                            // document.register.submit()
                                        }
                                    })
                            }}>
                            {submiting ? <Loading /> :
                                step >= 2 ? 'submit' : 'next'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </motion.section>
    )
}


export default Register