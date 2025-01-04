import {React,useEffect }from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import { validateToken } from './store/slices/authSlice';
import Layout from './layout/Layout';
import Home from './pages/home/Home';
import Policy from './pages/policy/Policy';
import PageNotFound from './pages/pagenotfound/PageNotFound';
import './App.css';
import CreateEvent from './pages/createevent/CreateEvent';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';

function App() {

   const dispatch = useDispatch();


   useEffect(() => {
     
    dispatch(validateToken());

   },[]);

  return (
    <>
       <Routes>
          <Route path="/" element={<PrivateRoute><Layout/></PrivateRoute>}>
             <Route path="" element={<Home/>}/>
             <Route path="/createevent" element={<CreateEvent/>}/>
             <Route path="/profile" element={<Profile/>}/>
             <Route path="/policy" element={<Policy/>}/>
             <Route path="/about" element={<About/>}/>
             <Route path="*" element={<PageNotFound/>}/>
             <Route path="/contact" element={<Contact/>}/>
          </Route>
          <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
       </Routes>
    </>
  )
}

export default App
