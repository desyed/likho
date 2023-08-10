"use client"

import React, {useEffect, useMemo} from 'react'

import hljs from "highlight.js";
import {Github} from "lucide-react";

const html = '<h2>Introducing Novel</h2><blockquote class="border-l-4 border-stone-700"><p>Likho editor offers Notion-style WYSIWYG editor with AI-powered autocompletion. Built with <a target="_blank" rel="noopener noreferrer nofollow" class="text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer" href="https://tiptap.dev/">Tiptap</a> and <a target="_blank" rel="noopener noreferrer nofollow" class="text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer" href="https://sdk.vercel.ai/docs">Vercel AI SDK</a>.</p></blockquote><pre class="rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800"><code>export default async function RootLayout({ children }: { children: React.ReactNode }) {\n' +
    '    const session = await getCurrentUser();\n' +
    '    if(!session?.user) {\n' +
    '        redirect("/")\n' +
    '    }\n' +
    '  return (\n' +
    '    &lt;html lang="en"&gt;\n' +
    '      &lt;body className={`${inter.className} `}&gt;\n' +
    '      {children}\n' +
    '      &lt;/body&gt;\n' +
    '    &lt;/html&gt;\n' +
    '  )\n' +
    '}</code></pre><h3>Features</h3><ol class="list-decimal list-outside leading-3 -mt-2 tight" data-tight="true"><li class="leading-normal -mb-2"><p>Slash menu &amp; bubble menu sfs </p></li><li class="leading-normal -mb-2"><p>AI autocomplete (type <code class="rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900" spellcheck="false">++</code> to activate, or select from slash menu)</p></li><li class="leading-normal -mb-2"><p>Image uploads (drag &amp; drop / copy &amp; paste, or select from slash menu)</p></li></ol><img class="rounded-lg border border-stone-200 inline-block" src="https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png" alt="banner.png" title="banner.png"><hr class="mt-4 mb-6 border-t border-stone-300"><h3>Learn more</h3><ul class="not-prose pl-2" data-type="taskList"><li class="flex items-start my-4" data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Check out the <a target="_blank" rel="noopener noreferrer nofollow" class="text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer" href="https://twitter.com/steventey/status/1669762868416512000">launch video</a></p></div></li><li class="flex items-start my-4" data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Star us on <a target="_blank" rel="noopener noreferrer nofollow" class="text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer" href="https://github.com/steven-tey/novel">GitHub</a></p></div></li><li class="flex items-start my-4" data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p><a target="_blank" rel="noopener noreferrer nofollow" class="text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer" href="https://vercel.com/templates/next.js/novel">Deploy your own</a> to Vercel</p></div></li></ul>'
const Page = () => {

  useEffect(() => {
    hljs.highlightAll();
  });

  return (
      <div>
          <div className=" text-center mb-10 relative  bg-bottom bg-[url('/bg-post.jpg')] bg-no-repeat" >
              <div className="w-[90%] max-w-[1200px] mb-5 mx-auto">
                  <div className="flex pb-5 items-center justify-between">
                      <div className="">
                          <img className="h-5" src="/likho.svg" alt="logo"/>
                      </div>
                      <div >
                          <a href="https://github.com/desyed/likho" type="button" className="inline-flex items-center mt-2 px-3 py-0 border border-transparent text-xs  rounded-full shadow-sm text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500">
                              <Github width={15}/> Star on Github
                          </a>
                      </div>
                  </div>
                  <img className="shadow-xl w-full rounded-lg inline-block" src="https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png" alt="banner.png" title="banner.png"/>

                  <h1 className="text-3xl font-bold mt-20">This the the very Title of this post</h1>

              </div>
              {/*<div className="absolute bg-top h-full left-0 top-0 w-full"></div>*/}
          </div>
        <div className="w-[90%] max-w-[1200px] mb-10 mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src="https://public.blob.vercel-storage.com/1f3b8b8c-4b0b-4b0b-8b8c-4b0b4b0b8b8c/IMG_20210912_161711.jpg" alt=""/>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Syed Shihab</p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime="2021-09-12">Sep 12</time><span aria-hidden="true">&middot;</span>
                            <span>3 min read</span>
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    {/*<button type="button" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500">*/}
                    {/*    Subscribe*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
        <div className=" w-[90%] max-w-[1200px] mb-5 mx-auto">
          <div className="ProseMirror prose-lg prose-stone dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full"
               dangerouslySetInnerHTML={{__html: html}}></div>
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