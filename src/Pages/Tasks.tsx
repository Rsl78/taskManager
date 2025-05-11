import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from './service/ProductService';
interface Task {
    id: string | null;
    title: string;
    description: string;
    priority: string | null;
    status: string;
    userId: string;
    userName?: string;
}

export default function Tasks() {
    const [allTasks, setAllTasks] = useState<Task[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('tasks');
        if (stored) {
            setAllTasks(JSON.parse(stored));
        }
    }, []);

    console.log(allTasks);


    return (
        <div className="card">
            <DataTable value={allTasks} removableSort tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID" sortable ></Column>
                <Column field="userName" header="User Name" sortable ></Column>
                <Column field="title" header="Title" sortable ></Column>
                <Column field="description" header="Description" sortable ></Column>
                <Column field="priority" header="Priority" sortable ></Column>
                <Column field="status" header="Status" sortable ></Column>
            </DataTable>
        </div>
    );
}