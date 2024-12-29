import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route } from 'react-router';
import Layout from './layout/Layout';
import Home from './pages/home/Home';
import Policy from './pages/policy/Policy';
import PageNotFound from './pages/pagenotfound/PageNotFound';
import './App.css';
import CreateEvent from './pages/createevent/CreateEvent';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';

function App() {

  return (
    <>
       <Routes>
          <Route path="" element={<Layout/>}>
             <Route path="/" element={<Home/>}/>
             <Route path="/createevent" element={<CreateEvent/>}/>
             <Route path="/profile" element={<Profile/>}/>
             <Route path="/policy" element={<Policy/>}/>
             <Route path="*" element={<PageNotFound/>}/>
          </Route>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
       </Routes>
    </>
  )
}

export default App
