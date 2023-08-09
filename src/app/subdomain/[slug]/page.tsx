import { notFound } from "next/navigation";
import MDX from "@/app/subdomain/components/mdx";
import DEFAULT_EDITOR_CONTENT from "@/app/(dashboard)/components/editor/default-content";
import {getMdxSource} from "@/lib/utils";
// import { getPostData } from "@/lib/fetchers";
// import MDX from "@/components/mdx";

export async function generateMetadata({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const { domain, slug } = params;
  // const data = await getPostData(domain, slug);
  // if (!data) {
  //   return null;
  // }
  // const { title, description } = data;

  return {
    title:'asdfasd',
    description: 'asdfadsf',
    // openGraph: {
    //   title,
    //   description,
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title,
    //   description,
    //   creator: "@vercel",
    // },
  };
}

export default async function SitePostPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const { domain, slug } = params;
  // const data = await getPostData(domain, slug);
  //
  // if (!data) {
  //   notFound();
  // }



  const data = await getMdxSource(`## Introducing Novelsd\\n\\nLikho editor offers Notion-style WYSIWYG editor with AI-powered autocompletion. Built with [Tiptap](https://tiptap.dev/) and [Vercel AI SDK](https://sdk.vercel.ai/docs).\\n\\n### Features\\n\\n1. Slash menu & bubble menu\\n2. AI autocomplete (type \`++\` to activate, or select from slash menu)\\n3. Image uploads (drag & drop / copy & paste, or select from slash menu)\\n\\n![banner.png](https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png \\"banner.png\\")---\\n\\n### Learn more\\n\\n- [ ] Check out the [launch video](https://twitter.com/steventey/status/1669762868416512000)\\n\\n- [ ] Star us on [GitHub](https://github.com/steven-tey/novel)\\n\\n- [ ] [Deploy your own](https://vercel.com/templates/next.js/novel) to Vercel`);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="m-auto w-full text-center md:w-7/12">
          <p className="m-auto my-5 w-10/12 text-sm font-light text-stone-500 dark:text-stone-400 md:text-base">
          </p>
          <h1 className="mb-10 font-title text-3xl font-bold text-stone-800 dark:text-white md:text-6xl">
            {"{data.title}"}
          </h1>
          <p className="text-md m-auto w-10/12 text-stone-600 dark:text-stone-400 md:text-lg">
            {"{data.description}"}
          </p>
        </div>
        <a
          // if you are using Git hub OAuth, you can get rid of the Twitter option
          href=""
          rel="noreferrer"
          target="_blank"
        >
          <div className="my-8">
            <div className="relative inline-block h-8 w-8 overflow-hidden rounded-full align-middle md:h-12 md:w-12">
              {/*{data.site?.user?.image ? (*/}
              {/*  <img*/}
              {/*    alt={data.site?.user?.name ?? "User Avatar"}*/}
              {/*    height={80}*/}
              {/*    src={data.site.user.image}*/}
              {/*    width={80}*/}
              {/*  />*/}
              {/*) : (*/}
              {/*  <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">*/}
              {/*    ?*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
            <div className="text-md ml-3 inline-block align-middle dark:text-white md:text-lg">
              {/*by <span className="font-semibold">{data.site?.user?.name}</span>*/}
            </div>
          </div>
        </a>
      </div>
      <div className="relative m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:mb-20 md:h-150 md:w-5/6 md:rounded-2xl lg:w-2/3">
        {/*<img*/}
        {/*  alt={data.title ?? "Post image"}*/}
        {/*  width={1200}*/}
        {/*  height={630}*/}
        {/*  className="h-full w-full object-cover"*/}
        {/*  placeholder="blur"*/}
        {/*  src={data.image ?? "/placeholder.png"}*/}
        {/*/>*/}
      </div>

      <MDX source={data} />
      {/*<MDX source={DEFAULT_EDITOR_CONTENT.content} />*/}

        <div className="relative mb-20 mt-10 sm:mt-20">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-stone-300 dark:border-stone-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-stone-500 dark:bg-black dark:text-stone-400">
              Continue Reading
            </span>
          </div>
        </div>
      {/*{data.adjacentPosts && (*/}
      {/*  <div className="mx-5 mb-20 grid max-w-screen-xl grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3">*/}
      {/*    {data.adjacentPosts.map((data, index) => (*/}
      {/*      <BlogCard key={index} data={data} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
}
