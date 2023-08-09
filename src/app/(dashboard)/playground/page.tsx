"use client"

import {useEffect, useState} from "react";
import {createNewProject, fetchToken, getUserProjects} from "@/lib/actions";
import {setToken} from "@/lib/services/storage";
import Link from "next/link";
import {Plus} from "lucide-react";
import {useParams} from "next/navigation";
import {toast} from "sonner";
import ProjectModal from "../components/project-create-modal";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {TokenInfo} from "@/lib/common.types";

interface Project {
    node: {
        id: string;
        name: string;
        code: string;
        createdAt: string;
        updatedAt: string;

    }
}


export default function Page() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [tokenInfo, setTokenInfo] = useState<TokenInfo>();
    const [projectFromError, setProjectFromError] = useState(false);
    const [projectCreateLoading, setProjectCreateLoading] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    const closeProjectModal = () => setIsProjectModalOpen(false);
    const projectSubmit = async (e: any) => {
        e.preventDefault();
        setProjectCreateLoading(true);
        const name = e.target.name.value;

        if(name){
            setProjectFromError(false);
            try {
                // @ts-ignore
                tokenInfo &&  await createNewProject(name, tokenInfo?.id, tokenInfo?.token );
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
    useEffect( () => {
        getPageInfo();
    },[])

  return (
        <div className="pt-5">
            <h1 className="capitalize text-lg">Hi, {tokenInfo && tokenInfo?.name}!</h1>
            <p className="text-sm text-gray-500 ">Welcome to Likho playground! Now you can play with our available features. </p>
            <hr className="my-10"/>


            <h4 className="uppercase text-gray-600 text-xs mb-5 font-bold">Your Projects</h4>
            <div className="flex gap-5 flex-wrap">
                {projects.map((project, i) => (
                    <Link href={`/playground/${project?.node?.code}`} key={i}>
                        <div className="bg-gray-100 hover:bg-gray-200 rounded relative overflow-hidden p-5" key={i}>
                            <h5 className="text-sm font-bold text-gray-600">{project?.node?.name}</h5>
                        </div>
                    </Link>
                ))}
                <div
                    onClick={() => setIsProjectModalOpen(true)}
                    className="bg-gray-50 hover:bg-gray-100 rounded cursor-pointer p-5 border border-dotted" >
                    <h5 className="text-sm font-bold flex gap-1 items-center text-gray-600"><Plus/> Create a Project</h5>
                </div>
            </div>

            {/*  project dialog  */}
            <ProjectModal isOpen={isProjectModalOpen} onClose={closeProjectModal} onSubmit={projectSubmit} validated={projectFromError} loading={projectCreateLoading}/>

        </div>
  )
}
