import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
	// if (req.nextUrl.pathname === '/') {
	// 	const token = await getToken({ req, secret: process.env.AUTH_SECRET });
	// 	console.log(token);
	// 	if (!token) {
	// 		return NextResponse.redirect(new URL('/login', req.url));
	// 	}
	// }
	return NextResponse.next();
}

export const config = {
	matcher: ['/', '/:id', '/api/:path*', '/login', '/register'],
};
