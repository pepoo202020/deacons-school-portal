"use client";
import styles from "./login.module.css";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginValues } from "@/zod/login-form";
import { Dispatch, SetStateAction } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocale } from "next-intl";

interface ILoginFormProps {
  emailLabel: string;
  passwordLabel: string;
  rememberLabel: string;
  submitBtnText: string;
  onLoginSubmit: (data: LoginValues) => void;
  form: UseFormReturn<LoginValues>;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  showPassword: boolean;
  isRtl: boolean;
}

export default function LoginForm({
  emailLabel,
  passwordLabel,
  rememberLabel,
  submitBtnText,
  onLoginSubmit,
  form,
  showPassword,
  setShowPassword,
  isRtl,
}: ILoginFormProps) {
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onLoginSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className={styles.formField}>
                <FieldLabel
                  className={styles.formFieldLabel}
                  htmlFor="form-rhf-demo-title"
                >
                  {emailLabel}
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="deacon@diocese.org"
                  autoComplete="off"
                  className={styles.formFieldInput}
                  type="email"
                />
              </div>

              {fieldState.invalid && (
                <FieldError
                  className={styles.formFieldError}
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className={styles.formField}>
                <FieldLabel
                  className={styles.formFieldLabel}
                  htmlFor="form-rhf-demo-title"
                >
                  {passwordLabel}
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="••••••••••••••••••••"
                  autoComplete="off"
                  className={`${styles.formFieldInput} ${isRtl ? "pl-8!" : "pr-8!"}`}
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  className={`absolute ${isRtl ? "left-3!" : "right-3!"} top-1/2 -translate-y-1/2 transition-colors w-5! bg-transparent!`}
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {fieldState.invalid && (
                <FieldError
                  className={styles.formFieldError}
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="rememberMe"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} orientation="horizontal">
              <div className="flex items-center justify-start w-full gap-2">
                <Checkbox
                  id="terms-checkbox-invalid"
                  name="terms-checkbox-invalid"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid
                  className="rounded! w-4! h-4! text-white! border-primary! focus:ring-0! cursor-pointer"
                  style={{ accentColor: "#003b93" }}
                />
                <FieldLabel
                  htmlFor="terms-checkbox-invalid"
                  className="cursor-pointer! text-base"
                >
                  {rememberLabel}
                </FieldLabel>
              </div>
            </Field>
          )}
        />
      </FieldGroup>
      <button
        type="submit"
        className={styles.formSubmitBtn}
        disabled={form.formState.isSubmitting}
      >
        <LogIn className="size-4" />
        {submitBtnText}
      </button>
    </form>
  );
}
