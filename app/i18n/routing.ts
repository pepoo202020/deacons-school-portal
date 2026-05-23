import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'ar', // اجعل العربية هي اللغة الافتراضية إذا أردت
});
 
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);