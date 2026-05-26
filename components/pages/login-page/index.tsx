"use client";
import { useEffect, useState, useTransition } from "react";
import LoginHeader from "./loginHeader";
import { useTheme } from "next-themes";
import styles from "./login.module.css";
import MainContent from "./mainContent";
import { useLocale, useTranslations } from "next-intl";
import LoginForm from "./loginForm";
import { useForm } from "react-hook-form";
import { LoginValues, loginFormSchema } from "@/zod/login-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GlobalModal from "@/components/ui/globalModal";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/link";
import { loginAction } from "@/actions/auth/login.action";
import { ActionResponse } from "@/actions/types";
import { useRouter } from "@/app/i18n/routing";
import { toast } from "sonner";
import GlobalLoader from "@/components/ui/global-loader";

export default function LoginIndex() {
  const { resolvedTheme } = useTheme();
  const t = useTranslations("LoginPage");
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const isDesktop = useIsDesktop();
  const router = useRouter();

  const locale = useLocale();
  const isRtl = locale === "ar";
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginFormSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, [isPending]);

  const isDark = mounted && resolvedTheme === "dark";

  function onLoginSubmit(data: LoginValues) {
    setGlobalError(null);

    startTransition(async () => {
      try {
        const response: ActionResponse = await loginAction(data);

        if (response.success && response.data?.redirectUrl) {
          toast.success(response.message);
          router.push(response.data?.redirectUrl);
        } else {
          setGlobalError(response.message);
          toast.error(globalError);
        }
      } catch (error) {
        console.error(error);
      }
    });
    form.setValues({
      email: "",
      password: "",
    });
  }

  if (isPending) {
    return (
      <GlobalLoader fullScreen isLoading={isPending} message={t("signingIn")} />
    );
  }

  return (
    <div
      className={styles.loginMainContainer}
      style={{
        backgroundColor: isDark ? "#001945" : "#f8f9fa",
        color: isDark ? "#ffffff" : "#123b81",
        backgroundImage: `linear-gradient(to right, ${
          isDark ? "#253e75" : "#dae2ff"
        } 1px, transparent 1px), linear-gradient(to bottom, ${
          isDark ? "#253e75" : "#dae2ff"
        } 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }}
    >
      <LoginHeader />
      <main className={styles.mainCardContainer}>
        <div
          className={styles.contentCard}
          style={{
            background: isDark
              ? "rgba(0, 25, 69, 0.85)"
              : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${isDark ? "#253e75" : "#E1E8F0"}`,
            borderTop: `4px solid #ffe088`,
          }}
        >
          <MainContent title={t("title")} subtitle={t("subtitle")} />
          <LoginForm
            emailLabel={t("emailLabel")}
            passwordLabel={t("passwordLabel")}
            submitBtnText={t("submitBtnText")}
            onLoginSubmit={onLoginSubmit}
            form={form}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isRtl={isRtl}
          />
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className={styles.forgetPasswordBtn}
          >
            {t("forgotPasswordBtn")}
          </button>
        </div>
      </main>
      <GlobalModal
        isDesktop={isDesktop}
        header={t("forgotPasswordHeader")}
        description={t("forgotPasswordDescription")}
        isRTL={isRtl}
        open={modalOpen}
        onOpenChange={setModalOpen}
        side="bottom"
      >
        <Link
          href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER}`}
          className={styles.sendAdminBtn}
        >
          <IoLogoWhatsapp className="size-4" />
          {t("sendAdminBtn")}
        </Link>
      </GlobalModal>
    </div>
  );
}
