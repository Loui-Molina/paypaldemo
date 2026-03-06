import {Task} from "@/types";

type GlobalStore = {
    tasks: Task[] | undefined;
}

// im using the global store to prevent nextjs stalessness voalitily
const globalstore = global as unknown as GlobalStore;

// initialize the data structure
if (!globalstore.tasks) {
    globalstore.tasks = [];
}

// methods to manipulate the data structure and abstract the implementation to be easily swappable with a real db
export const store = {
    get tasks() {
        return globalstore.tasks;
    },
    addTask(task: Task) {
        globalstore.tasks?.unshift(task)
    },
    toggleTask(id: number, completed: boolean) {
        const task = globalstore.tasks?.find(t => t.id === id);
        if (task) task.completed = completed;
    }
};