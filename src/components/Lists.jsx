import React from 'react'

const Lists = React.memo(({
  id, title, completed, todoData, setTodoData, provided, snapshot
 }) => {

  const handleClick = (id) => {
    let newTodoData = todoData.filter((data)=> data.id !== id);
    setTodoData(newTodoData);
  };

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map(data => {
      if(data.id === id){
        data.completed = !data.completed;
      }
      return data;
    })

    setTodoData(newTodoData);
  };

  console.log('lists rendering')
  return (
    <div 
      className={`${
      snapshot.isDragging ? "bg-gray-400" : "bg-gray-100" 
      } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`} 
      key={id}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <div className='item-center'>
        <input 
          type='checkbox' 
          defaultCheckd={completed} 
          onChange={() => handleCompleteChange(id)}
        />
        <span 
          className={
            completed ? "line-through" : undefined
          }
        >
        {title}
        </span>
      </div>
    
      <div>
        <button 
          className='px-4 py-2 float-right' 
          onClick={() => handleClick(id)}
        >
          x
        </button>        
      </div>
    </div>
  )
});

export default Lists;
