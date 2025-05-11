export interface Task {
    id: string | null;
    title: string;
    description: string;
    priority: string | null;
    status: string;
    userId: string;
    userName?: string;
}