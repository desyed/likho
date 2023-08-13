"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {getValidSubdomain, placeholderBlurhash, toDateString} from "@/lib/utils";
import {DotIcon, Github, Loader2} from "lucide-react";
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
    const [loading, setLoading] = React.useState(true);



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
                const resData = res && (res?.subdomain?.project?.posts?.edges || []).filter(item => item?.node?.published);
                setData(resData || []);
                setLoading(false);
            }catch (e){
                window.location.href = "https://likho.site"
            }
        }
        getDomainDetails()
    }, []);

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <DotIcon width={50} height={50} />
                <DotIcon width={50} height={50} />
                <DotIcon width={50} height={50} />
            </div>
        )
    }

    return (
    <>
        <div className="min-h-[50vh]">
            <div className=" text-center mb-10 relative bg-bottom bg-[url('/bg-post.jpg')] bg-no-repeat">
                <div className="w-[90%] max-w-[1200px] mb-5 mx-auto">
                    <div className="flex pb-5 items-center justify-between">
                        <div className="">
                            <Link href="/">
                                <img className="h-8" src="/likho.png" alt="logo"/>
                            </Link>
                        </div>
                        <div>
                            <a href="https://github.com/desyed/likho" type="button"
                               className="inline-flex items-center mt-2 px-3 py-0 border border-transparent text-xs  rounded-full shadow-sm text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500">
                                <Github width={15}/> Star on Github
                            </a>
                        </div>
                    </div>
                    {/* featured blog / more recent one */}
                    {data.length > 0 ? (<Link href={`/${data[0]?.node?.slug}`}>
                            <div className="">
                                <img className="h-[300px] inline-block object-cover rounded-2xl border w-full"
                                     src={data[0]?.node?.thumbnail ? data[0]?.node?.thumbnail : "/thumb-placeholder2.png"}
                                     alt="banner.png" title="banner.png"/>
                                <div className="">
                                    <h1 className="border-l-4 font-medium hover:text-orange-500 mt-4 pl-4 text-3xl text-left">{data[0]?.node?.name ? data[0]?.node?.name : "No Title"}</h1>
                                </div>
                            </div>
                        </Link>
                    ): (
                        <div className="flex items-center justify-center h-[80vh]">
                            <p>No article found!</p>
                        </div>)}
                </div>
            </div>
        </div>
        <div className="min-h-[37vh]">
            <div className="w-[90%] max-w-[1200px] mx-auto mb-5">
                {data.length > 1 && <h2 className="mb-10 font-title text-4xl dark:text-white md:text-xl">
                    More stories <b>&middot;</b>
                </h2>}
                <div className="mx-auto flex flex-wrap gap-3">
                    {data.length > 1 && data.map(({node: {name, thumbnail, slug}}, i) => (
                        <Link key={i} href={`/${slug}`}>
                            <div  className="w-[380px]">
                                <img className="shadow-xl h-[240px] w-full rounded-lg inline-block object-cover"
                                     src={thumbnail || "/placeholder.png"} alt="banner.png" title="banner.png"/>
                                <div className="border-l-4 mt-5 pl-4">
                                        <h1 className="text-md font-medium">{name || 'No Title'}</h1>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>


        <div className="bg-gray-300 py-10 mt-10">
            <div className="w-[90%] max-w-[1200px] mb-5 mx-auto">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-600">Deloped by Syed Shihab</p>
                    <p className="text-xs font-medium text-gray-600">Build with <b>Likho</b> <b>&middot;</b> Proudly
                        Open Source</p>
                </div>
            </div>
        </div>
    </>
    );
}
