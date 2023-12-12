import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
function App() {
  const [todo, SetTodo] = useState("");
  const [todos, SetTodos] = useState([]);
  const [editId , setEditId]= useState(0);

  // const addTodo = () => {
  //  if(todo !== ''){
  //   SetTodos([...todos, {list : todo , id : Date.now() , status : false}]);
  //   console.log(todos);
  //   SetTodo("");
  //  }
  //  if(editId){
  //   const editTodo = todos.find((todo)=>todo.id === editId)
  //   const updateTodo = todos.map((todo)=>todo.id === editTodo.id
  //   ? (todo = {id :todo.id , list : todo})
  //   : (todo = {id :todo.id ,list : todo.list}))
  //   SetTodos(updateTodo)
  //   setEditId(0)
  //   SetTodo('')
  //  }
  // };
  const addTodo = () => {
    if (todo !== '') {
      if (editId) {
        // If editId is set, update the existing todo
        const updatedTodos = todos.map((item) =>
          item.id === editId ? { ...item, list: todo } : item
        );
        SetTodos(updatedTodos);
        setEditId(0);
      } else {
        // If editId is not set, add a new todo
        SetTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      }
      SetTodo('');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onDelete =(id) =>{
    SetTodos(todos.filter((todo) => todo.id !== id))
  }

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        console.log(list.id);
        return { ...list, status: !list.status }; 
      }
      return list;
    });
    SetTodos(complete); 
  };
  
  const onEdit = (id) => {
    const editTodo = todos.find((todo)=> todo.id === id)
    SetTodo(editTodo.list)
    setEditId(editTodo.id)
  }
  
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
      </div>
      <form className="input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          onChange={(event) => SetTodo(event.target.value)}
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTodo} >{editId ? 'EDIT' : <i className="fas fa-plus" ></i> }</i>
      </form>
      <div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="form-control" id={todo.status ? 'list-item' : ''}>
              {todo.list}
              <div className="icons-container">
                <IoMdDoneAll className="done-icon" title="Complete" onClick={()=>onComplete(todo.id)}/>
                <MdOutlineEdit className="edit-icon" title="Edit" onClick={()=>{onEdit(todo.id)}}/>
                <MdDelete className="delete-icon" title="Delete" onClick={()=>onDelete(todo.id)}/>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
