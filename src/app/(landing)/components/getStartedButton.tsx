"use client"

import Link from "next/link";
import {signIn} from "next-auth/react";

const GetStartedButton = () => {
    return (
        <button onClick={() => signIn('google',{callbackUrl: '/playground'})} className="bg-black text-white rounded-full px-5 py-1 text-sm flex gap-2 items-center mt-5 bg-gradient-to-r from-red-500 to-orange-500" >Get Started</button>
    )
}
export default GetStartedButton;