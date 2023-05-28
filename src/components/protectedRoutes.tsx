import { Navigate, Outlet } from "react-router-dom"

interface Props{
  isAllowed: boolean,
  children?: React.ReactNode,
  redirect: string
}

export const ProtectedRoutes = ({children, isAllowed, redirect}: Props) =>  {
  
  if(!isAllowed) return <Navigate to={redirect}/>
  
  return children ? <>children</> : <Outlet/>;
}