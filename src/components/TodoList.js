
import { useSelector } from "react-redux";
import { useGetTodosQuery } from "../rtk query/features/api/apiSlice";
import Todo from "./Todo";

export default function TodoList() {

  const {status,colors} = useSelector((state => state.filter))
    
  const { data: todos, isLoading, isError } = useGetTodosQuery({status,colors});
 
  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <>
        <p>Loading .....</p>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <p>There was an error</p>;
  }

  if (!isLoading && !isError && todos?.length === 0) {
    content = <p>No todos found!</p>;
  }

  if (!isLoading && !isError && todos?.length > 0) {
    content = todos.map((todo) => <Todo key={todo.id} todo={todo} />);
  }

  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {content}
    </div>
  );
}
