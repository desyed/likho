"use client"
import Editor from "@/app/(dashboard)/components/editor/index2";
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
    const [data, setData] = useState<PostData>({} as PostData)

    const getPostData = async () => {
        try{
            const res = await getPostBySlug(params.slug || "");
            // @ts-ignore
            res && setData(res);
        }catch (e){
            console.log(e)
        }
    }
    useEffect(() => {
        getPostData()
    },[])

  return (

        <div className="editor">
            <Editor post={data?.post} />
        </div>
  )
}
