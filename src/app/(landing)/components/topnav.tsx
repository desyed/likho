import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import AuthProvider from "@/components/auth/AuthProvider";
import LogOutButton from "@/components/auth/LogOutButton";


const Navbar = async () => {
    const session = await getCurrentUser();
    console.log(session);

    return (
        <nav className='justify-between flex items-center px-10 py-5'>
            <div className='flex-1 flexStart gap-10'>
                <Link href='/'>
                    <Image
                        src='/likho.svg'
                        width={100}
                        height={24}
                        alt='logo'
                    />
                </Link>

            </div>

            <div className='flex items-center gap-2 text-sm'>
                {session?.user ? (
                    <>
                        {session?.user?.image &&
                            <img src={session?.user?.image} alt={session.user.name} width={25} height={25}
                                   className="rounded-full"/>}
                       <div className={'leading-[10px] pt-1'}>
                           <p className="uppercase">{session.user.name}</p>
                           <LogOutButton />
                       </div>
                    </>
                ) : (
                    <AuthProvider />
                )}
            </div>
        </nav>
    );
};

export default Navbar;