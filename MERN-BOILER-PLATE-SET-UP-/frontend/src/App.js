import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
       <div className="App">
      <div className="fixed-header">
        <header>

        <h1 class="text-3xl font-bold underline">
        Doctor App
      </h1>


        </header>
      </div>
      <div className="content-wrap">
        <main className="py-4" style={{ marginTop: '150px' }}>
          <Outlet />
        </main>
      </div>
      <footer className="fixed-footer" style={{ marginTop: 'calc(100vh - 300px)' }}>
        
      </footer>
      <ToastContainer />
    </div>
    </div>
  );
}

export default App;
