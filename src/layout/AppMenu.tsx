import type {MenuModel} from "../../types";
import AppSubMenu from "./AppSubMenu";

const AppMenu = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    const isAdmin = user?.role === "admin";
    const menu= isAdmin ? [
        {
            label: "Dashboards",
            icon: "pi pi-home",
            items: [
                {
                    label: "Home",
                    icon: "pi pi-fw pi-home",
                    to: "/",
                },
                {
                    label: "Admin",
                    icon: "pi pi-fw pi-user",
                    to: "/admin",
                },
                {
                    label:"tasks",
                    icon: "pi pi-fw pi-list",
                    to: "/tasks",
                }
            ],
        },
    ] : [
        {
            label: "Dashboards",
            icon: "pi pi-home",
            items: [
                {
                    label: "Home",
                    icon: "pi pi-fw pi-home",
                    to: "/",
                },
                {
                    label:"tasks",
                    icon: "pi pi-fw pi-list",
                    to: "/tasks",
                }
            ],
        },
    ];
    const model: MenuModel[] = menu;

    return <AppSubMenu model={model}/>;
};

export default AppMenu;
