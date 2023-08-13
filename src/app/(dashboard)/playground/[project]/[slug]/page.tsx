"use client"
import Editor from "@/app/(dashboard)/components/editor";
import {getPostBySlug} from "@/lib/actions";
import {useEffect, useState} from "react";

type PostData = {
    post: {
        id: string;
        name: string;
        slug: string;
        thumbnail: string;
        description: string;
        content: string;
        published: boolean;
        createdAt: string;
        updatedAt: string;
        type: string;
    }
}
export default  function Page({ params }: { params: { slug: string }; }) {
    const [data, setData] = useState<PostData>({} as PostData);
    const [loading, setLoading] = useState(true);

    const getPostData = async () => {
        try{
            const res = await getPostBySlug(params.slug || "");
            // @ts-ignore
            res && setData(res);
            setLoading(false)
        }catch (e){
            console.log(e)
        }
    }
    useEffect(() => {
        getPostData()
    },[])

    if(loading){
        return <div className="pt-5 flex items-center flex-col gap-3 justify-center h-[80vh] text-orange-500">
            <div className="w-12 h-12 rounded-full animate-spin border border-dashed border-orange-500 border-t-transparent"></div>
        </div>
    }

  return (

        <div className="editor">
            <Editor post={data?.post} />
        </div>
  )
}
