import Editor from "@/app/(dashboard)/components/editor";

const data = {
    id: "cku0q2q2h0000h1tj5q1q2q2h",
    title: "Hello World",
    description: "This is a description",
    content: "This is a content",
    createdAt: "2021-06-01T14:00:00.000Z",
    updatedAt: "2021-06-01T14:00:00.000Z",
    userId: "cku0q2q2h0000h1tj5q1q2q2h",
    siteId: "cku0q2q2h0000h1tj5q1q2q2h",
    site: {
        subdomain: "likho-playground",
    }
}

export default function Page() {
  return (
        <div className="editor">
            {/*post={data}*/}
            <Editor  />
        </div>
  )
}
