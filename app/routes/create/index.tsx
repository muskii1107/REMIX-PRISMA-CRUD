import { useEffect, useState } from 'react'
import { Form, useLoaderData } from '@remix-run/react'
import { ActionFunction } from "@remix-run/node";
import { createNotes, getAllNote, deleteNote } from '../../services/todo';

export const action: ActionFunction = async ({ request }) => {


    if (request.method === 'POST') {
        const formData = await request.formData();
        const title = formData.get("title")
        const desc = formData.get("desc")
        if (title !== '' && desc !== '') {
            const data = { title: title, desc: desc }
            return await createNotes(data)
        }
    }
    if (request.method === "DELETE") {
        const formData = await request.formData();
        let note_id = formData.get("deleteNoteId");
        return await deleteNote(Number(note_id))
    }

    return true
}

export const loader = async () => {
    const notes = await getAllNote()
    return notes
}

function index() {
    const data = useLoaderData();
    const [task, setTask] = useState([]);

    useEffect(() => {
        setTask(data)
    }, [data])


    const submitHander = () => {
        setTask(data);
    }

    return (
        <div className='w-full h-screen bg-zinc-100'>
            <main>
                <div className="justify-center text-center p-10" >
                    <h1 className="font-bold text-3xl text-gray-900 font-mono " >TODO-LIST</h1>
                    <Form method="post" id="note-form" className="flex justify-center mt-5 mb-10" onSubmit={submitHander}>
                        <p>
                            <label className="mr-2 font-semibold text-xl" htmlFor="title">Title</label>
                            <input className="border-2 rounded px-1 shadow-lg mr-3 p-1" type="text" id="title" name="title" required />
                        </p>
                        <p>
                            <label className="mr-2 font-semibold text-xl" htmlFor="title">Description</label>
                            <input className="border-2 rounded px-1 shadow-lg p-1" type="text" id="desc" name="desc" required />
                        </p>
                        <div className="form-actions font-semibold ml-7">
                            <button className='bg-transparent hover:bg-green-400 text-blue-600 font-semibold text-[16px] shadow-lg  hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded'
                                type="submit">Add</button>
                        </div>
                        <input type="hidden" name='action_type' value="create" />
                    </Form>
                    <ul>
                        {task.map((t) => (
                            <li className='flex justify-start item-start mb-2 text-lg font-semibold' key={t.id}>
                                {t.title} {" - "}{t.desc} {console.log(t, t.id, "nbcbcjknkn")}
                                <Form method='delete'>
                                    <input type="hidden" name='deleteNoteId' value={t.id} />
                                    {<button
                                        type="submit"
                                        className='ml-2 bg-transparent hover:bg-red-400 text-red-600 font-semibold text-[12px] shadow-lg  hover:text-white px-0.5 border border-red-500 hover:border-transparent rounded'>
                                        Delete
                                    </button>}
                                </Form>
                            </li>

                        ))}
                    </ul>
                </div>

            </main>
        </div>
    )
}
export default index;