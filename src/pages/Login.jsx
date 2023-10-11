import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"
// import dotenv from "dotenv"

export default function Example() {
  // dotenv.config()
  // console.log(process.env.API_URL)
  const [userInfo, setuserInfo] = useState()
  const { loginUser, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])

  axios.defaults.withCredentials = true
  function handleSubmit(e) {
    e.preventDefault()
    loginUser(userInfo)
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-8 lg:px-8">
        <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-16 w-auto"
            // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            src="/logo.png"
            alt="Your Company"
          />
          <span className="font-bold text-base text-slate-800">ReactOut</span>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setuserInfo({ ...userInfo, username: e.target.value })
                  }
                  style={{ paddingLeft: "12px" }}
                  value={userInfo?.username}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setuserInfo({ ...userInfo, password: e.target.value })
                  }
                  style={{ paddingLeft: "12px" }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <div className="flex items-center">
              <p className="text-slate-600">Don't have an account?</p>
              <button className="underline inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded focus-visible:outline-none justify-self-center whitespace-nowrap  text-indigo-500 hover:text-indigo-600  focus:text-indigo-700 disabled:cursor-not-allowed disabled:border-indigo-300 disabled:bg-indigo-100 disabled:text-indigo-400 disabled:shadow-none">
                <Link to={"/signup"}>
                  <span>Sign up </span>
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
