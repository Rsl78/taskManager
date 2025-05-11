import type {MenuModel} from "../../types";
import AppSubMenu from "./AppSubMenu";

const AppMenu = () => {
    const model: MenuModel[] = [
        {
            label: "Dashboards",
            icon: "pi pi-home",
            items: [
                {
                    label: "Home",
                    icon: "pi pi-fw pi-home",
                    to: "/",
                },
                // {
                //     label: "profile",
                //     icon: "pi pi-fw pi-user",
                //     to: "/profile",
                // },
                {
                    label:"tasks",
                    icon: "pi pi-fw pi-list",
                    to: "/tasks",
                }
            ],
        },
    ];

    return <AppSubMenu model={model}/>;
};

export default AppMenu;
