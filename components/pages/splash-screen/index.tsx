import Image from 'next/image';
import styles from './splash-screen.module.css'
import logoImg from '@/public/logo.png'
import GlobalLoader from '@/components/ui/global-loader';


export default function SplashScreen() {
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
                    <GlobalLoader  />
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