"use client"

import React, {useEffect, useMemo, useState} from 'react'
import hljs from "highlight.js";
import {Github, RssIcon} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {getPostBySlug} from "@/lib/actions";
import moment from "moment";

type Post = {
    name: string;
    slug: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    published: boolean;
    thumbnail: string;
    description: string;
    id: string;
    type: string;
}


const Page = () => {

const [data, setData] = useState<Post>();
const pathname = usePathname();


const getPostData  = async () => {
    const res = await getPostBySlug(pathname.replace("/",""));
    // @ts-ignore
    setData(res?.post || {});
}

  useEffect(() => {
      getPostData()
        hljs.highlightAll();
  },[]);

  return (
      <div>
          <div className=" text-center mb-10 relative  bg-bottom bg-[url('/bg-post.jpg')] bg-no-repeat" >
              <div className="w-[90%] max-w-[1200px] mb-5 mx-auto">
                  <div className="flex pb-5 items-center justify-between">
                      <div className="">
                          <Link href={"/"}><img className="h-5" src="/likho.svg" alt="logo"/></Link>
                      </div>
                      <div >
                          <a href="https://github.com/desyed/likho" type="button" className="inline-flex items-center mt-2 px-3 py-0 border border-transparent text-xs  rounded-full shadow-sm text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500">
                              <Github width={15}/> Star on Github
                          </a>
                      </div>
                  </div>
                  <img className="shadow-xl w-full rounded-lg inline-block"
                        src={data?.thumbnail || "/placeholder.png"}
                        alt={data?.name} title={data?.name}/>

                  <h1 className="text-3xl font-bold mt-5">{data?.name}</h1>

              </div>
          </div>
        <div className="w-[90%] max-w-[1200px] mb-10 mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {/*<div className="flex-shrink-0">*/}
                    {/*    <img className="h-10 w-10 rounded-full" src="https://public.blob.vercel-storage.com/1f3b8b8c-4b0b-4b0b-8b8c-4b0b4b0b8b8c/IMG_20210912_161711.jpg" alt=""/>*/}
                    {/*</div>*/}
                    <div className="ml-3">
                        {/*<p className="text-sm font-medium text-gray-900">Syed Shihab</p>*/}
                        <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime={data?.updatedAt}>{moment(data?.updatedAt).format('MMM DD')}</time><span aria-hidden="true">&middot;</span>
                            <span>3 min read</span>
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0 text-gray-600">
                        <RssIcon/>
                </div>
            </div>
        </div>
        <div className=" w-[90%] max-w-[1200px] mb-5 mx-auto min-h-[30vh]">
          <div className="ProseMirror prose-lg prose-stone dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full"
               dangerouslySetInnerHTML={{__html: data?.content || ""}}></div>
        </div>
          <div className="bg-gray-300 py-10 mt-10">
                <div className="w-[90%] max-w-[1200px] mb-5 mx-auto">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-gray-600">Deloped by Syed Shihab</p>
                        <p className="text-xs font-medium text-gray-600">Build with <b>Likho</b> <b>&middot;</b> Proudly Open Source</p>
                    </div>
                </div>
          </div>
      </div>
  )
}

export default Page;