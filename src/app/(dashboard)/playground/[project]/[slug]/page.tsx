"use client"
import Editor from "@/app/(dashboard)/components/editor/index";
import {getPostBySlug} from "@/lib/actions";
import {useEffect, useState} from "react";


export default  function Page({ params }: { params: { slug: string }; }) {
    const [data, setData] = useState({})

    const getPostData = async () => {
        try{
            const res = await getPostBySlug(params.slug || "");
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
            {/* @ts-ignore */}
            <Editor post={data?.post} />
        </div>
  )
}
