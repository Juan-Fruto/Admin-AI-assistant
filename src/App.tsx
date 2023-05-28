import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ProtectedRoutes } from './components/protectedRoutes';
import { useAuthStore, useAuthReadyStore } from './store/auth';
import Admin from './pages/Admin';
import Login from './pages/Login';

function App() {

  const isAuth = useAuthStore((state) => state.isAuth);
  const areUsers = useAuthReadyStore((state) => state.isAuth);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route element={<ProtectedRoutes isAllowed={isAuth} redirect='/login'/>}>
            <Route path='/' element={<Admin/>}/>
            <Route path='/profile' element={<h1>profile</h1>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
