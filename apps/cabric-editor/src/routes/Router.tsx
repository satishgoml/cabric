import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DesignEditor from "~/views/DesignEditor"
import Dashboard from "~/views/Dashboard"
import { ProtectedRoutes } from "./ProtectedRoute"
import useAuth from "~/providers/AuthProvider"
import Login from "~/views/Login/Login"
import SignUp from "~/views/SignUp/SignUp"

function Router() {

  const {session} = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={session? <Navigate replace to="/" /> : <Login />} />
        <Route path="/signup" element={session? <Navigate replace to="/" /> : <SignUp />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/manage" element={<Dashboard />} />
          <Route path="/" element={<DesignEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
