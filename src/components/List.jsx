import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Lists from './Lists';

const List = React.memo(
  ({ 
    todoData, 
    setTodoData, 
    handleClick 
  }) => {

  const handleEnd = (result) => {
    if(!result.destination) return;

    const newTodoData = [...todoData];
    const [reOrderArr] = newTodoData.splice(result.source.index, 1);
    newTodoData.splice(result.destination.index, 0, reOrderArr);
    setTodoData(newTodoData);
  };

  console.log('list rendering')
  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId='todo'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
            {
              todoData.map((data, index) => (
                <Draggable 
                  key={data.id} 
                  draggableId={data.id.toString()} 
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Lists 
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                      handleClick={handleClick}
                    />
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
});

export default List;
