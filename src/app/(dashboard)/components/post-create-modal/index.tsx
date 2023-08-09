import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {Input, Textarea} from "@material-tailwind/react";
import {convertBase64} from "@/lib/utils";

type ProjectModalProps = {
    isOpen: boolean,
    onClose: () => void,
    onFileChange?: (key: string, value: string) => void,
    onSubmit: (e: any) => Promise<void>,
    validated: boolean,
    loading: boolean,
}
const PostModal = ({isOpen, onClose, onSubmit, onFileChange, validated, loading}: ProjectModalProps)=>{

    const [preview, setPreview] = useState<string >("")
    const handleFileRead = async (event: any) :Promise<void> => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setPreview(String(base64) || "");
        onFileChange && onFileChange("thumbnail", String(base64) || "");
    }
    return <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {
            setPreview("")
            onClose()
        }}>
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
                                Create Post
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Create a new post for your project.
                                </p>
                            </div>

                            <form onSubmit={onSubmit} className="mt-4">
                                <div className="mb-10">
                                    <Input name="name" placeholder="                          This will be post title" variant="standard" required label="Post Title" />
                                </div>

                                <div className="mb-10">
                                    <Textarea
                                        placeholder="                          This will be description of your post"
                                        name="description" error={validated} variant="standard" label="Description" />
                                </div>
                                <div className="mb-10">
                                    {preview && <img src={preview.toString()} alt="preview" className="border h-20 my-5 rounded" />}
                                    <Input onChange={handleFileRead} type="file" name="thumbnail" error={validated} variant="standard" label="Post Thumbnail"
                                    className="bg-clip-padding block border-neutral-300 border-solid dark:border-neutral-600 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary dark:text-neutral-200 duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem]  file:[margin-inline-end:0.75rem] file:bg-neutral-100 file:border-0 file:border-inherit file:border-solid file:duration-150 file:ease-in-out file:overflow-hidden file:px-3 file:py-[0.32rem] file:rounded-none file:text-neutral-700 file:transition flex-auto focus:border-primary focus:outline-none focus:shadow-te-primary focus:text-neutral-700 font-normal hover:file:bg-neutral-200 m-0 min-w-0 px-3 py-[0.32rem] relative text-base text-neutral-700 transition w-full"/>
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

export default PostModal;