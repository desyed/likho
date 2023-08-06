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

const Sidebar = () => {
    return <div className="w-[240px] bg-gray-100 min-h-[100vh] p-5">
        <div className="mb-10">
            <Link href="/">
                <Image width={80} height={20} src="/likho.svg" alt="logo"/>
            </Link>
        </div>
        <div>
            <h4 className="flex gap-2 text-gray-400 text-xs items-center mb-1">
                <ActivitySquare width={15}/><b>PROJECTS</b>
            </h4>

            <Link href="/">
                <p className="flex gap-2 font-light text-gray-600 text-sm items-center hover:text-black">
                    <FolderKanban width={15}/><b>First Project</b>
                </p>
            </Link>

            <Link href="/">
                <p className="flex gap-2 font-light text-gray-600 text-sm items-center hover:text-black">
                    <PlusCircle width={15}/><b>Add a Project</b>
                </p>
            </Link>

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
                <p className="flex gap-2 font-light text-gray-600 text-sm items-center hover:text-black">
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
        {/*<div>*/}
        {/*    setting and user info*/}
        {/*</div>*/}
    </div>
}

export default Sidebar;