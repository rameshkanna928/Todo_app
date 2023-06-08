import React, { useEffect, useState } from "react";
// import uuid from "react-uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
function Todo() {

  const [data, setData] = useState("");
  const [todos, setTodos] = useState([]);
  const[editTodo,setEditTodo]=useState(null);




  // other purpose
  const [error, setError] = useState("");
  const [todostate, setTodostate] = useState(0);


  const updateTodo = (data,id,status)=>{
    const newtodo = todos.map((todo)=> 

    todo.id === id?{task:data,id,status}: todo  );
    setTodos(newtodo);
    setEditTodo("");

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!editTodo){
      if (data.trim() !== '') {
        setTodos([...todos, { id: todos.length+1, task: data, status: false }]);
        setData("");
        setError("")
        
      } else{
        setError("Field cannot be empty!");
      }
    } else{
      updateTodo(data,editTodo.id,editTodo.status)
    }
  // let tod = document.querySelectorAll(".todo1")
 
  // tod.forEach((tod)=>{
  
  //   tod.classList.toggle("h-full")
  // })
  
    
};
     useEffect(() => {
    setTodostate(todos.filter((todo) => todo.status).length);
    console.log("todostate",todostate);
      if(editTodo){
    setData(editTodo.task);
  }else{
    setData("")
  }
   
  }, [todos,setData,editTodo]);


  const completed = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const deleteTodo = ({ id }) => {
  
    setTodos(todos.filter((val) => val.id !== id));
   
  };
  const handleEdit = ({id}) => {
    const geteditvalue =todos.find((val)=>val.id === id )
    setEditTodo(geteditvalue)

  };

return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="todo bg-slate-700 p-4 w-[60vh] select-none ">
        <h1 className="text-2xl font-bold text-white">TaskMaster</h1>

        <form className="input flex my-4 " onSubmit={handleSubmit}>
          <input
            className="p-4 bg-slate-600 w-4/5 border text-white   border-white focus:outline-none focus:border-none rounded-l-lg"
            type="text"
            placeholder="Add a new todo..."
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button className="p-4 bg-blue-500 text-white w-1/5 hover:bg-white hover:text-black duration-700 ">
           {editTodo?"Update":"Add"} 
          </button>
        </form>
        {error && (
          <p className="  text-red-800 text-xl font-semibold">{error}</p>
        )}
        <div className=" max-h-[30vh]  min-h-[10vh]  overflow-x-auto no-scrollbar todo-list      ">
          {todos && todos.length > 0 ? (
            todos.map((todo) => {
              return (
                <div
                  className={`todo1    my-3 ml-12 bg-slate-600 rounded flex justify-between cursor-pointer 	 `}
                  key={todo.id} >
                    <div className="w-full p-4 "   onClick={() => completed(todo.id)}>
                    <p
                    className={` text-white text-xl duration-700 
               ${ todo.status ? "line-through opacity-25 " : ""}	
                      `}
                  >
                    {todo.task}
                  </p>
                    </div>
             

                  <p className="flex items-center justify-center  relative">
                    <FontAwesomeIcon  onClick={ !todo.status?() => completed(todo.id):()=>{}}
                    
                      className={`  text-green-500 text-xl  font-extralight p-1 cursor-pointer flex items-center justify-center  duration-700 ${
                        todo.status ? "opacity-0 " : ""
                      }	 `}
                      icon={faCheck}
                    />
              <FontAwesomeIcon
                      onClick={!todo.status? ()=>handleEdit(todo): ()=>{}}
                      className={` p-1  flex items-center justify-center text-emerald-200 text-xl   font-extralight cursor-pointer duration-700  ${
                        todo.status ? "opacity-0" : ""
                      } 	 `}
                      icon={faPenToSquare}
                    /> 
  
                    <p
                      className={`${
                        todo.status
                          ? "after:content-[''] after:absolute after:h-[3px] after:bg-gray-500 after:w-[20px] after:top-1/2 after:right-1"
                          : ""
                      }`}
                    >
                      <FontAwesomeIcon
                        onClick={() => deleteTodo(todo)}
                        className={` text-red-500 p-1 text-2xl flex items-center justify-center   font-extralight cursor-pointer duration-700 	 `}
                        icon={faXmark}
                      />
                    </p>

                   
                  </p>
                </div>
              );
            })
          ) : (
            <h1 className="text-center text-xl font-semibold text-blue-300 flex justify-center items-center h-[10vh]">
              Add your List Here...
            </h1>
          )}
        </div>
        <div className="completed flex ">
          <p className="p-4 text-white text-xl ">
            Total Todos : {todos.length}
          </p>
          <p className="p-4 text-white text-xl">
            Completed Todos : {todostate}
          </p>
        </div>
        <div className="footer pb-4">
          <p className="text-white w-[50vh]">
            <q className="italic">
              The future belongs to those who believe in the beauty of their
              dreams
            </q>{" "}
            -Eleanor Roosevelt
          </p>
        </div>
      </div>
    </div>
  );
}

export default Todo;
