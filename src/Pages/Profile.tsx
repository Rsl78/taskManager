import React, {useRef, useState} from 'react';
import {TabView, TabPanel} from 'primereact/tabview';
import useStore from "../layout/useStore";
import {InputText} from 'primereact/inputtext';
import {Toast} from "primereact/toast";
// import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
// import {Password} from 'primereact/password';
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import { Avatar } from 'primereact/avatar';
// import { Badge } from 'primereact/badge';
import { Dialog } from 'primereact/dialog';
interface UpdateFormValuesError {
    name?: string;
    email?: string;
}

interface UpdateImageFormValuesError {
    imageUrl?: string;
}

interface UpdatePasswordFormValuesError {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

const informationValidate = (values: { name: string, email: string }) => {
    const errors: UpdateFormValuesError = {};

    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length < 5) {
        errors.name = 'Must be 5 characters or more';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
};

const passwordValidate = (values: { oldPassword: string, newPassword: string, confirmPassword: string }) => {
    const errors: UpdatePasswordFormValuesError = {};

    if (!values.oldPassword) {
        errors.oldPassword = 'Required';
    } else if (values.oldPassword.length < 5) {
        errors.oldPassword = 'Must be 5 characters or more';
    }

    if (!values.newPassword) {
        errors.newPassword = 'Required';
    } else if (values.newPassword.length < 5) {
        errors.newPassword = 'Must be 5 characters or more';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    } else if (values.confirmPassword !== values.newPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
}

export default function Profile() {
    const {data: {loginUser, setLoginUser, setIsLoggedIn, allTasks}} = useStore()
    const toast = useRef<Toast>(null);
    const [showImgModal, setShowImgModal] = useState(false);

    const personalTasks = allTasks.filter((task: any) => task.assignPerson === loginUser.name);
    // const navigate = useNavigate();

    const passwordUpdate = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validate: passwordValidate,
        onSubmit: values => {
            const usersList = JSON.parse(localStorage.getItem("users") || '{}');
            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || '{}');
            const updatedUsersList = usersList.map((user: any) => {
                if (user.id === loggedInUser.id) {
                    return {...user, password: values.newPassword};
                }
                return user;
            });
            localStorage.setItem("users", JSON.stringify(updatedUsersList));
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Password Updated Successfully',
                life: 1000
            });
            setTimeout(() => {
                localStorage.removeItem('loggedInUser');
                localStorage.setItem('isLoggedIn', "false");
                setLoginUser(null);
                setIsLoggedIn(false);
            }, 1000);

        },
    })
    const informationUpdate = useFormik({
        initialValues: {
            name: loginUser.name,
            email: loginUser.email,
        },
        validate: informationValidate,
        onSubmit: values => {
            const usersList = JSON.parse(localStorage.getItem("users") || '{}');
            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || '{}');
            const updatedUsersList = usersList.map((user: any) => {
                if (user.id === loggedInUser.id) {
                    return {...user, ...values};
                }
                return user;
            });

            localStorage.setItem("users", JSON.stringify(updatedUsersList));
            localStorage.setItem("loggedInUser", JSON.stringify({...loggedInUser, ...values}));
            setLoginUser({...loggedInUser, ...values});
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Profile Updated Successfully',
                life: 1000
            });

        },
    });
    const imageUpdate = useFormik({
            initialValues: {
                imageUrl: loginUser.imageUrl,
            },
            validate: (values) => {
                const errors: UpdateImageFormValuesError = {};
                if (!values.imageUrl) {
                    errors.imageUrl = 'Required';
                }
                return errors;
            },
            onSubmit: values => {
                setShowImgModal(false)
                // console.log(e.target);
                const usersList = JSON.parse(localStorage.getItem("users") || '{}');
                const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || '{}');
                const updatedUsersList = usersList.map((user: any) => {
                    if (user.id === loggedInUser.id) {
                        return {...user, ...values};
                    }
                    return user;
                });

                localStorage.setItem("users", JSON.stringify(updatedUsersList));
                localStorage.setItem("loggedInUser", JSON.stringify({...loggedInUser, ...values}));
                setLoginUser({...loggedInUser, ...values});
                toast.current?.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Profile Updated Successfully',
                    life: 1000
                });
            },
        }
    )

    return (
        <div className="card  ">
            <TabView>
                {/*Profile update Tab*/}
                <TabPanel header="Profile" leftIcon="pi pi-user mr-2">
                    <Toast ref={toast} position="top-right"/>
                    <div
                        className={"flex flex-column  border-round  md:w-3 w-full align-items-center justify-content-center"}>
                        <form onSubmit={informationUpdate.handleSubmit}>
                            <div>
                                <Avatar className="h-8rem w-8rem relative" image={loginUser && loginUser.image? loginUser.imageUrl : "https://imgur.com/a/dih0Vz0"} shape="circle">
                                    <div onClick={() => setShowImgModal(true)} className="absolute border-circle bg-white flex bottom-0 justify-content-center align-items-center right-0 border-2 h-2rem w-2rem">
                                            <i className="pi pi-user-edit z-5" />
                                    </div>
                                </Avatar>
                            </div>
                            <div className="flex-auto ">
                                <label htmlFor="name" className="block text-900 font-medium mb-2">
                                    Name
                                </label>
                                <InputText
                                    name="name"
                                    id="name"
                                    type="text"
                                    className="w-full"
                                    value={informationUpdate.values.name}
                                    onChange={informationUpdate.handleChange}
                                />
                            </div>
                            {informationUpdate.errors.name ?
                                <div className={"text-red-500"}>{informationUpdate.errors.name}</div> : null}
                            <div className="flex-auto pt-2">
                                <label htmlFor="email" className="block text-900 font-medium mb-2">
                                    Email
                                </label>
                                <InputText
                                    name="email"
                                    id="email"
                                    type="email"
                                    className="w-full"
                                    value={informationUpdate.values.email}
                                    onChange={informationUpdate.handleChange}
                                />
                            </div>
                            {informationUpdate.errors.email ?
                                <div className={"text-red-500"}>{informationUpdate.errors.email}</div> : null}
                            <div className={"flex mt-3 "}>
                                <Button type={"submit"} label="Update"/>
                            </div>
                        </form>
                    </div>

                    <Dialog
                        visible={showImgModal}
                        style={{ width: '50vw' }}
                        onHide={() => {if (!showImgModal) return; setShowImgModal(false); }}
                        // footer={imgModalFooterContent}
                    >
                        <form onSubmit={imageUpdate.handleSubmit} className={"flex flex-column gap-5"}>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="image">New Image Url</label>
                                <InputText
                                    id="imageUrl"
                                    name={"imageUrl"}
                                    // value={"image"}
                                    onChange={imageUpdate.handleChange}
                                    value={imageUpdate.values.imageUrl}
                                    aria-describedby="username-image-help"
                                />
                                <small id="username-image-help">
                                    Enter your image url to change the profile image.
                                </small>

                            </div>
                            <div className={"flex justify-content-end"}>
                                <div className={""}>
                                    <Button label="No" icon="pi pi-times" onClick={(e) => {
                                        e.preventDefault();
                                        setShowImgModal(false)
                                    }} className="p-button-text" />
                                    <Button type={'submit'} label="Yes" icon="pi pi-check" autoFocus />
                                </div>
                            </div>
                        </form>
                    </Dialog>
                </TabPanel>

                {/*Password update tab*/}
                <TabPanel header="Security" leftIcon="pi pi-cog mr-2">
                    <Toast ref={toast} position="top-right"/>
                    <div
                        className={"flex flex-column  border-round  md:w-3 w-full align-items-center justify-content-center"}>
                        <form onSubmit={passwordUpdate.handleSubmit}>

                            <div className="w-full  mt-3">
                                <label htmlFor={"oldPassword"} className="block text-900 font-medium mb-2">Old
                                    Password:</label>
                                <Password
                                    name="oldPassword"
                                    id={"oldPassword"}
                                    type="password"
                                    value={passwordUpdate.values.oldPassword}
                                    onChange={passwordUpdate.handleChange}
                                    className="w-full"
                                    toggleMask
                                />
                            </div>
                            {passwordUpdate.errors.oldPassword ?
                                <div className={"text-red-500"}>{passwordUpdate.errors.oldPassword}</div> : null}
                            <div className="w-full  mt-3">
                                <label htmlFor={"newPassword"} className="block text-900 font-medium mb-2">New
                                    Password:</label>
                                <Password
                                    name="newPassword"
                                    id={"newPassword"}
                                    type="password"
                                    value={passwordUpdate.values.newPassword}
                                    onChange={passwordUpdate.handleChange}
                                    className="w-full"
                                    toggleMask
                                />
                            </div>
                            {passwordUpdate.errors.newPassword ?
                                <div className={"text-red-500"}>{passwordUpdate.errors.newPassword}</div> : null}

                            <div className="w-full  mt-3">
                                <label htmlFor={"confirmPassword"} className="block text-900 font-medium mb-2">Confirm
                                    Password:</label>
                                <Password
                                    name="confirmPassword"
                                    id={"confirmPassword"}
                                    type="password"
                                    value={passwordUpdate.values.confirmPassword}
                                    onChange={passwordUpdate.handleChange}
                                    className="w-full"
                                    toggleMask
                                />
                            </div>
                            {passwordUpdate.errors.confirmPassword ?
                                <div className={"text-red-500"}>{passwordUpdate.errors.confirmPassword}</div> : null}
                            <div className={"flex mt-3 "}>
                                <Button type={"submit"} label="Update"/>
                            </div>
                        </form>
                    </div>
                </TabPanel>

                {/*Tasks tab*/}
                <TabPanel header="Tasks" leftIcon="pi pi-fw pi-list mr-2">
                    <DataTable value={personalTasks} removableSort tableStyle={{ minWidth: '50rem' }}>
                        <Column field="id" header="ID" sortable ></Column>
                        <Column field="assignPerson" header="Assign Person" sortable ></Column>
                        <Column field="title" header="Title" sortable ></Column>
                        <Column field="description" header="Description" sortable ></Column>
                        <Column field="priority" header="Priority" sortable ></Column>
                        <Column field="status" header="Status" sortable ></Column>
                    </DataTable>
                </TabPanel>


            </TabView>
        </div>
    )
}
