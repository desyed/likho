"use client"
import Link from "next/link";
import {ImageIcon, Pencil, Plus} from "lucide-react";
import {createNewPost, fetchToken, getProjectByCode, getUserProjects} from "@/lib/actions";
import {getItem, setItem, setToken} from "@/lib/services/storage";
import {useEffect, useState} from "react";
import {TokenInfo} from "@/lib/common.types";
import {useParams} from "next/navigation";
import {toast} from "sonner";
import Image from "next/image";
import PostCreateModal from "@/app/(dashboard)/components/post-create-modal";
import {slugify} from "@/lib/utils";

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
        toast.error("Something went wrong");
      }
    }else {
      setPostFromError(true);
      setPostCreateLoading(false);
    }

  }

  useEffect( () => {
    getPageInfo();
  },[])
  return <div className="pt-5">
    <h1 className="capitalize text-sm">Project: <span className="text-orange-500">{project?.project.name}</span></h1>
    <p className="text-sm text-gray-500 ">Everything here is related to this particular project. So, play with it.</p>
    {project?.project.subdomain ? <div className="mt-5 text-right">
        <Link target="_blank" href={`https://${project?.project.subdomain}.likho.site`}>Visit Project</Link>
    </div>: <div className=" text-right">
        <button className="hover:bg-gray-800 bg-black px-3 py-1 rounded text-white text-xs">Generate Subdomain</button>
    </div>}
    <hr className="my-10"/>


    <h4 className="uppercase text-gray-600 text-xs mb-5 font-bold">Your Blogs</h4>
    <div className="hover:bg-gray-100  cursor-pointer px-3 py-1 border-b border-dotted mb-5" >
      <p onClick={() => setIsPostModalOpen(true)}
         className="text-xs flex gap-1 items-center text-orange-500"><Pencil width={15}/> Write a Post</p>
    </div>
    <div className="flex gap-3 flex-wrap">
      {project?.project?.posts?.edges?.length > 0 ? project?.project?.posts?.edges?.map((page: any, i: number) => (
            <Link href={`/playground/${code}/${page?.node?.slug}`} key={i}>
            <div className=" hover:bg-gray-50 border rounded relative overflow-hidden " key={i}>
              <div className="bg-gray-100 h-[100px] w-[200px] overflow-hidden">
                {page?.node?.thumbnail ? <Image alt={page?.node?.name} src={page?.node?.thumbnail} height={100} width={200} objectFit="cover" objectPosition="center"/>:
                <div className="h-full w-full flex justify-center items-center text-gray-600"><ImageIcon/></div>}
              </div>
              <h5 className="p-3 text-sm  text-gray-600">{page?.node?.name}</h5>
            </div>
          </Link>
      )):
        <div className="text-sm w-full flex-col flex gap-1 items-center justify-center text-gray-600">
          <Image
              alt="missing post"
              src="https://illustrations.popsy.co/gray/success.svg"
              width={400}
              height={400}
              className="dark:hidden"
          />
          <p>No posts yet!</p>

        </div>
      }

    </div>

    {/*  Post Create dialog  */}
    <PostCreateModal isOpen={isPostModalOpen} onFileChange={(key, value)=> setPostThumbnail(value)} onClose={() => setIsPostModalOpen(false)} onSubmit={postSubmit} validated={postFromError} loading={postCreateLoading}/>


  </div>;
}
export default Page;