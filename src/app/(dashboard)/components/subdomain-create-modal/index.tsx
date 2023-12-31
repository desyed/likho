import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {Input} from "@material-tailwind/react";

type SubdomainCreateModalProps = {
    isOpen: boolean,
    onClose: () => void,
    onSubmit: (e: any) => Promise<void>,
    loading: boolean,
}
const SubdomainCreateModal = ({isOpen, onClose, onSubmit, loading}: SubdomainCreateModalProps)=>{

    return <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Create Subdomain
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Create a new subdomain for your project.
                                </p>
                            </div>

                            <form onSubmit={onSubmit} className="mt-4">
                                <div className="mb-10">
                                    <Input name="name" variant="standard" label="Subdomain Name" required />
                                </div>

                                <div className="mt-4 text-right">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="text-sm bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800">
                                        {loading ? 'Submitting...' :'Submit'}
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
}

export default SubdomainCreateModal;