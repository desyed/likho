"use client"

import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import {fetchToken} from "@/lib/actions";

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
                    <button key={i} onClick={() => signIn(provider?.id)} >Sign In</button>
                ))}
            </div>
        )
    }
}

export default AuthProviders