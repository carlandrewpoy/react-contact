import { Outlet, Navigate } from "react-router-dom"
import Layout from "../layout"
import { useAuth } from "./AuthContext"

const PrivateRoutes = () => {
  const { user } = useAuth()

  return user ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateRoutes
