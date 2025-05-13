import React, { useRef} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import {useNavigate} from "react-router-dom";

import useStore from "../layout/useStore";
import {useFormik} from "formik";
import {Toast} from "primereact/toast";
import {errorType} from "../../types/error";
// import {errorType} from "../../types/task";



const validate = (values: {email: string, password: string} ) => {
    const errors:errorType= {};

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 5) {
        errors.password = 'Must be 5 characters or more';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
};




const SignIn = () => {
    const {data: { setLoginUser}} = useStore();
    const toast = useRef<Toast>(null);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: '',
        },
        validate,
        onSubmit: values => {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const validUser = users.find((user: any) => user.email === values.email && user.password === values.password);

            if (validUser) {
                localStorage.setItem('loggedInUser', JSON.stringify({id: validUser.id, name: validUser.name, email: validUser.email, role: validUser.role}));
                localStorage.setItem('isLoggedIn', "1");
                setLoginUser({
                    id: validUser.id,
                    name: validUser.name,
                    email: validUser.email,
                    role: validUser.role
                });
                navigate('/');
            } else {
                toast.current?.show({severity:'error', summary: 'Error', detail:'Invalid username or Password', life: 3000});
            }
        },
    });



    return (
        <div>
            <div className={"flex min-h-screen flex-column align-items-center justify-content-center screen-h-min"}>
                <div
                    className="flex flex-column  border-round  md:w-3 w-full p-3 shadow-2 align-items-center justify-content-center">
                    <Toast ref={toast} position="top-right" />
                    <h3>Sign In</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="w-full ">
                            <label htmlFor={"email"} className="block text-900 font-medium mb-2">Email:</label>
                            <InputText
                                name="email"
                                id={"email"}
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="w-full"
                            />
                        </div>
                        {formik.errors.email ? <div className={"text-red-500"}>{formik.errors.email}</div> : null}
                        <div className="w-full  mt-3">
                            <label htmlFor={"email"} className="block text-900 font-medium mb-2">Password:</label>
                            <Password
                                name="password"
                                id={"password"}
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className="w-full"
                                toggleMask
                            />
                        </div>
                        {formik.errors.password ? <div className={"text-red-500"}>{formik.errors.password}</div> : null}

                        <div className={"flex mt-3 justify-content-center"}>
                            <Button className="w-full" type={"submit"} label="Submit"/>
                        </div>
                    </form>

                    <div>
                        <p className="text-color-secondary m-0 mt-3">
                            Don't have an account? <a href="/signup">Sign Up</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignIn;