import React, { useEffect, useState } from "react"
import TableWithHover from "../components/TableWithHover"
import ModalForm from "../components/ModalForm"
import { addContact, fetchContacts } from "../api/hooks/contact"
import { toast } from "react-toastify"
import { useAuth } from "../utils/AuthContext"

function Homepage() {
  const { user } = useAuth()

  const [userInfo, setuserInfo] = useState({
    userId: user.id,
    first_name: "",
    last_name: "",
    email: "",
    phone: "09",
    address: "",
  })

  const [refreshAdd, setrefreshAdd] = useState()
  const [refreshDelete, setrefreshDelete] = useState()
  const [refreshUpdate, setrefreshUpdate] = useState()

  const [contacts, setcontacts] = useState(null)
  // const [searchData, setsearchData] = useState()

  // if (searchData?.length > 0) {
  //   setcontacts(searchData)
  // }
  useEffect(() => {
    async function fetctData() {
      const data = await fetchContacts()
      setcontacts(data)
    }

    fetctData()
  }, [refreshAdd, refreshDelete, refreshUpdate])

  async function handleAdd(e) {
    e.preventDefault()
    const res = await addContact(userInfo)
    if (res.status !== 200) return
    console.log({ res })
    setmodalForm(!modalForm)
    setuserInfo({ userId: user.id })
    setrefreshAdd(Math.random())
  }

  const [modalForm, setmodalForm] = useState(false)

  return (
    <div className="container mx-auto">
      <div className="flex p-8 justify-between items-center">
        <div>
          <p className="font-semibold">Contacts</p>
          <p className="text-slate-800">
            A list of all the contacts in your account including their name,
            title, email and role.
          </p>
        </div>
      </div>
      <ModalForm
        title="Create Contact"
        buttonText="Add"
        userInfo={userInfo}
        setuserInfo={setuserInfo}
        functionModal={handleAdd}
        modalForm={modalForm}
        setmodalForm={setmodalForm}
      />

      {contacts ? (
        <TableWithHover
          contacts={contacts}
          setrefreshDelete={setrefreshDelete}
          refreshDelete={refreshDelete}
          setrefreshUpdate={setrefreshUpdate}
          refreshUpdate={refreshUpdate}
          modalForm={modalForm}
          setmodalForm={setmodalForm}
        />
      ) : (
        <p>Loading contacts...</p>
      )}
    </div>
  )
}

export default Homepage
