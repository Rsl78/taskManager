import React, {useRef, useState} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {Password} from "primereact/password";
import {useNavigate} from "react-router-dom";
import { Toast } from 'primereact/toast';


interface SignUpFormData{
    id: string;
    email: string;
    password: string;
    name: string;
}

const SignUp = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        id: "",
        email: "",
        password: "",
        name:""
    })
    const toast = useRef<Toast>(null);

    const navigate = useNavigate();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
            id: crypto.randomUUID()
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(formData);
            localStorage.setItem('users', JSON.stringify(users));
            setFormData({
                id: "",
                email: "",
                password: "",
                name: ""
            });
            toast.current?.show({severity:'success', summary: 'Success', detail:'Sign Up Successfully', life: 1000});
            setTimeout(() => {
                navigate("/signin");
            }, 1000);
        } catch (error) {
            toast.current?.show({severity:'error', summary: 'Error', detail:'Sign Up Failed', life: 3000});
        }
    };

    return (
        <div>

            <div className={"flex min-h-screen flex-column align-items-center justify-content-center screen-h-min"}>

                <div className="flex flex-column  border-round  md:w-3 w-full p-3 shadow-2 align-items-center justify-content-center">
                    <Toast ref={toast} position="top-right" />
                    <h3>Sign Up</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="w-full ">
                            <label htmlFor={"name"} className="block text-900 font-medium mb-2">Name:</label>
                            <InputText
                                name="name"
                                id={"name"}
                                type="name"
                                value={formData.name}
                                onChange={handleOnChange}
                                className="w-full"
                            />
                        </div>
                        <div className="w-full ">
                            <label htmlFor={"email"} className="block text-900 font-medium mb-2">Email:</label>
                            <InputText
                                name="email"
                                id={"email"}
                                type="email"
                                value={formData.email}
                                onChange={handleOnChange}
                                className="w-full"
                            />
                        </div>
                        <div className="w-full  mt-3">
                            <label htmlFor={"email"} className="block text-900 font-medium mb-2">Password:</label>
                            <Password
                                name="password"
                                id={"password"}
                                type="password"
                                value={formData.password}
                                onChange={handleOnChange}
                                className="w-full"
                                toggleMask
                            />
                        </div>

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