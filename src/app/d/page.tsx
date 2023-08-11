"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {getValidSubdomain, placeholderBlurhash, toDateString} from "@/lib/utils";
import {Github} from "lucide-react";
import React, {useEffect} from "react";
import {getDomainData} from "@/lib/actions";

type Post = {
    node: {
        slug: string;
        name: string;
        description: string;
        content: string;
        thumbnail: string | null;
        createdAt: Date;
    }
}

export default function SiteHomePage() {

    const [data, setData] = React.useState<Post[]>([]);



    useEffect(() => {
        const domain = getValidSubdomain(window?.location?.hostname);

        const getDomainDetails = async () => {
            try{
                const res = await getDomainData(domain || "");
                // @ts-ignore
                if(!res?.subdomain){
                    window.location.href = "https://likho.site"
                }
                // @ts-ignore
                res && setData(res?.subdomain?.project?.posts?.edges || []);
            }catch (e){
                console.log(e)
                window.location.href = "https://likho.site"
            }
        }
        getDomainDetails()
    }, []);








    return (
        <>
            <div>
                <div className=" text-center mb-10 relative bg-bottom bg-[url('/bg-post.jpg')] bg-no-repeat" >
                    <div className="w-[90%] max-w-[1200px] mb-5 mx-auto">
                        <div className="flex pb-5 items-center justify-between">
                            <div className="">
                                <img className="h-5" src="/likho.png" alt="logo"/>
                            </div>
                            <div >
                                <a href="https://github.com/desyed/likho" type="button" className="inline-flex items-center mt-2 px-3 py-0 border border-transparent text-xs  rounded-full shadow-sm text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500">
                                    <Github width={15}/> Star on Github
                                </a>
                            </div>
                        </div>
                        {/* featured blog / more recent one */}
                        { data.length > 0 && (
                                <div className="relative rounded-lg overflow-hidden shadow-md">
                                    <img className="shadow-xl h-[300px] w-full  inline-block object-cover"
                                         src={data[0]?.node?.thumbnail ? data[0]?.node?.thumbnail : "/thumb-placeholder.png"} alt="banner.png" title="banner.png"/>
                                    <div className="absolute w-full h-20 bottom-0 left-0 bg-gradient-to-t from-gray-300 to-transparent">
                                        <Link href={'/'}>
                                            <h1 className="text-2xl hover:text-orange-500 font-medium mt-4">{data[0]?.node?.name ? data[0]?.node?.name : "No Title"}</h1>
                                        </Link>
                                    </div>
                                </div>
                        )}
                    </div>
                </div>
            </div>
        <div>
            <div className="w-[90%] max-w-[1200px] mx-auto mb-5">
                {data.length > 1 && <h2 className="mb-10 font-title text-4xl dark:text-white md:text-xl">
                    More stories <b>&middot;</b>
                </h2>}
                <div className="mx-auto flex flex-wrap gap-3">
                    {data.length > 1 && data.map(({node: { name, thumbnail}}, i)=>(

                    <div key={i} className="relative rounded-lg overflow-hidden shadow-md w-[200px]">
                        <img className="shadow-xl h-[240px] w-full  inline-block object-cover"
                             src={thumbnail || "/thumb-placeholder.png"} alt="banner.png" title="banner.png"/>
                        <div className="absolute px-3 w-full h-20 bottom-0 left-0 bg-gradient-to-t from-gray-300 to-transparent">
                            <Link href={'/'}>
                                <h1 className="text-md font-medium mt-4">{name || 'No Title'}</h1>
                            </Link>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>


            <div className="bg-gray-300 py-10 mt-10">
                <div className="w-[90%] max-w-[1200px] mb-5 mx-auto">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-gray-600">Deloped by Syed Shihab</p>
                        <p className="text-xs font-medium text-gray-600">Build with <b>Likho</b> <b>&middot;</b> Proudly Open Source</p>
                    </div>
                </div>
            </div>
        </>
    );
}
