import { useEffect, useState } from "react"
import { useAuth } from "../utils/AuthContext"
import ModalFormProfile from "../components/ModalFormProfile"
import { updateUserProfile } from "../api/hooks/contact"
import { toast } from "react-toastify"

export default function Example() {
  const { user, setcheckDependency } = useAuth()

  const [userInfo, setuserInfo] = useState()

  const [refreshUser, setrefreshUser] = useState()
  const [editProfileModal, setEditProfileModal] = useState(false)

  useEffect(() => {
    setuserInfo(user)
  }, [user])

  function handleEditProfile(e) {
    e.preventDefault()
    setEditProfileModal(!editProfileModal)
    updateUserProfile(userInfo)
    setcheckDependency(Math.random())
  }

  return (
    <>
      {/* MODAL */}
      <ModalFormProfile
        functionModal={handleEditProfile}
        userInfo={userInfo}
        setuserInfo={setuserInfo}
        title={"Edit Profile"}
        buttonText={"Done"}
        modalForm={editProfileModal}
        setmodalForm={setEditProfileModal}
      />
      {/* MODAL */}
      <div className="container mx-auto py-10 px-40 ">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            User Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details.
          </p>
          <p
            onClick={() => setEditProfileModal(!editProfileModal)}
            className="mt-6 max-w-2xl text-sm leading-6 text-gray-600 cursor-pointer hover:text-gray-700 hover:underline"
          >
            Edit profile
          </p>
        </div>
        <div className=" border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Username
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user.username}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                First name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user.first_name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Last name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user.last_name}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user.address}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}
