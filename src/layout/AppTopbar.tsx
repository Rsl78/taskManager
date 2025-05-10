import type {AppTopbarRef} from "../../types";
import {forwardRef, useImperativeHandle, useRef} from "react";
import AppBreadcrumb from "./AppBreadCrumb";
import useStore from "./useStore";
import { Avatar } from 'primereact/avatar';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { onMenuToggle, showProfileSidebar } =
        useStore().data;
    const menubuttonRef = useRef(null);
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
    }));

    return (
        <div className="layout-topbar">
            <div className="topbar-start">
                <button
                    ref={menubuttonRef}
                    type="button"
                    className="topbar-menubutton p-link p-trigger"
                    onClick={onMenuToggle}
                >
                    <i className="pi pi-bars"></i>
                </button>
                <AppBreadcrumb className="topbar-breadcrumb"></AppBreadcrumb>
            </div>

            <Avatar shape="circle"  onClick={ showProfileSidebar} image={"https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp"} className="flex align-items-center justify-content-center mr-2" size="xlarge" />
            {/*<p*/}
            {/*onClick={showProfileSidebar}>*/}
            {/*    rf*/}
            {/*</p>*/}
        </div>
    );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
