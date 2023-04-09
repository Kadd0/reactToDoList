import {useState} from 'react'
import List from './list/index.js'
import './style.css'
function ToDo() {

    const [todos, setTodos] = useState([
        {id: 1, title: 'todo 1', completed: false},
        {id: 2, title: 'todo 2', completed: false},
        {id: 3, title: 'todo 3', completed: false},
    ])

    
  return (
    <div>
        <header className='header'>
        <h1>todos</h1>
      </header>
      <List todos={todos} setTodos={setTodos}></List>
    </div>
  )
}

export default ToDo