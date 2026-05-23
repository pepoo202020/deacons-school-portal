'use client'
import Image from 'next/image';
import styles from './splash-screen.module.css'
import logoImg from '@/public/logo.png'
import GlobalLoader from '@/components/ui/global-loader';
import { useRouter } from "@/app/i18n/routing"; 
import { useEffect, useState } from 'react';
import { checkAuthenticate } from '@/utils/check-authenticate';
import { useTranslations } from 'next-intl';

interface ILoadingTextStates {
    state: string
    message: string
}



export default function SplashScreen() {
    const t = useTranslations('SplashScreen');
    const router = useRouter()
    const loadingTexts: ILoadingTextStates[] = [
    {state: 'initial', message: t('initializeMessage')},
    {state: 'check', message: t('checkMessage')},
    {state: 'redirect', message:t('redirectMessage')}
]
    const [loadingState, setLoadingState]= useState<ILoadingTextStates>(loadingTexts[0])

    

    useEffect(() => {
        const initializeApp = async () => {
            const minimumDelay = new Promise((resolve) => setTimeout(resolve, 5000));
            setLoadingState(loadingTexts[1]);

            const [, isLoggedIn] = await Promise.all([
                minimumDelay,
                checkAuthenticate()
            ]);

            setLoadingState(loadingTexts[2]);

            if (isLoggedIn) {
                router.push("/dashboard");
            } else {
                router.push('/login');
            }
        };

        // Handle Back-Forward Cache (BFcache) restore
        const handlePageShow = (event: PageTransitionEvent) => {
            if (event.persisted) {
                window.location.reload();
            }
        };

        window.addEventListener('pageshow', handlePageShow);
        initializeApp();

        return () => {
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, [router]);


    return (
        <section className={styles.splashScreenBody}>
            <div className={styles.splashBg}/>
            <div className={styles.mainContainer}>
                {/* logo */}
                <div className={styles.logoContainer}>
                    <Image
                        src={logoImg}
                        alt='Coptic Deacons School Logo'
                        fill
                        className={styles.logoImg}
                    />
                </div>
                {/* title - subtitle */}
                <div className={styles.titleSubtitleContainer}>
                    <h2 className={styles.title}>
                        {t('title')}
                    </h2>
                    <h2 className={styles.subtitle}>
                       {t('subtitle')}
                    </h2>
                </div>
                

                {/* verse */}
                <div className={styles.verseContainer}>
                    <p className={styles.verseContent}>
                        &quot;{t('verseText')}&quot;
                    </p>
                    <span className={styles.verseNumber}>
                        {t('verseNumber')}
                    </span>
                </div>

                {/* loader */}
                <div className={styles.loaderContainer}>
                    <GlobalLoader message={loadingState.message} isLoading />
                </div>
                
            </div>
            {/* footer */}
                <div className={styles.footerContainer}>
                    <span className={styles.footerChurch}>
                        {t('footerChurch')}
                    </span>
                    <span className={styles.footerVersion}>
                        {t('footerVersion')}
                    </span>
                </div>
        </section>
    );
}