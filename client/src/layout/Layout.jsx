import React from 'react'
import { Outlet } from "react-router";
import { ToastContainer } from 'react-toastify';
import NavBar from '../components/navbar/NavBar';
import Footer from '../components/footer/Footer';



function Layout() {
  return (
    <>
    <NavBar/>
    <main style={{minHeight: "70vh"}}>
    <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default Layout