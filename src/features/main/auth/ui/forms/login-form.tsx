"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CardWrapper } from "@/features/main/auth/ui/card-wrapper/card-wrapper";
import { FormError } from "@/features/main/auth/ui/response-status/form-error";
import { FormSuccess } from "@/features/main/auth/ui/response-status/form-success";
import { login } from "@/shared/lib/auth/actions/set/login";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

import { useDictionaryStore } from "@/shared/dictionary/store/dictionary-store";
import { getLoginSchema } from "@/shared/lib/auth/schemas";
import { MainPageTranslations } from "@/shared/types/dectionary";
import { GeneralPanelOptions } from "@/shared/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";

import { LangSwitchProps, ThemeSwitchProps } from "@/shared/types/props";
import cn from "classnames";
type LoginFormProps = {
  setGeneralPanel: Dispatch<SetStateAction<GeneralPanelOptions>>;
  valueAccordion: string;
  setValueAccordion: Dispatch<SetStateAction<string>>;
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: ThemeSwitchProps) => JSX.Element;
};

export const LoginForm = ({
  setGeneralPanel,
  valueAccordion,
  setValueAccordion,
  LangSwitch,
  ThemeSwitch,
}: LoginFormProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const { dictionary } = useDictionaryStore();
  const { main_page } = dictionary as unknown as MainPageTranslations;

  const LoginSchema = getLoginSchema(main_page?.login_panel);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <CardWrapper showSocial className="pb-5 pt-0 md:pb-0 md:pt-5">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={valueAccordion}
        onValueChange={setValueAccordion}
      >
        <AccordionItem value="item-1" className="!border-none">
          <AccordionTrigger
            className={cn("relative h-[20px] rounded-sm p-0", {
              ["[&>svg]:absolute [&>svg]:left-[-16px] [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:rotate-180 [&>svg]:transform [&>svg]:stroke-neutral-200 [&>svg]:data-[state=open]:!rotate-0 [&>svg]:dark:stroke-neutral-200/50 md:[&>svg]:rotate-0 md:[&>svg]:data-[state=open]:!rotate-180"]:
                true,
            })}
          ></AccordionTrigger>
          <AccordionContent className="flex flex-col items-center justify-center space-y-2 p-0">
            <div className="flex items-center justify-center space-x-2">
              <LangSwitch className="md:hidden" />
              <ThemeSwitch className="md:hidden" />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full px-1 pb-[20px] pt-1"
              >
                <div className="flex flex-col space-y-4">
                  {showTwoFactor && (
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="123456"
                              className="input-white dark:input-dark "
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {!showTwoFactor && (
                    <>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder={
                                  main_page?.login_panel?.email_placeholder
                                }
                                type="email"
                                className="input-white dark:input-dark "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="******"
                                type="password"
                                className="input-white dark:input-dark "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        disabled={isPending}
                        type="submit"
                        className="button-white dark:button-dark w-full text-white transition-all duration-300 ease-in-out hover:scale-[1.02] dark:text-black"
                      >
                        {showTwoFactor
                          ? main_page?.login_panel?.confirm
                          : main_page?.login_panel?.login_button}
                      </Button>

                      <Button
                        size="sm"
                        variant="link"
                        className="m-auto h-5 p-0 font-normal text-neutral-500"
                        onClick={() => setGeneralPanel("forgot-password")}
                      >
                        {main_page?.login_panel?.forgot_password}
                      </Button>

                      <Button
                        variant="link"
                        className="m-auto h-5 p-0 font-normal text-neutral-500"
                        size="sm"
                        onClick={() => setGeneralPanel("register")}
                      >
                        {main_page?.login_panel?.dont_have_an_account}
                      </Button>
                    </>
                  )}
                </div>
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardWrapper>
  );
};
