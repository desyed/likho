import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import AuthProvider from "@/app/(landing)/components/AuthProvider";
import LogOutButton from "@/app/(landing)/components/LogOutButton";


const Navbar = async () => {
    const session = await getCurrentUser();

    return (
        <nav className='justify-between flex items-center px-10 py-5'>
            <div className="container flex justify-between mx-auto">
                <div className='flex-1 flexStart gap-10'>
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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;