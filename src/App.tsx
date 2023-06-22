import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ProtectedRoutes } from './components/protectedRoutes';
import { useAuthStore } from './store/auth';
import Admin from './pages/Admin';
import Login from './pages/Login';
import GetStarted from './pages/GetStarted';
import NotFoundPage from './pages/NotFound';
import Devices from './pages/Devices';

function App() {

  const isAuth = useAuthStore((state) => state.isAuth);
  const areUsers = useAuthStore((state) => state.areUsers);
  // console.log(useAuthStore());

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/getstarted' element={<GetStarted/>}/>
          <Route element={<ProtectedRoutes isAllowed={areUsers} redirect='/getstarted'/>}>
            <Route path='/login' element={<Login/>}/>
            <Route element={<ProtectedRoutes isAllowed={isAuth} redirect='/login'/>}>
              <Route path='/' element={<Admin/>}/>
              <Route path='/profile' element={<h1>profile</h1>}/>
            </Route>
          </Route>
          <Route path='*' element={<NotFoundPage/>}/>
          <Route path='/devices' element={<Devices/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
