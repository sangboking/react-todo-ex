import React, { useState, useCallback } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';
import Title from './components/Title';

const initialTodoData = localStorage.getItem('todoData')
  ? JSON.parse(localStorage.getItem('todoData'))
  : [];

export default function App() {
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData(prev => [...prev, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue('');
  };

  const handleClick = useCallback(
    id => {
      const newTodoData = todoData.filter(data => data.id !== id);
      setTodoData(newTodoData);
      localStorage.setItem('todoData', JSON.stringify(newTodoData));
    },
    [todoData],
  );

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-4 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <Title handleRemoveClick={handleRemoveClick} />

        <List
          todoData={todoData}
          setTodoData={setTodoData}
          handleClick={handleClick}
        />

        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
