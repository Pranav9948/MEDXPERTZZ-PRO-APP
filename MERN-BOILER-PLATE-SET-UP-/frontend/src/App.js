import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbars from './components/HomePage/Navbars';
import Footers from './components/HomePage/Footers';
import ScrollToTop from './components/ScrollToTop';
import { useSelector } from 'react-redux';


function App() {

      const {userDetails}=  useSelector((state)=>state.auth)

  return (
    <div className="App">
       <div className="App">
      
      <div className="fixed-header">
       
        <Navbars/>
       
        
      </div>
      <div className="content-wrap" >
        <main className="py-4">

       <>
       
    
        <Outlet />
        
        <ScrollToTop></ScrollToTop>

        
        </>

       
        
        </main>
       
      </div>
      <footer className="fixed-footer" style={{ marginTop: 'calc(100vh - 300px)' }}>
         <Footers/>
      </footer>
      <ToastContainer />
    
    </div>
    </div>
  );
}

export default App;
