import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {getServerSession} from "next-auth/next";
import {SessionInterface} from "@/lib/common.types";
import {authOptions} from "@/lib/session";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
    const {user} = await getServerSession(authOptions) as SessionInterface;

    return NextResponse.json({ user }, { status: 200 });
}