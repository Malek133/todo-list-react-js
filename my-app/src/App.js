import { useRef, useState } from "react";
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const inputRef = useRef();
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  const handleToggleButtons = (index) => {
    setSelectedTaskIndex(selectedTaskIndex === index ? null : index);
  };

  const handelSubmitTodo = () => {
    const text = inputRef.current.value;
    const newItem = { completed: false, text };
    setTodos([...todos, newItem]);
    inputRef.current.value = "";
  }

  const handelDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  const deleteTask = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const editTask = (index) => {
    setEditingIndex(index);
    setEditedText(todos[index].text);
  }

  const saveEditedTask = () => {
    const newTodos = [...todos];
    newTodos[editingIndex].text = editedText;
    setTodos(newTodos);
    setEditingIndex(null);
    setEditedText("");
  }

  return (
    <div className="App">
      <h1 className="titel">CRUD</h1>
      <h2  className="titell">To-Do List</h2>
      <div className="to-do">
        <div className="btninput">
          <input className="input" ref={inputRef} placeholder="new item..." />
          <button className="btnadd" onClick={handelSubmitTodo}>
            Add
          </button>
        </div>

        <ul>
          {todos.map(({ text, completed }, index) => (
            <div className="delete" key={index}>
              {index === editingIndex ? (
                <div className="saves">
                  <input
                  className="inp"
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button className="savebtn" onClick={saveEditedTask}>
                    <SaveAltIcon />
                  </button>
                </div>
              ) : (
                <li className={completed ? "done" : ""} 
                onClick={() => handelDone(index)}>
                 <CheckBoxIcon /> {text}
                </li>
              )}

              {selectedTaskIndex === index && (
                <div className="btndelete">
                  <span onClick={() => editTask(index)}>
                    <EditNoteOutlinedIcon />
                  </span>
                  <span onClick={() => deleteTask(index)}>
                    <DeleteIcon />
                  </span>
                </div>
              )}
              <span className="three" onClick={() => handleToggleButtons(index)}>
                <MoreHorizOutlinedIcon />
              </span>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
