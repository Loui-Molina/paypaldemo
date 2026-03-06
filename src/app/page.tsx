'use client'
import {useEffect, useState} from "react";
import {Task} from "@/types";

export default function Home() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchTasks = async () => {
        const res = await fetch('/api/tasks')
        const json: Task[] = await res.json()
        setTasks(json);
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {

        e.preventDefault()
        setIsLoading(true)
        if (!title.trim()) return

        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({title}),
            headers: {'Content-type': 'application/json'}
        })
        setTitle('')
        await fetchTasks();
        setIsLoading(false)
    }

    const handleToggle = async (id: number, currentStatus: boolean) => {
        await fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({completed: !currentStatus}),
        })
    }
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type={"text"}
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                       required

                />


                <button type="submit">{isLoading ? '...' : 'Add Task'}</button>
            </form>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <label key={task.id}>
                            {task.title}
                            <input type={"checkbox"}
                                   checked={task.completed}
                                   onChange={() => handleToggle(task.id, task.completed)} disabled={isLoading}/>
                        </label>
                    </li>))}
            </ul>
        </main>
    );
}
