import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/session";
import {SessionInterface} from "@/lib/common.types";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret, raw: true });
    const res = await getServerSession(authOptions) as SessionInterface;

    return NextResponse.json({ token, ...res?.user }, { status: 200 });
}