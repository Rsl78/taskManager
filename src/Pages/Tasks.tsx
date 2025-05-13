import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useStore from "../layout/useStore";
import {Task} from "../../types/task";

const imageBodyTemplate = (allTasks:Task) => {
    return <img src={`https://primefaces.org/cdn/primereact/images/product/${allTasks.documents}`} alt={`${allTasks.documents}`} width="64px" className="shadow-4" />;
};

export default function Tasks() {
    const {data:{allTasks}} = useStore()
    return (
        <div className="card">
            <DataTable value={allTasks} removableSort tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID" sortable ></Column>
                <Column field="assignPerson" header="Assign Person" sortable ></Column>
                <Column field="title" header="Title" sortable ></Column>
                <Column field="description" header="Description" sortable ></Column>
                <Column field="documents" header="Documents" body={imageBodyTemplate}></Column>
                <Column field="priority" header="Priority" sortable ></Column>
                <Column field="status" header="Status" sortable ></Column>
            </DataTable>
        </div>
    );
}