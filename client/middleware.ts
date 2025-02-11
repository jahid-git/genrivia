import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
	if (req.nextUrl.pathname === '/') {
		const token = await getToken({ req, secret: process.env.AUTH_SECRET });
		if (!token) {
			return NextResponse.redirect(new URL('/login', 'https://genrivia.vercel.app'));
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/', '/:id', '/api/:path*', '/login', '/register'],
};
