import { db } from "../db";

export const createNotes = async (todolist: any) => {
    const data = { title: todolist.title, desc: todolist.desc}
    const newNote = await db.todolist.create({
        data: data
    });
    return {title:newNote.title,desc:newNote.desc}
}

//GET ALL NOTES
export const getAllNote = async ()=>{
    const allNotes = await db.todolist.findMany();
    return allNotes;
}

//DELETE NOTE BY ID
export const deleteNote = async (id:any)=>{
  const deleteNotes  =  await db.todolist.delete({
      where: { 
        id: id 
    },
   });
console.log(deleteNotes,"deleteNotes")

   return null;
}
