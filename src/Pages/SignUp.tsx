import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {Password} from "primereact/password";

interface SignUpFormData{
    email: string;
    password: string;
    name: string;
}

const SignUp = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        email: "",
        password: "",
        name:""
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submit");
        // Add your form submission logic here
        console.log(formData.email, formData.password);
    }

    return (
        <div>

            <div className={"flex min-h-screen flex-column align-items-center justify-content-center screen-h-min"}>

                <div className="flex flex-column  border-round  md:w-3 w-full p-3 shadow-2 align-items-center justify-content-center">
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