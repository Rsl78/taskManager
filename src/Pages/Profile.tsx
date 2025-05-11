import React, {useState, useEffect, useRef} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
// import { ProductService } from '../service/ProductService';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {InputTextarea} from 'primereact/inputtextarea';
import {RadioButton, RadioButtonChangeEvent} from 'primereact/radiobutton';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Tag} from 'primereact/tag';
import useStore from '../layout/useStore';
import {Task} from "../../types/task";



export default function Profile() {
    const {data: {loginUser, allTasks:tasks, setAllTasks:setTasks}} = useStore();
    let emptyTask: Task = {
        userId: loginUser.id,
        userName: loginUser?.name,
        id: null,
        title: '',
        description: '',
        priority: null,
        status: ''
    };

    console.log('allTasks from profile page', tasks)

    const [taskDialog, setTaskDialog] = useState<boolean>(false);
    const [deleteTaskDialog, setDeleteTaskDialog] = useState<boolean>(false);
    const [deleteTasksDialog, setDeleteTasksDialog] = useState<boolean>(false);
    const [task, setTask] = useState<Task>(emptyTask);
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Task[]>>(null);

    const personalTasks = tasks.filter((task: Task) => task.userId === loginUser.id);

    useEffect(() => {
        const stored: any = localStorage.getItem('tasks');
        if (stored) {
            setTasks(JSON.parse(stored))
        }
    }, [localStorage.getItem('tasks')]);

    const openNew = () => {
        setTask(emptyTask);
        setSubmitted(false);
        setTaskDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setTaskDialog(false);
    };

    const hideDeleteTaskDialog = () => {
        setDeleteTaskDialog(false);
    };

    const hideDeleteTasksDialog = () => {
        setDeleteTasksDialog(false);
    };

    const saveTask = () => {
        setSubmitted(true);

        if (task.title.trim()) {
            let _tasks = [...tasks];
            let _task = {...task};

            if (task.id) {
                const index = findIndexById(task.id);

                _tasks[index] = _task;
                toast.current?.show({severity: 'success', summary: 'Successful', detail: 'Task Updated', life: 3000});
            } else {
                _task.id = createId();
                _tasks.push(_task);
                localStorage.setItem('tasks', JSON.stringify(_tasks));
                toast.current?.show({severity: 'success', summary: 'Successful', detail: 'Task Created', life: 3000});
            }

            setTasks(_tasks);
            setTaskDialog(false);
            setTask(emptyTask);
        }
    };

    const editTask = (task: Task) => {
        setTask({...task});
        setTaskDialog(true);
    };

    const confirmDeleteTask = (task: Task) => {
        setTask(task);
        setDeleteTaskDialog(true);
    };

    const deleteTask = () => {
        let _tasks = tasks.filter((val:Task) => val.id !== task.id);

        setTasks(_tasks);
        setDeleteTaskDialog(false);
        setTask(emptyTask);
        toast.current?.show({severity: 'success', summary: 'Successful', detail: 'Task Deleted', life: 3000});
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = (): string => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const confirmDeleteSelected = () => {
        setDeleteTasksDialog(true);
    };

    const deleteSelectedTasks = () => {
        let _tasks = tasks.filter((val: Task) => !selectedTasks.includes(val));

        setTasks(_tasks);
        setDeleteTasksDialog(false);
        setSelectedTasks([]);
        toast.current?.show({severity: 'success', summary: 'Successful', detail: 'Tasks Deleted', life: 3000});
    };

    const onPriorityChange = (e: RadioButtonChangeEvent) => {
        let _task = {...task};

        _task['priority'] = e.value;
        setTask(_task);
    };

    const onStatusChange = (e: RadioButtonChangeEvent) => {
        let _task = {...task};

        _task['status'] = e.value;
        setTask(_task);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _task = {...task};

        // @ts-ignore
        _task[name] = val;

        setTask(_task);
    };

    const onInputTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _task = {...task};

        // @ts-ignore
        _task[name] = val;

        setTask(_task);
    };


    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew}/>
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}
                        disabled={!selectedTasks || !selectedTasks.length}/>
            </div>
        );
    };

    const statusBodyTemplate = (rowData: Task) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData: Task) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editTask(rowData)}/>
                <Button icon="pi pi-trash" rounded outlined severity="danger"
                        onClick={() => confirmDeleteTask(rowData)}/>
            </>
        );
    };

    const getSeverity = (task: Task) => {
        switch (task.status.toUpperCase()) {
            case 'PENDING':
                return 'danger';
            case 'COMPLETED':
                return 'success';

            case 'IN PROGRESS':
                return 'warning';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Tasks</h4>
        </div>
    );
    const taskDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog}/>
            <Button label="Save" icon="pi pi-check" onClick={saveTask}/>
        </>
    );
    const deleteTaskDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteTaskDialog}/>
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteTask}/>
        </React.Fragment>
    );
    const deleteTasksDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteTasksDialog}/>
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedTasks}/>
        </>
    );

    return (
        <div>
            <Toast ref={toast}/>
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={personalTasks} selection={selectedTasks}
                           onSelectionChange={(e) => {
                               if (Array.isArray(e.value)) {
                                   setSelectedTasks(e.value);
                               }
                           }}
                           dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tasks"
                           globalFilter={globalFilter} header={header}
                           selectionMode="multiple"
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="title" header="Title" sortable style={{minWidth: '16rem'}}></Column>
                    <Column field="description" header="Description" sortable style={{minWidth: '16rem'}}></Column>
                    <Column field="priority" header="Priority" sortable style={{minWidth: '10rem'}}></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable
                            style={{minWidth: '12rem'}}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{minWidth: '12rem'}}></Column>
                </DataTable>
            </div>

            <Dialog visible={taskDialog} style={{width: '32rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}}
                    header="Task Details" modal className="p-fluid" footer={taskDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Title
                    </label>
                    <InputText id="name" value={task.title} onChange={(e) => onInputChange(e, 'title')} required
                               autoFocus className={classNames({'p-invalid': submitted && !task.title})}/>
                    {submitted && !task.title && <small className="p-error">Title is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={task.description}
                                   onChange={(e: any) => onInputTextAreaChange(e, 'description')} required rows={3}
                                   cols={20}/>
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Priority</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="priority1" name="priority" value="Low" onChange={onPriorityChange}
                                         checked={task.priority === 'Low'}/>
                            <label htmlFor="priority1">Low</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="priority2" name="priority" value="Medium" onChange={onPriorityChange}
                                         checked={task.priority === 'Medium'}/>
                            <label htmlFor="category2">Medium</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="priority3" name="priority" value="High" onChange={onPriorityChange}
                                         checked={task.priority === 'High'}/>
                            <label htmlFor="priority3">High</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="priority4" name="priority" value="Very High"
                                         onChange={onPriorityChange} checked={task.priority === 'Very High'}/>
                            <label htmlFor="priority4">Very High</label>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Status</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="status1" name="status" value="PENDING" onChange={onStatusChange}
                                         checked={task.status === 'PENDING'}/>
                            <label htmlFor="status1">Pending</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="status2" name="status" value="IN PROGRESS" onChange={onStatusChange}
                                         checked={task.status === 'IN PROGRESS'}/>
                            <label htmlFor="status2">In Progress</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="status3" name="status" value="COMPLETED" onChange={onStatusChange}
                                         checked={task.status === 'COMPLETED'}/>
                            <label htmlFor="status3">Completed</label>
                        </div>

                    </div>
                </div>

            </Dialog>

            <Dialog visible={deleteTaskDialog} style={{width: '32rem'}} breakpoints={{'960px': '75vw', '641px': '90vw'}}
                    header="Confirm" modal footer={deleteTaskDialogFooter} onHide={hideDeleteTaskDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {task && (
                        <span>
                            Are you sure you want to delete <b>{task.title}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteTasksDialog} style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
                    footer={deleteTasksDialogFooter} onHide={hideDeleteTasksDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {task && <span>Are you sure you want to delete the selected tasks?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        