import { Sidebar } from "primereact/sidebar";
import useStore from "./useStore";
import {useNavigate} from "react-router-dom";

const AppProfileSidebar = () => {
    const navigate = useNavigate()
    const {
        layoutState,
        setLayoutState,
        loginUser, setLoginUser,
    } = useStore().data;

    const onProfileSidebarHide = () => {
        setLayoutState((prevState:any) => ({
            ...prevState,
            profileSidebarVisible: false,
        }));
    };

    return (
        <Sidebar
            visible={layoutState.profileSidebarVisible}
            onHide={onProfileSidebarHide}
            position="right"
            className="layout-profile-sidebar w-full sm:w-25rem"
        >
            <div className="flex flex-column mx-auto md:mx-0">
                <span className="mb-2 font-semibold">Welcome</span>
                <span className="text-color-secondary font-medium mb-5">
                    {loginUser?.name}
                </span>

                <ul className="list-none m-0 p-0">
                    <li>
                        <div onClick={ () => navigate('/profile')} className="cursor-pointer  flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                            <span>
                                <i className="pi pi-user text-xl text-primary"></i>
                            </span>
                            <div className="ml-3">
                                <span className="mb-2 font-semibold">
                                    Profile
                                </span>
                                <p className="text-color-secondary m-0">
                                    {loginUser?.email}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div onClick={() => navigate("/profileupdate")} className="cursor-pointer  flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                            <span>
                                <i className="pi pi-user text-xl text-primary"></i>
                            </span>
                            <div className="ml-3">
                                <span className="mb-2 font-semibold">
                                   Update Profile
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div onClick={() => setLoginUser(null)} className="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                            <span>
                                <i className="pi pi-power-off text-xl text-primary"></i>
                            </span>
                            <div  className="ml-3">
                                <span className="mb-2 font-semibold">
                                    Sign Out
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </Sidebar>
    );
};

export default AppProfileSidebar;
