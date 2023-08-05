import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import AuthProvider from "@/components/auth/AuthProvider";


const Navbar = async () => {
    const session = await getCurrentUser();
    console.log(session);

    return (
        <nav className='flexBetween navbar'>
            <div className='flex-1 flexStart gap-10'>
                <Link href='/'>
                    <Image
                        src='/likho.svg'
                        width={116}
                        height={43}
                        alt='logo'
                    />
                </Link>

            </div>

            <div className='flexCenter gap-4'>
                {!session?.user ? (
                    <>
                        {session?.user?.image &&
                            <img src={session?.user?.image} alt={session.user.name} width={40} height={40}
                                   className="rounded-full"/>}
                       <div>you are logged in</div>
                    </>
                ) : (
                    <AuthProvider />
                )}
            </div>
        </nav>
    );
};

export default Navbar;