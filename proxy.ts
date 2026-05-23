import createMiddleware from 'next-intl/middleware';
import { routing } from '@/app/i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // تفعيل الـ Middleware على جميع المسارات ما عدا ملفات النظام والصور
  matcher: ['/', '/(ar|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};