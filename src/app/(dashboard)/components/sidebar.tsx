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
import { useEffect, useState} from "react";
import {createNewProject, fetchToken, getUserProjects} from "@/lib/actions";
import {toast} from "sonner";
import {useParams} from "next/navigation";
import {setItem, setToken} from "@/lib/services/storage";
import ProjectModal from "@/app/(dashboard)/components/project-create-modal";

const Sidebar = () => {

    const [projectFromError, setProjectFromError] = useState(false);
    const [projectCreateLoading, setProjectCreateLoading] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [logo, setLogoUrl] = useState<string | null>();

    const {project: projectCode} = useParams()
    const closeProjectModal = () => {
        setIsProjectModalOpen(false);
        // setLogoUrl(null);
    };

    const [projects, setProjects] = useState([]);
    const [posts, setPosts] = useState([]);
    const [tokenInfo, setTokenInfo] = useState(null);

    async function getPageInfo() {
        const res = await fetchToken();

        if(res){
            setToken(res);
            setTokenInfo(res);
            const userProjects = await getUserProjects( res.id);
            // @ts-ignore
            setProjects(userProjects?.user?.projects?.edges ||[]);
        }
    }


    const projectSubmit = async (e: any) => {
        e.preventDefault();
        setProjectCreateLoading(true);
        const name = e.target.name.value;

        if(name){
            setProjectFromError(false);
            try {
                // @ts-ignore
                tokenInfo &&  await createNewProject({name, logo}, tokenInfo?.id, tokenInfo?.token );
                setProjectCreateLoading(false);
                setIsProjectModalOpen(false);
                toast.success("Project created successfully");
                getPageInfo();
            }
            catch (e) {
                setProjectCreateLoading(false);
                toast.error("Something went wrong");
            }
        }else {
            setProjectFromError(true);
            setProjectCreateLoading(false);
        }

    }


    useEffect( () => {
        getPageInfo();
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

            {projects && projects.map(({node: { name, code, id, posts}}: any, i: number) => (
                <Link onClick={() => {
                    setItem('proj', id)
                    setPosts(posts?.edges || []);
                }} key={i} href={`/playground/${code}`}>
                    <p className={`flex gap-2 font-light  text-sm items-center hover:text-black ${code === projectCode ? "text-black border-amber-500 border-r-2" : "text-gray-600"}`}>
                        <FolderKanban width={15}/><b>{name}</b>
                    </p>
                </Link>
            ))}

            <p onClick={() => {
                setIsProjectModalOpen(true);
                setLogoUrl(null);
            }}
                className="cursor-pointer flex gap-2 font-light text-gray-600 text-xs items-center hover:text-black">
                <PlusCircle width={15}/><b>Create Project</b>
            </p>

            {projectCode && (<>

                <hr className="my-3"/>

                <h4 className="flex gap-2 text-gray-400 text-xs items-center mb-1">
                    <ActivitySquare width={15}/><b>POSTS</b>
                </h4>

                {posts && posts.map(({node: { name, slug, id}}: any) => <Link href={`/playground/${projectCode}/${slug}`} key={id}>
                    <p className={`flex gap-2 font-light text-sm items-center hover:text-black ${slug === 'home' ?"text-black border-amber-500 border-r-2" : "text-gray-600"}`}>
                        <FileSignature width={15}/><b>{name}</b>
                    </p>
                </Link>)}

            </>)}

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
                    <Twitter width={15}/><b>Follow on Twitter</b>
                </p>
            </Link>
        </div>
    {/*  project dialog  */}
    <ProjectModal isOpen={isProjectModalOpen} onFileChange={(k, value) => setLogoUrl(value)} onClose={closeProjectModal} onSubmit={projectSubmit} validated={projectFromError} loading={projectCreateLoading}/>
    </div>
}

export default Sidebar;