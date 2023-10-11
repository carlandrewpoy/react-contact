import { Fragment, useEffect, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { addContact } from "../api/hooks/contact"

export default function ModalForm({
  title,
  buttonText,
  userInfo,
  setuserInfo,
  functionModal,
  modalForm,
  setmodalForm,
}) {
  const cancelButtonRef = useRef(null)

  // useEffect(() => {
  //   setuserInfo(contactToUpdate)
  //   console.log({ userInfo })
  // }, [contactToUpdate])

  return (
    <Transition.Root show={modalForm} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setmodalForm}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      {title}
                    </h2>
                  </div>

                  <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={functionModal} className="space-y-6">
                      <div>
                        <div className="mt-2">
                          <input
                            type="text"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setuserInfo({
                                ...userInfo,
                                first_name: e.target.value,
                              })
                            }
                            style={{ paddingLeft: "12px" }}
                            placeholder="Firstname"
                            value={userInfo?.first_name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mt-2">
                          <input
                            type="text"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setuserInfo({
                                ...userInfo,
                                last_name: e.target.value,
                              })
                            }
                            style={{ paddingLeft: "12px" }}
                            placeholder="Lastname"
                            value={userInfo?.last_name}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mt-2">
                          <input
                            type="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setuserInfo({
                                ...userInfo,
                                email: e.target.value,
                              })
                            }
                            style={{ paddingLeft: "12px" }}
                            placeholder="Email"
                            value={userInfo?.email}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mt-2">
                          <input
                            type="tel"
                            pattern="09[0-9]{9}"
                            maxLength={11}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setuserInfo({
                                ...userInfo,
                                phone: e.target.value,
                              })
                            }
                            style={{ paddingLeft: "12px" }}
                            placeholder="Phone"
                            value={userInfo?.phone}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mt-2">
                          <input
                            type="text"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setuserInfo({
                                ...userInfo,
                                address: e.target.value,
                              })
                            }
                            style={{ paddingLeft: "12px" }}
                            placeholder="Address"
                            value={userInfo?.address}
                          />
                        </div>
                      </div>

                      <div className="flex gap-x-3 justify-end">
                        <button
                          type="button"
                          onClick={() => setmodalForm(!modalForm)}
                          className="flex w-20 justify-center rounded-md bg-slate-200 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-800 shadow-sm hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {buttonText}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
