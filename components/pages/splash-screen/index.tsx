'use client'
import Image from 'next/image';
import styles from './splash-screen.module.css'
import logoImg from '@/public/logo.png'
import GlobalLoader from '@/components/ui/global-loader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAuthenticate } from '@/utils/check-authenticate';

interface ILoadingTextStates {
    state: string
    message: string
}

const loadingTexts: ILoadingTextStates[] = [
    {state: 'initial', message: 'Initializing System...'},
    {state: 'check', message: 'Checking credentials...'},
    {state: 'redirect', message:"Redirecting..."}
]

export default function SplashScreen() {
    const router = useRouter()
    const [loadingState, setLoadingState]= useState<ILoadingTextStates>(loadingTexts[0])

    useEffect(() => {
        const initializeApp = async () => {
            const minimumDelay = new Promise((resolve) => setTimeout(resolve, 5000));
            setLoadingState(loadingTexts[1]);

            const [_, isLoggedIn] = await Promise.all([
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
                {/* title */}
                <h2 className={styles.title}>
                    Management System
                </h2>

                {/* verse */}
                <div className={styles.verseContainer}>
                    <p className={styles.verseContent}>
                        &quot;Let all things be done decently and in order.&quot;
                    </p>
                    <span className={styles.verseNumber}>
                        1 Corinthians 14:40
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
                        St. Abader &amp; St. Ereny Coptic Orthodox Church
                    </span>
                    <span className={styles.footerVersion}>
                        v1.0.0
                    </span>
                </div>
        </section>
    );
}