"use server";
import { LoginValues } from "@/zod/login-form";
import { getTranslations } from "next-intl/server";
import { ActionResponse } from "../types";

export const loginAction = async (
  loginData: LoginValues,
): Promise<ActionResponse<LoginValues>> => {
  const t = await getTranslations("LoginPage");
  return {
    code: 401,
    success: false,
    message: t("invalidCredentials"),
    data: { ...loginData },
  };
};
