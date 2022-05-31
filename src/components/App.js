import React from 'react';
import {Routes, Route, HashRouter as Router} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Header from './Header';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LegoList from "./pages/LegoList";
import LegoNew from './pages/LegoNew';
import LegoShow from './pages/LegoShow';
import LegoEdit from './pages/LegoEdit';
import UserCart from "./pages/UserCart";
import UserCheckout from "./pages/UserCheckout"
import Order from "./pages/Order";
import MyLego from "./pages/MyLego"



function App() {
  return (
    <>
      <Router>
         <div className='container'>
           <Header></Header>
           <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/Signup" element={<Signup/>} /> 
              <Route path="/lego/list" element={<LegoList/>} />
              <Route path="/lego/new" element={<LegoNew/>} />
              <Route path="/lego/:id" element={<LegoShow/>} />    
              <Route path="/lego/edit/:id" element={<LegoEdit/>} />  
              <Route path="/cart/:userid" element={<UserCart/>} /> 
              <Route path="/checkout/:userid" element={<UserCheckout/>} />
              <Route path="/order/:userid" element={<Order/>} />
              <Route path="/mylego/:userid" element={<MyLego/>} />
           </Routes>
         </div>   
      </Router>
      <ToastContainer>

      </ToastContainer>
    </>   
  );
}

export default App;
