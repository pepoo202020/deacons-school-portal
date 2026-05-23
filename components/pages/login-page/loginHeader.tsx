import { ThemeSwitcher } from '@/components/ui/themeSwitcher';
import styles from './login.module.css'
import LanguageSwitcher from '@/components/ui/languageSwitcher';
export default function LoginHeader() {
    return (
        <header className={styles.headerContainer}>
            {/* language switcher */}
            <LanguageSwitcher />
            <ThemeSwitcher />
        </header>
    );
}