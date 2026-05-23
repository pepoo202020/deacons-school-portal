"use client"; 

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/app/i18n/routing"; 
import { Globe } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: 'ar' | 'en') => {
    if (newLocale === locale) return; 

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          disabled={isPending}
          className="relative text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => switchLanguage('ar')}
          className={`cursor-pointer ${locale === 'ar' ? 'font-bold text-primary' : ''}`}
        >
          العربية
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => switchLanguage('en')}
          className={`cursor-pointer ${locale === 'en' ? 'font-bold text-primary' : ''}`}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}