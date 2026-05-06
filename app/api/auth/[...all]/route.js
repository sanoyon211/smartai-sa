export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const GET = async (req) => {
    try {
        return await toNextJsHandler(auth).GET(req);
    } catch (e) {
        console.error("Better Auth GET Error:", e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
};

export const POST = async (req) => {
    try {
        return await toNextJsHandler(auth).POST(req);
    } catch (e) {
        console.error("Better Auth POST Error:", e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
};
