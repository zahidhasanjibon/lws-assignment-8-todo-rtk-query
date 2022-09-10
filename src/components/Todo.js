import { useState } from "react";

import cancelImage from "../assets/images/cancel.png";
import editIcon from "../assets/images/edit (1).png";
import { useDeleteTodoMutation, useUpdateTodoColorMutation, useUpdateTodoStatusMutation, useUpdateTodoTitleMutation } from "../rtk query/features/api/apiSlice";



export default function Todo({ todo }) {

    const [deleteTodo,{isLoading,isError}] = useDeleteTodoMutation();
    const [updateTodoTitle,{isError:editIsError}] = useUpdateTodoTitleMutation()
    const [updateTodoStatus,{isError:updStatusIsError}] = useUpdateTodoStatusMutation()
    const [updateTodoColor,{isError:updColorIsError}] = useUpdateTodoColorMutation()

    const { text, id, completed, color } = todo;

    const [isEdit,setIsEsdit] = useState(false)
    const [updatedText,setUpdatedText] = useState("")
    const handleStatusChange = (todoId) => {
                updateTodoStatus({id:todoId,data:{
                    completed:!completed
                }})
    };

    const handleColorChange = (todoId, color) => {
                    updateTodoColor({id:todoId,data:{
                        color:color
                    }})
    };

    const handleDelete = (todoId) => {
        if(isLoading) return
        deleteTodo(todoId)
    };
    
    const handleEdit = (todoId) => {
                setIsEsdit(true)
            setUpdatedText(text)
    }

    const handleUpdateText = (e) => {
        if(e.key === 'Enter'){
            updateTodoTitle({id:id,data:{
                text:updatedText
            }})
          setIsEsdit(false)
        }
    }

    return (
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
            <div
                className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
                    completed &&
                    "border-green-500 focus-within:border-green-500"
                }`}
            >
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleStatusChange(id)}
                    className="opacity-0 absolute rounded-full hover:cursor-pointer"
                />
                {completed && (
                    <svg
                        className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                )}
            </div>

           
            {
                isEdit ?(
                    <div
                    className={` flex-1`}
                >
                        <input value={updatedText} onKeyDown={(e) => handleUpdateText(e)} onChange={(e) => setUpdatedText(e.target.value)} className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1`} type="text" />
                </div>
                ) :  <div
                className={`select-none flex-1 ${completed && 'line-through'}`}
            >
                {text}
                    {isError && <p>Error occurs when delete</p>}
                    {editIsError && <p>Error occurs when update</p>}
                    {updStatusIsError && <p>Error occurs when update status</p>}
                    {updColorIsError && <p>Error occurs when update color</p>}
            </div>
            }
           

          {
             <img
            src={editIcon}
            className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
            alt="Cancel"
            onClick={() => handleEdit(id)}
        />
          }

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
                    color === "green" && "bg-green-500"
                }`}
                onClick={() => handleColorChange(id, "green")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
                    color === "yellow" && "bg-yellow-500"
                }`}
                onClick={() => handleColorChange(id, "yellow")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
                    color === "red" && "bg-red-500"
                }`}
                onClick={() => handleColorChange(id, "red")}
            >
            </div>
                <img
                src={cancelImage}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Cancel"
                 onClick={() => handleDelete(id)}
            />
        </div>
    );
}
