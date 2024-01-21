import React from 'react';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <div>
      <Sidebar />
      {/* Your main content goes here */}
      <div style={{ marginLeft: '20%', padding: '20px' }}>
        <h1>Main Content</h1>
        {/* Add your other components/content here */}
      </div>
    </div>
  );
}

export default App;