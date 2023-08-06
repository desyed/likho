"use client"

import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import {fetchToken} from "@/lib/actions";
import {User2} from "lucide-react";

// import Button from './Button';

type Provider = {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;


const AuthProviders = () => {
    const [providers, setProviders] = useState<Providers | null>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            const token = await fetchToken();
            console.log('token',token)
            setProviders(res);
        }



        fetchProviders();
    }, []);


    if (providers) {
        return (
            <div>
                {Object.values(providers).map((provider: Provider, i) => (
                    <button className="bg-black text-white rounded px-5 py-1 text-sm flex gap-2 items-center" key={i} onClick={() => signIn(provider?.id,{callbackUrl: '/playground'})} ><User2 width={15} />Sign In</button>
                ))}
            </div>
        )
    }
}

export default AuthProviders