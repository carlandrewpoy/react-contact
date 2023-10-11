import React, { useState } from "react"
import AuthContext, { useAuth } from "../utils/AuthContext"

function LoginPage() {
  const { loginUser } = useAuth()
  const [userInfo, setuserInfo] = useState()

  function handleSubmit(e) {
    loginUser(userInfo)
    e.preventDefault()
  }
  return (
    <div className="flex flex-col items-center p-20 justify-center">
      <h1>LoginPage</h1>
      <form
        onSubmit={handleSubmit}
        className="gap-5 py-10 flex flex-col items-center justify-center"
      >
        <input
          type="text"
          placeholder="username"
          onChange={(e) =>
            setuserInfo({ ...userInfo, username: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) =>
            setuserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage
