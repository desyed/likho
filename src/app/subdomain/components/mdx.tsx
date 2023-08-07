"use client";

// import { Post } from "@prisma/client";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { replaceLinks } from "./remark-plugins";
import { Tweet } from "react-tweet";
import styles from './mdx.module.css'

export default function MDX({ source }: { source: MDXRemoteProps }) {
  const components = {
    a: replaceLinks,
    Tweet,
  };

  return (
    <article
      className={`prose-md prose prose-stone m-auto w-11/12 dark:prose-invert sm:prose-lg sm:w-3/4 ${styles.root}`}
      suppressHydrationWarning={true}
    >
      {/* @ts-ignore */}
      <MDXRemote {...source} components={components} />
    </article>
  );
}



