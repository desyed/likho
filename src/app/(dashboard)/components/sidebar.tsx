"use client";
import Image from "next/image";
import {
    ActivitySquare,
    FileSignature,
    FolderKanban,
    Github,
    GraduationCap,
    PlusCircle,
    Settings,
    Twitter
} from "lucide-react";
import Link from "next/link";
import {Fragment, useEffect, useState} from "react";
import {createNewProject, getCurrentSession, getUserProjects} from "@/lib/actions";
import {Dialog, Transition} from "@headlessui/react";
import {Input} from "@material-tailwind/react";


// create project
// get pages from server
// create page


const Sidebar = () => {
    const [projects, setProjects] = useState([]);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(true);
    const closeProjectModal = () => setIsProjectModalOpen(false);
    const projectSubmit = async (e: any) => {
        e.preventDefault();
        // console form values
        console.log(e.target.name.value)
        const name = e.target.name.value;
        const res = await createNewProject(name);
        console.log(res);
    }
    useEffect( () => {

        async function getUser() {
            const res = await getCurrentSession();
            const {user: {projects: {edges: projects}}} = res?.user?.id && await getUserProjects( res.user.id);
            setProjects(projects || []);
        }
        getUser();

    },[])
    return <div className="w-[240px] bg-gray-100 min-h-[100vh] p-5">
        <div className="mb-10">
            <Link href="/">
                <Image width={60} height={20} src="/likho.svg" alt="logo"/>
            </Link>
        </div>
        <div>
            <h4 className="flex gap-2 text-gray-400 text-xs items-center mb-1">
                <ActivitySquare width={15}/><b>PROJECTS</b>
            </h4>

            {projects && projects.map(({node: { name}}, i) => (
                <Link key={i} href={`/${name}`}>
                    <p className="flex gap-2 font-light text-gray-600 text-sm items-center hover:text-black">
                        <FolderKanban width={15}/><b>{name}</b>
                    </p>
                </Link>
            ))}

            <p className="cursor-pointer flex gap-2 font-light text-gray-600 text-xs items-center hover:text-black">
                <PlusCircle width={15}/><b>Add a Project</b>
            </p>

            <hr className="my-3"/>

            <h4 className="flex gap-2 text-gray-400 text-xs items-center mb-1">
                <ActivitySquare width={15}/><b>PAGES</b>
            </h4>

            <Link href="/">
                <p className="flex gap-2 font-light text-gray-600 text-sm items-center hover:text-black">
                    <FileSignature width={15}/><b>First page</b>
                </p>
            </Link>

            <Link href="/">
                <p className="flex gap-2 font-light text-gray-600 text-xs items-center hover:text-black">
                    <PlusCircle width={15}/><b>Add a Page</b>
                </p>
            </Link>

            <hr className="my-3"/>
            <h4 className="flex gap-2 text-gray-400 text-xs items-center mb-1">
                <ActivitySquare width={15}/><b>CONFIGURATIONS</b>
            </h4>

            <Link href="/">
                <p className="flex gap-2 font-light text-gray-600 text-sm items-center hover:text-black">
                    <Settings width={15}/><b>Settings</b>
                </p>
            </Link>

            <Link href="/">
                <p className="flex gap-2 font-light text-gray-600 text-sm items-center hover:text-black">
                    <GraduationCap width={15}/><b>Learn More</b>
                </p>
            </Link>
            <hr className="my-3"/>
            <h4 className="flex gap-2 text-gray-400 text-xs items-center mb-1">
                <ActivitySquare width={15}/><b>OTHERS</b>
            </h4>
            <Link href="/">
                <p className="flex gap-2 font-light text-gray-600 text-sm items-center hover:text-black">
                    <Github width={15}/><b>Star on Github</b>
                </p>
            </Link>

            <Link href="/">
                <p className="flex gap-2 font-light text-gray-600 text-sm items-center hover:text-black">
                    <Twitter width={15}/><b>Follow</b>
                </p>
            </Link>
        </div>
    {/*  project dialog  */}
        <Transition appear show={isProjectModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeProjectModal}>
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
                                    Create New Project
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Get started by creating a new project.
                                    </p>
                                </div>

                                <form onSubmit={projectSubmit} className="mt-4">
                                    <div className="mb-4">

                                        <Input name="name" variant="standard" label="Project Name" />
                                    </div>

                                    <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    >
                                        Submit
                                    </button>
                                </div>
                                </form>




                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </div>
}

export default Sidebar;