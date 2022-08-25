import React from 'react';

const Title = React.memo(() => {
  return (
    <div className="flex justify-between mb-3">
      <h1 className="text-gray-1000 text-lg">할 일 목록</h1>
    </div>
  );
});

export default Title;
