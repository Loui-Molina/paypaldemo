import {NextResponse} from "next/server";
import {store} from "@/db/storage";
import {Task} from "@/types";


export async function GET() {
    // we return all the tasks from the db interface and disable nextjs cache to ensure responses are up to date
    return NextResponse.json(store.tasks, {headers: {'Cache-control': 'no-store'}})
}

export async function POST(resquest: Request) {
    const body: Task = await resquest.json();

    if (!body || !body.title.trim() || body.completed == undefined)
        return NextResponse.json({error: 'missing required fields'}, {status: 400})

    const newTask = new Task(Date.now(), body.title, body.completed)

    store.addTask(newTask);

    return NextResponse.json(newTask, {status: 201});
}