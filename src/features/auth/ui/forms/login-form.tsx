"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CardWrapper } from "@/features/auth/ui/card-wrapper/card-wrapper";
import { FormError } from "@/features/auth/ui/response-status/form-error";
import { FormSuccess } from "@/features/auth/ui/response-status/form-success";
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

import { getLoginSchema } from "@/shared/lib/auth/schemas";
import { useDictionaryStore } from "@/shared/store/dictionary-store";
import { MainPageTranslations } from "@/shared/types/dectionary";
import { GeneralPanelOptions } from "@/shared/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";

import { LangSwitchProps } from "@/shared/types/props";
import cn from "classnames";
type LoginFormProps = {
  setGeneralPanel: Dispatch<SetStateAction<GeneralPanelOptions>>;
  valueAccordion: string;
  setValueAccordion: Dispatch<SetStateAction<string>>;
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: LangSwitchProps) => JSX.Element;
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

  const { dictionary, language } = useDictionaryStore();
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
            className={cn("relative h-[20px] rounded-sm p-0 text-neutral-500", {
              ["[&>svg]:absolute [&>svg]:left-[-16px] [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:rotate-180 [&>svg]:transform [&>svg]:data-[state=open]:!rotate-0 [&>svg]:dark:stroke-neutral-200/50 md:[&>svg]:rotate-0 md:[&>svg]:data-[state=open]:!rotate-180"]:
                true,
            })}
          >
            {/* <Skeleton
              className={cn(
                "login-mask absolute left-[-20px] top-1/2 h-full w-[300px] -translate-y-1/2 transform rounded-b-lg rounded-t-none bg-neutral-600/60 md:bg-neutral-600/30",
              )}
            /> */}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col items-center justify-center space-y-2 p-0">
            <div className="flex items-center justify-center space-x-2">
              <LangSwitch className="md:hidden" />
              <ThemeSwitch className="md:hidden" />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full px-1 pb-[20px] pt-1 text-neutral-500"
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
                              className="border-none bg-gradient-to-r from-neutral-500 to-zinc-600 text-neutral-200 placeholder:text-neutral-400 dark:from-neutral-200 dark:to-zinc-300 dark:text-slate-400 dark:placeholder:text-slate-400"
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
                                className="border-none bg-gradient-to-r from-neutral-500 to-zinc-600 text-neutral-200 placeholder:text-neutral-400 dark:from-neutral-200 dark:to-zinc-300 dark:text-slate-400 dark:placeholder:text-slate-400"
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
                                className="border-none bg-gradient-to-r from-neutral-500 to-zinc-600 text-neutral-200 placeholder:text-neutral-400 dark:from-neutral-200 dark:to-zinc-300 dark:text-slate-400 dark:placeholder:text-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        disabled={isPending}
                        type="submit"
                        className="bg-color-w3 dark:bg-color-d3 text-color-w1 dark:text-color-d1 w-full transition-colors duration-300 ease-in-out "
                      >
                        {showTwoFactor
                          ? main_page?.login_panel?.confirm
                          : main_page?.login_panel?.login_button}
                      </Button>

                      <Button
                        size="sm"
                        variant="link"
                        className="text-color-w2 dark:text-color-d2 m-auto h-5 p-0 font-normal"
                        onClick={() => setGeneralPanel("forgot-password")}
                      >
                        {main_page?.login_panel?.forgot_password}
                      </Button>

                      <Button
                        variant="link"
                        className="text-color-w2 dark:text-color-d2 m-auto h-5 p-0 font-normal"
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
