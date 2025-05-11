import React, {useRef} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {Password} from "primereact/password";
import {useNavigate} from "react-router-dom";
import { Toast } from 'primereact/toast';
import { useFormik } from 'formik';

interface errorType {
    name?: string;
    email?: string;
    password?: string;
}

const validate = (values: {email: string, password: string, name: string} ) => {
    const errors:errorType = {};
    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length <3 ) {
        errors.name = 'Must be 3 characters or more';
    }

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

const SignUp = () => {
    const toast = useRef<Toast>(null);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            try {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                users.push({id:crypto.randomUUID(),...values});
                localStorage.setItem('users', JSON.stringify(users));

                toast.current?.show({severity:'success', summary: 'Success', detail:'Sign Up Successfully', life: 1000});
                setTimeout(() => {
                    navigate("/signin");
                }, 1000);
            } catch (error) {
                toast.current?.show({severity:'error', summary: 'Error', detail:'Sign Up Failed', life: 3000});
            }
        },
    });

    return (
        <div>
            <div className={"flex min-h-screen flex-column align-items-center justify-content-center screen-h-min"}>
                <div className="flex flex-column  border-round  md:w-3 w-full p-3 shadow-2 align-items-center justify-content-center">
                    <Toast ref={toast} position="top-right" />
                    <h3>Sign Up</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="w-full ">
                            <label htmlFor={"name"} className="block text-900 font-medium mb-2">Name:</label>
                            <InputText
                                name="name"
                                id={"name"}
                                type="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className="w-full"
                            />
                        </div>
                        {formik.errors.name ? <div className={"text-red-500"}>{formik.errors.name}</div> : null}
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
                            <label htmlFor={"password"} className="block text-900 font-medium mb-2">Password:</label>
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
                            <Button type={"submit"} label="Submit" />
                        </div>
                    </form>
                    <div>
                        <p className="text-color-secondary m-0 mt-3">
                            Already have an account? <a href="/signin">Sign In</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SignUp;