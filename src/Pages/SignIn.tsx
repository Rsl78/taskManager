import React, {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import useData from "../GlobalProvider/useData/useData";
import {useNavigate} from "react-router-dom";
import useStore from "../layout/useStore";

interface loginFormData {
    email: string;
    password: string;
}

const SignIn = () => {
    const {
        data: {
            loginUser, setLoginUser
        }
    } = useStore();
    const [formData, setFormData] = useState<loginFormData>({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submit");
        // Add your form submission logic here
        // console.log(formData.email, formData.password);
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const validUser = users.find((user: any) => user.email === formData.email && user.password === formData.password);

        if (validUser) {
            console.log(validUser, "validUser");
            // setLoginUser({id: "1", name: "shuvo", email: "admin@gmail.com"});
            // setAccessToken("change token")
            setLoginUser({
                id: validUser.id,
                name: validUser.name,
                email: validUser.email
            });
            // localStorage.setItem("loggedInUser", JSON.stringify({id: validUser.id, name: validUser.name, email: validUser.email}));
            // setFormData({
            //     email: "",
            //     password: ""
            // });
            // console.log(user);
            navigate('/');


            // window.location.href = "/";
        } else {
            alert("Invalid email or password");
        }
    }

    console.log("user", loginUser);

    return (
        <div>

            <div className={"flex min-h-screen flex-column align-items-center justify-content-center screen-h-min"}>

                <div
                    className="flex flex-column  border-round  md:w-3 w-full p-3 shadow-2 align-items-center justify-content-center">
                    <h3>Sign In</h3>
                    <form onSubmit={handleSubmit}>
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
                            <Button type={"submit"} label="Submit"/>
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