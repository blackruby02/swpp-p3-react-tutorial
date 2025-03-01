import { useState } from "react";
import Todo from '../../components/Todo/Todo';
import './TodoList.css';
import TodoDetail from '../../components/TodoDetail/TodoDetail';
import { useMemo } from "react";
import NewTodo from '../../containers/TodoList/NewTodo/NewTodo';
import { NavLink } from "react-router-dom";

type TodoType = { id: number; title: string; content: string; done: boolean;};
interface IProps{
    title: string;
}

export default function TodoList(props: IProps) {
    const {title} = props
    const [todos, setTodo] = useState<TodoType[]>([
        { id: 1, title: "SWPP", content: "take swpp class", done: true },
        { id: 2, title: "Movie", content: "watch movie", done: false },
        { id: 3, title: "Dinner", content: "eat dinner", done: false },
     ]);
     const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

    const clickTodoHandler = (td: TodoType) => {
        if (selectedTodo === td) {
            setSelectedTodo(null); }
        else{
            setSelectedTodo(td);
        }
    };

    const todoDetail = useMemo(() => {
        return selectedTodo ? (
          <TodoDetail title={selectedTodo.title} content={selectedTodo.content} />
        ) : null;
      }, [selectedTodo]);

     {todos.map((td) => {
        return <Todo title={td.title} done={td.done} clicked={() => clickTodoHandler(td)} />;
      })}


    return (
        <div className="TodoList">
            <div className="title">{title}</div>
            <div className="todos">
                {todos.map((td) => {
                    return <Todo key={td.id} title={td.title} done={td.done} />
                })} 
                {todoDetail}
                <NavLink to="/new-todo" > New Todo </NavLink>
        </div>
    </div>
    );
};

