import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  // const [data, posts] = await Promise.all([
  //   getSiteData(params.domain),
  //   getPostsForSite(params.domain),
  // ]);

  // if (!data) {
  //   notFound();
  // }

  return (
    <>
      <div className="mb-20 w-full">
          <div className="flex flex-col items-center justify-center py-20">

            <Image
              alt="missing post"
              src="https://illustrations.popsy.co/white/success.svg"
              width={400}
              height={400}
              className="hidden dark:block"
            />
            <p className="font-title text-2xl text-stone-600 dark:text-stone-400">

              No posts yet.
            </p>
          </div>

      </div>


    </>
  );
}
