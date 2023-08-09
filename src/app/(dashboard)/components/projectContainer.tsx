import Image from "next/image";
import {MoreVertical, Sun} from "lucide-react";
import {getCurrentUser} from "@/lib/session";
import { headers } from "next/headers";


const ProjectContainer = async ({ children }: { children: React.ReactNode }) => {
    const session = await getCurrentUser();
    const headersList = headers();
    const pathname = headersList.get("x-invoke-path") || "";
    return <div className="flex-1">
        <div className="flex justify-between px-5 py-2">
            <div></div>
            <div className="flex items-center gap-3">
                {/*{pathname && !pathname.endsWith('playground') && <>*/}
                {/*    <p className="text-xs uppercase font-light text-stone-400 "><b>Project:</b> First Project</p>*/}
                {/*    <p className="text-xs uppercase font-light text-stone-400 "><b>Page:</b> Current Page</p>*/}
                {/*</>}*/}
            </div>
            <div className="flex items-center gap-2">
                <Sun width={15} className="text-stone-400"/>
                <p className="flex items-center text-xs text-stone-400 gap-1">
                    {session?.user && <Image
                        src={session?.user?.image || ""}
                        alt={session.user.name}
                        className="dark:invert rounded-full bg-gray-300"
                        width={15}
                        height={15}
                        priority
                    />}
                    {session?.user?.name}</p>
                <MoreVertical width={15} className="text-stone-400"/>
            </div>
        </div>
        <div className="p-5 pt-0">
            { children }
        </div>
    </div>
}

export default ProjectContainer;