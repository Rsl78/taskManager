import {useEffect, useState} from 'react';
import {Breadcrumb, LayoutConfig, LayoutState} from "../../../types";
import {Task} from "../../../types/task";

interface userData {
    id: string;
    name: string;
    email: string;
    role?: string;
    imageUrl ?: string | null;
}


const UseData = () => {
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
    const [loginUser, setLoginUser] = useState<userData|null>({
        id:"",
        name: "",
        email: "",
        role:"user",
        imageUrl: null,
    });
    const [isLoggedIn,setIsLoggedIn] = useState(true)
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
        ripple: true,
        inputStyle: "outlined",
        menuMode: "static",
        menuTheme: "colorScheme",
        colorScheme: "light",
        theme: "cyan",
        scale: 14,
    });

    const [accessToken, setAccessToken] = useState<string>("my token")
    const [layoutState, setLayoutState] = useState<LayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        overlaySubmenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
        resetMenu: false,
        sidebarActive: false,
        anchored: false,
    });

    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                overlayMenuActive: !prevLayoutState.overlayMenuActive,
            }));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuDesktopInactive:
                    !prevLayoutState.staticMenuDesktopInactive,
            }));
        } else {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive,
            }));
        }
    };

    const showConfigSidebar = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            configSidebarVisible: true,
        }));
    };

    const showProfileSidebar = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            profileSidebarVisible: !prevLayoutState.profileSidebarVisible,
        }));
    };

    const isOverlay = () => {
        return layoutConfig.menuMode === "overlay";
    };

    const isSlim = () => {
        return layoutConfig.menuMode === "slim";
    };

    const isSlimPlus = () => {
        return layoutConfig.menuMode === "slim-plus";
    };

    const isHorizontal = () => {
        return layoutConfig.menuMode === "horizontal";
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    useEffect(() => {
        const stored = localStorage.getItem('tasks');
        if (stored) {
            setAllTasks(JSON.parse(stored));
        }
    }, []);

    return {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        showConfigSidebar,
        showProfileSidebar,
        isSlim,
        isSlimPlus,
        isHorizontal,
        isDesktop,
        breadcrumbs,
        setBreadcrumbs,
        accessToken,
        setAccessToken,
        loginUser,
        setLoginUser,
        allTasks,
        setAllTasks,
        isLoggedIn,setIsLoggedIn
    };
};

export default UseData;