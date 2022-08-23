import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';
import Title from './components/Title';

export default function App(){
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false
    };

    setTodoData(prev => [...prev, newTodo]);
    setValue("");
  };

  console.log('app rendering')
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-blue-100'>
      <div className='w-full p-4 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg'>
       <Title />

        <List 
          todoData={todoData}
          setTodoData={setTodoData}
        />

        <Form 
          value={value}
          setValue={setValue}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
};