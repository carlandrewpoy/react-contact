import axios from "axios"
import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [checkDependency, setcheckDependency] = useState()

  useEffect(
    () => {
      checkUserStatus()
    },
    [checkDependency],
    []
  )

  const loginUser = async (userInfo) => {
    setLoading(true)

    axios
      .post("http://localhost:3000/login", userInfo)
      .then((res) => {
        setUser(res.data)
        toast.success("Login successfully.")
      })
      .catch((err) => {
        toast.error(err.response.data.error)
      })
    // .finally(() => )
    setLoading(false)
  }

  const logoutUser = () => {
    axios.delete("http://localhost:3000/logout").then((res) => {
      location.reload()
    })
  }

  const registerUser = async (userInfo) => {
    setLoading(true)
    axios
      .post("http://localhost:3000/signup", userInfo)
      .then((res) => {
        navigate("/login")
        toast.success("Sign up successfully.")
      })
      .catch((err) => {
        if (err.response.data.errno === 1062) {
          toast.error(`Username '${userInfo.username}' already exist.`)
        }
      })

    setLoading(false)
  }

  const checkUserStatus = () => {
    axios
      .get("http://localhost:3000/me")
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    setcheckDependency,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

//Custom Hook
export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext
