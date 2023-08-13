import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import AuthProvider from "@/app/(landing)/components/AuthProvider";
import LogOutButton from "@/app/(landing)/components/LogOutButton";
import {redirect} from "next/navigation";
import {Suspense} from "react";


const Navbar = async () => {
    let session = null;
    try{
        session = await getCurrentUser();
    }catch (e) {
        redirect('/')
    }


    return (
        <nav className='justify-between flex items-center container py-5'>
            <div className="flex justify-between w-full mx-auto">
                <div className=''>
                    <Link href='/'>
                        <Image
                            src='/likho.svg'
                            width={150}
                            height={40}
                            alt='logo'
                        />
                    </Link>

                </div>

                <div className='flex items-center gap-2 text-sm'>
                    <Suspense fallback={<p>...</p>}>
                    {session?.user ? (

                        <>
                            {session?.user?.image &&
                                <Image src={session?.user?.image} alt={session.user.name} width={25} height={25}
                                     className="rounded-full"/>}
                            <div className={'leading-[10px] pt-1'}>
                                <p className="uppercase">{session.user.name}</p>
                                <LogOutButton />
                            </div>
                        </>
                    ) : (
                            <AuthProvider />
                    )}
                    </Suspense>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;