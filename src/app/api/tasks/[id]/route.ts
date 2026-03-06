import {NextResponse} from "next/server";
import {store} from "@/db/storage";

export async function PATCH(resquest: Request, {params}: { params: { id: string } }) {
    const id = parseInt(params.id, 10);
    const body = await resquest.json();


    if (typeof body.completed !== 'boolean')
        return NextResponse.json({error: 'invalid complete status'}, {status: 400})

    store.toggleTask(id, body.completed)

    return NextResponse.json({
        success: true
    });
}