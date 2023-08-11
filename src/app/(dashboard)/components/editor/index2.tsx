"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapEditorProps } from "./props";
import { TiptapExtensions } from "./extensions";
import { useDebounce } from "use-debounce";
import { useCompletion } from "ai/react";
import {toast, Toaster} from "sonner";
import va from "@vercel/analytics";
import TextareaAutosize from "react-textarea-autosize";
import { updatePost } from "@/lib/actions";
import {cn, getHost, getSubdomain} from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import {EditorBubbleMenu} from "@/app/(dashboard)/components/editor/components";
import {usePathname} from "next/navigation";
import {getTokenOnly} from "@/lib/services/storage";
import UploadImage from "@/app/(dashboard)/components/editor/components/uploadImage";

interface Post {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  content: string;
  published: boolean;
}
export default function Editor({ post }: { post: Post }) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();

  const [data, setData] = useState<Post>(post);
  const [hydrated, setHydrated] = useState(false);

  // TODO: get project code from url

  const pathname = usePathname()
  const slug = pathname.split('/').pop() || '';

  const subdomain = getSubdomain(getHost());

  const [debouncedData] = useDebounce(data, 1000);

  useEffect(() => {
    // compare the title, description, thumbnail and content only
    if (
        debouncedData?.name === post?.name &&
        debouncedData?.description === post?.description &&
        debouncedData?.thumbnail === post?.thumbnail &&
        debouncedData?.content === post?.content
    ) {
      return;
    }
    startTransitionSaving(async () => {
      await updatePost({...post, ...debouncedData}, getTokenOnly())

    });
  }, [debouncedData, post]);

  // listen to CMD + S and override the default behavior
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "s") {
        e.preventDefault();
        startTransitionSaving(async () => {
          await updatePost(data, getTokenOnly());
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [data, startTransitionSaving]);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      const selection = e.editor.state.selection;
      const lastTwo = e.editor.state.doc.textBetween(
          selection.from - 2,
          selection.from,
          "\n",
      );
      if (lastTwo === "++" && !isLoading) {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        });
        // we're using this for now until we can figure out a way to stream markdown text with proper formatting: https://github.com/steven-tey/novel/discussions/7
        complete(
            `Title: ${data.name}\n Description: ${
                data.description
            }\n\n ${e.editor.getText()}`,
        );
        // complete(e.editor.storage.markdown.getMarkdown());
        va.track("Autocomplete Shortcut Used");
      } else {
        setData((prev: any) => ({
          ...prev,
          // content: e.editor.storage.markdown.getMarkdown(),
          content: e.editor.getHTML(),
        }));
      }
    },
  });

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "novel",
    api: "/api/generate",
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: (err) => {
      toast.error(err.message);
      if (err.message === "You have reached your request limit for the day.") {
        va.track("Rate Limit Reached");
      }
    },
  });

  const prev = useRef("");

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    editor?.commands.insertContent(diff);
  }, [isLoading, editor, completion]);

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
        stop();
        if (e.key === "Escape") {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          });
        }
        editor?.commands.insertContent("++");
      }
    };
    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      stop();
      if (window.confirm("AI writing paused. Continue?")) {
        complete(
            `Title: ${data.name}\n Description: ${data.description}\n\n ${
                editor?.getText() || " "
            }`,
        );
      }
    };
    if (isLoading) {
      document.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", mousedownHandler);
    } else {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    };
  }, [
    stop,
    isLoading,
    editor,
    complete,
    completion?.length,
    data?.name,
    data?.description,
  ]);

  // Hydrate the editor with the content
  useEffect(() => {
    if (editor && post?.content && !hydrated) {
      editor.commands.setContent(post.content);
      setHydrated(true);
    }
  }, [editor, post, hydrated]);

  return (
      <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 dark:border-stone-700 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg">
        <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
          {data?.published && (
              <a
                  // href={url}
                  href={"/" + post.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
          )}
          <div className="rounded-lg bg-stone-100 px-2 py-1 text-xs text-stone-400 dark:bg-stone-800 dark:text-stone-500">
            {isPendingSaving ? "Saving..." : "Saved"}
          </div>
          <button
              onClick={() => {
                startTransitionPublishing(async () => {
                  // await updatePostMetadata(formData, post.id, "published").then(
                  //     () => {
                  //       toast.success(
                  //           `Successfully ${
                  //               data.published ? "unpublished" : "published"
                  //           } your post.`,
                  //       );
                  //       setData((prev: any) => ({ ...prev, published: !prev.published }));
                  //     },
                  // );
                });
              }}
              className={cn(
                  "flex py-1 px-3 items-center justify-center space-x-2 rounded-lg border text-xs transition-all focus:outline-none",
                  isPendingPublishing
                      ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                      : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
              )}
              disabled={isPendingPublishing}
          >
            {isPendingPublishing ? (
                <p>loading...</p>
            ) : (
                <p>{data?.published ? "Published" : "Unpublished"}</p>
            )}
          </button>
        </div>
        <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-stone-700">
          {/*<UploadImage value={post?.thumbnail || ""} name="thumbnail" onChange={(value, name)=>{}} label="Post Thumbnail"/>*/}
          <input
              type="text"
              placeholder="Write your post title here"
              defaultValue={post?.name || ""}
              autoFocus
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="dark:placeholder-text-600 border-none px-0 font-cal text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
          />
          <TextareaAutosize
              placeholder="Write your post description here"
              defaultValue={post?.description || ""}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="dark:placeholder-text-600 w-full resize-none border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
          />
        </div>
        {editor && <EditorBubbleMenu editor={editor} />}
        <EditorContent editor={editor} />
        <Toaster/>
      </div>
  );
}
