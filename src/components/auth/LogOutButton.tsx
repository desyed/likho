"use client"
import { signOut } from 'next-auth/react';
const LogOutButton = () => {

    const handleLogOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    return (
        <span
            className='cursor-pointer hover:text-black dark:hover:text-white text-gray-500 text-xs font-light'
            onClick={handleLogOut}
        >
            Log Out
        </span>
    );
}
export default LogOutButton;