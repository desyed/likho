"use client"

import {Suspense, useEffect, useState} from "react";
import {createNewProject, fetchToken, getUserProjects} from "@/lib/actions";
import {setToken} from "@/lib/services/storage";
import Link from "next/link";
import {Plus} from "lucide-react";
import {useParams} from "next/navigation";
import {toast, Toaster} from "sonner";
import ProjectModal from "../components/project-create-modal";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {TokenInfo} from "@/lib/common.types";

interface Project {
    node: {
        id: string;
        name: string;
        code: string;
        logo: string;
        subdomain: {
            id: string;
            name: string;
        };
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
    const [logo, setLogoUrl] = useState<string | null>();

    const closeProjectModal = () => {
        setIsProjectModalOpen(false);
         setLogoUrl(null);
    };
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

            <Suspense fallback={"..."}><h1 className="capitalize text-lg">Hi, {tokenInfo && tokenInfo?.name}!</h1></Suspense>
            <p className="text-sm text-gray-500 ">Welcome to Likho playground! Now you can play with our available features. </p>
            <hr className="my-10"/>


            <h4 className="uppercase text-gray-600 text-xs mb-5 font-bold">Your Projects</h4>
            <div className="flex gap-5 flex-wrap">
                {projects.map((project, i) => (
                    <Link href={`/playground/${project?.node?.code}`} key={i}>
                        <div className="bg-gray-100 hover:bg-gray-200 rounded relative overflow-hidden p-2" key={i}>
                            <div className="h-10 w-full bg-white rounded">
                                {project?.node?.logo ? <img src={project?.node?.logo} alt="logo" className="h-full w-full object-cover"/> : <p className="pt-3 text-center text-xs text-gray-500">No logo</p>}
                            </div>
                            <div>
                                <h5 className="text-sm font-bold text-gray-600 mt-2">{project?.node?.name}</h5>
                                {project?.node?.subdomain ? <Link href={`https://${project?.node?.subdomain?.name}.likho.site`} className="text-xs text-gray-500 hover:text-orange-500">{project?.node?.subdomain?.name}.likho.site</Link>:
                                    <p className="text-xs text-gray-500">No subdomain</p>}
                            </div>
                        </div>
                    </Link>
                ))}
                <div
                    onClick={() => {
                        setIsProjectModalOpen(true);
                        setLogoUrl(null);
                    }}
                    className="bg-gray-50 hover:bg-gray-100 rounded cursor-pointer p-5 border border-dotted flex items-center justify-center" >
                    <h5 className="text-xs font-bold flex gap-1 items-center text-gray-600"><Plus width={15}/> Create a Project</h5>
                </div>
            </div>

            {/*  project dialog  */}
            <ProjectModal isOpen={isProjectModalOpen} onFileChange={(k, value) => setLogoUrl(value)} onClose={closeProjectModal} onSubmit={projectSubmit} validated={projectFromError} loading={projectCreateLoading}/>
            <Toaster/>
        </div>
  )
}
