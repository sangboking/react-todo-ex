import React, { useState } from 'react';

const Lists = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleClick,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleCompleteChange = id => {
      const newTodoData = todoData.map(data => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });

      setTodoData(newTodoData);
    };

    const handleEditChange = e => {
      setEditedTitle(e.target.value);
    };

    const handleSubmit = e => {
      e.preventDefault();

      const newTodoData = [...todoData];
      newTodoData.map(data => {
        if (data.id === id) {
          data.title = editedTitle;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem('todoData', JSON.stringify(newTodoData));
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div className="flex items-center justify-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600 border rounded">
          <div className="item-center">
            <form onSubmit={handleSubmit}>
              <input
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                value={editedTitle}
                onChange={handleEditChange}
              />
            </form>
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 float-right"
              onClick={() => setIsEditing(false)}
            >
              x
            </button>

            <button
              onClick={handleSubmit}
              type="submit"
              className="px-4 py-2 float-right"
            >
              save
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`${
          snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'
        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
        key={id}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <div className="item-center">
          <input
            type="checkbox"
            defaultCheckd={completed}
            onChange={() => handleCompleteChange(id)}
          />
          <span className={completed ? 'line-through' : undefined}>
            {title}
          </span>
        </div>

        <div>
          <button
            type="button"
            className="px-4 py-2 float-right"
            onClick={() => {
              handleClick(id);
            }}
          >
            x
          </button>

          <button
            type="button"
            className="px-4 py-2 float-right"
            onClick={() => setIsEditing(true)}
          >
            edit
          </button>
        </div>
      </div>
    );
  },
);

export default Lists;
