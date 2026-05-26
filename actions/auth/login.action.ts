"use server";
import { LoginValues } from "@/zod/login-form";
import { getTranslations } from "next-intl/server";
import { ActionResponse } from "../types";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const loginAction = async (
  loginData: LoginValues,
): Promise<ActionResponse> => {
  const t = await getTranslations("LoginPage");

  const { email, password } = loginData;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      code: 200,
      message: t("loginSuccess"),
      success: true,
      data: { redirectUrl: "/dashboard" },
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            code: 401,
            success: false,
            message: t("invalidCredentials"),
          };
        default:
          return { code: 500, success: false, message: t("serverError") };
      }
    }
    throw error;
  }
};
