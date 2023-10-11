import React, { useEffect, useState } from "react"
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFolderView,
} from "react-icons/ai"
import {
  deleteContact,
  searchContact,
  updateContact,
  viewContact,
} from "../api/hooks/contact"
import ModalDelete from "./ModalDelete"
import ModalView from "./ModalView"
import ModalForm from "./ModalForm"
import SearchBar from "./SearchBar"
import { toast } from "react-toastify"

export default function TableWithHover({
  contacts,
  setrefreshDelete,
  refreshDelete,
  setrefreshUpdate,
  refreshUpdate,
  modalForm,
  setmodalForm,
}) {
  const [viewContactData, setviewContactData] = useState(null)
  useEffect(() => {
    async function view() {
      const data = await viewContact(23)
      setviewContactData(data)
    }
    view()
  }, [])

  const [clickedContact, setclickedContact] = useState()
  const [modalView, setmodalView] = useState(false)
  function handlemodalView(contact) {
    setclickedContact(contact)
    setmodalView(!modalView)
  }

  const [contactToDelete, setcontactToDelete] = useState()

  const [deleteModal, setdeleteModal] = useState(false)
  async function handleDeleteContact(contact_id) {
    setdeleteModal(!deleteModal)
    await deleteContact(contact_id)
    setrefreshDelete(Math.random())
    toast.success("Deleted successfully.")
  }
  function handleDeleteModal(contact) {
    setcontactToDelete(contact)
    setdeleteModal(!deleteModal)
  }

  const [userInfo, setuserInfo] = useState()
  const [updateModal, setUpdateModal] = useState(false)
  const [contactToUpdate, setcontactToUpdate] = useState()
  function handleUpdateModal(contact) {
    setcontactToUpdate(contact)
    setUpdateModal(!updateModal)
  }

  async function handleUpdate(e) {
    e.preventDefault()
    const res = await updateContact(userInfo)
    console.log(res)
    if (res.status !== 200) return
    setUpdateModal(!updateModal)
    setrefreshUpdate(Math.random())
  }

  useEffect(() => {
    setuserInfo(contactToUpdate)
  }, [contactToUpdate])

  const [searchData, setsearchData] = useState()
  const [searchTerm, setsearchTerm] = useState("")
  const contactss = searchTerm != "" ? searchData : contacts

  useEffect(() => {
    async function searching() {
      const data = await searchContact(searchTerm)
      setsearchData(data)
    }
    searching()
  }, [searchTerm, refreshUpdate, refreshDelete])

  return (
    <>
      {/*<!-- Component: Table with hover state --> */}

      {/* MODAL */}
      <ModalView
        modalView={modalView}
        setmodalView={setmodalView}
        clickedContact={clickedContact}
      />
      <ModalDelete
        deleteModal={deleteModal}
        setdeleteModal={setdeleteModal}
        handleDeleteContact={handleDeleteContact}
        contactToDelete={contactToDelete?.first_name}
        id={contactToDelete?.id}
      />

      <ModalForm
        title="Edit Contact"
        buttonText="Save"
        userInfo={userInfo}
        functionModal={handleUpdate}
        setuserInfo={setuserInfo}
        modalForm={updateModal}
        setmodalForm={setUpdateModal}
      />

      <div className="py-10 px-20  w-full overflow-x-auto">
        <div className="flex justify-between">
          <button
            onClick={() => setmodalForm(!modalForm)}
            className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-gray-700 hover:bg-gray-800 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none"
          >
            <span>Add contact</span>
          </button>
          <SearchBar setsearchTerm={setsearchTerm} />
        </div>
        <table
          className="w-full text-left border border-separate rounded border-slate-200"
          cellSpacing="0"
        >
          <tbody>
            <tr>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                First name
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Last name
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
              >
                Phone number
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                style={{ width: "300px" }}
              >
                Options
              </th>
            </tr>
            {contactss?.length <= 0 ? (
              <div className="flex p-10">
                <span className="text-slate-500">No contacts found.</span>
              </div>
            ) : null}
            {contactss?.map((contact) => {
              return (
                <tr
                  className="transition-colors duration-300 hover:bg-slate-50"
                  key={contact.id}
                >
                  <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                    {contact.first_name}
                  </td>
                  <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                    {contact.last_name}
                  </td>
                  <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                    {contact.phone}
                  </td>
                  <td className="flex justify-evenly items-center h-12 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                    <button
                      onClick={() => handleUpdateModal(contact)}
                      className="flex items-center"
                    >
                      <AiOutlineEdit size={18} />
                      <h3 className="px-2">Edit</h3>
                    </button>
                    <button
                      onClick={() => handleDeleteModal(contact)}
                      className="flex items-center"
                    >
                      <AiOutlineDelete size={18} />
                      <h3 className="px-2">Delete</h3>
                    </button>
                    <button
                      onClick={() => handlemodalView(contact)}
                      className="flex items-center"
                    >
                      <AiOutlineFolderView size={18} />
                      <h3 className="px-2">View</h3>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
