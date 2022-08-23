import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function List({ todoData, setTodoData }) {

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

  const handleEnd = (result) => {
    if(!result.destination) return;

    const newTodoData = [...todoData];
    const [reOrderArr] = newTodoData.splice(result.source.index, 1);
    newTodoData.splice(result.destination.index, 0, reOrderArr);
    setTodoData(newTodoData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId='todo'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
            {
              todoData.map((data, index) => (
                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div 
                      className={`${
                      snapshot.isDragging ? "bg-gray-400" : "bg-gray-100" 
                      } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`} 
                      key={data.id}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <div className='item-center'>
                        <input 
                          type='checkbox' 
                          defaultCheckd={data.completed} 
                          onChange={() => handleCompleteChange(data.id)}
                        />
                        <span 
                          className={
                            data.completed ? "line-through" : undefined
                          }
                        >
                        {data.title}
                        </span>
                      </div>
                    
                      <div>
                        <button 
                          className='px-4 py-2 float-right' 
                          onClick={() => handleClick(data.id)}
                        >
                          x
                        </button>        
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}   
        </Droppable>
      </DragDropContext>   
    </div>
  )
};
