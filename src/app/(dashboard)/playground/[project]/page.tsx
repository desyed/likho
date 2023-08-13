"use client"
import Link from "next/link";
import {ActivitySquare, ImageIcon, Link2Icon, Pencil, Plus} from "lucide-react";
import {createNewPost, createSubDomain, fetchToken, getProjectByCode, getUserProjects} from "@/lib/actions";
import {getItem, setItem, setToken} from "@/lib/services/storage";
import {useEffect, useState} from "react";
import {TokenInfo} from "@/lib/common.types";
import {useParams} from "next/navigation";
import {toast, Toaster} from "sonner";
import PostCreateModal from "@/app/(dashboard)/components/post-create-modal";
import {slugify} from "@/lib/utils";
import SubdomainCreateModal from "@/app/(dashboard)/components/subdomain-create-modal";

interface Project {
    project: {
      code: string;
      name: string;
      id: string;
      description?: string;
      logo?: string;
      posts?: any;
      subdomain?: any;
    }
}
const Page = () => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>();
  const [project, setProject] = useState<Project>();

  const [postFromError, setPostFromError] = useState(false);
  const [postThumbnail, setPostThumbnail] = useState<string | null>(null);
  const [postCreateLoading, setPostCreateLoading] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [subdomainLoading, setSubdomainLoading] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isSubdomainModalOpen, setIsSubdomainModalOpen] = useState(false);

  const {project: code} = useParams();
  async function getPageInfo() {
    const res = await fetchToken();

    if(res){
      setToken(res);
      setTokenInfo(res);
      try{
        const project = await getProjectByCode( String(code));
        setProject(project as Project);
        // @ts-ignore
        setItem('proj', project?.project?.id)
        setIsPostLoading(false);
      }catch (e) {
        toast.error("Something went wrong");
      }
    }
  }

  const postSubmit = async (e: any) => {
    e.preventDefault();
    setPostCreateLoading(true);
    const formValues = {
      name: e.target.name.value,
      slug: slugify(e.target.name.value)+ "-" + Math.floor(Math.random() * 100),
      description: e.target.description.value,
      thumbnail: postThumbnail,
      content: "",
    }
    if(formValues.name){
      setPostFromError(false);
      formValues.content = "## Your content goes here";
      try {
        // @ts-ignore
        tokenInfo &&  await createNewPost(formValues, tokenInfo?.id, getItem('proj'), tokenInfo?.token );
        setPostCreateLoading(false);
        setIsPostModalOpen(false);
        toast.success("Post created successfully");
        getPageInfo();
      }
      catch (e) {
        setPostCreateLoading(false);
        // toast.error("Something went wrong");
      }
    }else {
      setPostFromError(true);
      setPostCreateLoading(false);
    }

  }
  const subdomainSubmit = async (e: any) => {
    e.preventDefault();
    setSubdomainLoading(true);
    const formValues = {
      name: e.target.name.value,
    }
    if(formValues.name){
      try {
        // @ts-ignore
        tokenInfo &&  await createSubDomain(formValues.name, getItem('proj'), tokenInfo?.token );
        setSubdomainLoading(false);
        setIsSubdomainModalOpen(false);
        toast.success("Subdomain created successfully");
        await getPageInfo();
      }
      catch (e) {
        setPostCreateLoading(false);
        toast.error("This subdomain already used, try another one.");
      }
    }else {
      setPostFromError(true);
      setPostCreateLoading(false);
    }
  }

  useEffect( () => {
    getPageInfo();
  },[])

  if(isPostLoading) return <div className="pt-5 flex items-center flex-col gap-3 justify-center h-[80vh] text-orange-500">
    <div className="w-12 h-12 rounded-full animate-spin border border-dashed border-orange-500 border-t-transparent"></div>
  </div>

  return <div className="pt-5">
    {project?.project?.logo ? <div className="flex items-center gap-2 mb-5">
      <img src={project?.project?.logo} alt="" className="w-10 h-10 border rounded-full"/>
        </div> : <div className="flex items-center gap-2 mb-5">
        <div className="w-10 h-10 rounded-full bg-gray-200"/>
        </div>}
    <h1 className="capitalize text-sm flex items-center font-medium gap-2"><span className="">{project?.project.name}</span></h1>
    <p className="text-sm text-gray-500 ">Everything here is related to this particular project. So, play with it.</p>
    {project?.project.subdomain ? <div className="mt-5 ">
        <Link  className="hover:bg-gray-800 bg-black px-3 py-1 rounded text-white text-xs inline-flex gap-1 items-center" target="_blank" href={`https://${project?.project?.subdomain?.name}.likho.site`}>
          <Link2Icon width={15}/>{`${project?.project?.subdomain?.name}.likho.site`}
        </Link>
    </div>: <div className="pt-2">
        <button className="hover:bg-gray-800 bg-black px-3 py-1 rounded text-white text-xs"
        onClick={() => setIsSubdomainModalOpen(true)}>Generate Subdomain</button>
    </div>}
    <hr className="my-10"/>


    <h4 className="uppercase text-gray-600 text-xs mb-5 font-bold">Your Blogs</h4>
    <div className="hover:bg-gray-100  cursor-pointer px-3 py-1 border-b border-dotted mb-5" >
      <p onClick={() => {
        setIsPostModalOpen(true)
        setPostThumbnail(null)
      }}
         className="text-xs flex gap-1 items-center text-orange-500"><Pencil width={15}/> Write a Post</p>
    </div>
    <div className="flex gap-3 flex-wrap">
      {project?.project?.posts?.edges?.length > 0 ? project?.project?.posts?.edges?.map((page: any, i: number) => (
            <Link href={`/playground/${code}/${page?.node?.slug}`} key={i}>
            <div className=" hover:bg-gray-50 border rounded relative overflow-hidden " key={i}>
              <div className="bg-gray-100 h-[100px] w-[200px] overflow-hidden">
                {page?.node?.thumbnail ? <img alt={page?.node?.name} src={page?.node?.thumbnail} className="w-full h-full object-cover"/>:
                <div className="h-full w-full flex justify-center items-center text-gray-600"><ImageIcon/></div>}
              </div>
              <div className="p-3">
                <h5 className=" text-sm  text-gray-600">{page?.node?.name}</h5>
                <p className={`inline-block rounded-full text-[9px] border px-2 ${page?.node?.published ? "text-orange-500" : "text-gray-400"}`}>{page?.node?.published ? "Published" : "Draft"}</p>
              </div>
            </div>
          </Link>
      )):
        <div className="text-sm w-full flex-col flex gap-1 items-center justify-center text-gray-600">
          {/*<Image*/}
          {/*    alt="missing post"*/}
          {/*    src="https://illustrations.popsy.co/gray/success.svg"*/}
          {/*    width={400}*/}
          {/*    height={400}*/}
          {/*    className="dark:hidden"*/}
          {/*/>*/}
          <p>No posts yet!</p>

        </div>
      }

    </div>

    {/*  Post Create dialog  */}
    <PostCreateModal isOpen={isPostModalOpen} onFileChange={(key, value)=> setPostThumbnail(value)} onClose={() => setIsPostModalOpen(false)} onSubmit={postSubmit} validated={postFromError} loading={postCreateLoading}/>
    <SubdomainCreateModal isOpen={isSubdomainModalOpen} onClose={()=>setIsSubdomainModalOpen(false)}
                          onSubmit={subdomainSubmit} loading={subdomainLoading} />
    <Toaster/>

  </div>;
}
export default Page;