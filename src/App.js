import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";
import SearchProduct from "./components/SearchProduct";
import Login from "./components/login/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import Header2 from "./components/Header2";




function App() {
const [login,setLogin] = useState(false)

function loginUser() {
  const token = sessionStorage.getItem('token');
  if(token){
  axios.get(`http://localhost:8080/me/${token}`)
  .then(res=>{
    console.log(res.data)
    setLogin(true)})
  .catch(err=>console.log('api falied due to ',err))};
}
  
   useEffect(()=>{
    loginUser();
   },[login])
  

  return (
    <>
      {login?<Header/>:<Header2/>}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/name/:query" element={<SearchProduct />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer />
    </>

  );
}

export default App;
