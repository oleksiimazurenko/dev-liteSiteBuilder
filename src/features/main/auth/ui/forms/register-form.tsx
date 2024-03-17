"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CardWrapper } from "@/features/main/auth/ui/card-wrapper/card-wrapper";
import { FormError } from "@/features/main/auth/ui/response-status/form-error";
import { FormSuccess } from "@/features/main/auth/ui/response-status/form-success";
import { useDictionaryStore } from "@/shared/dictionary/store/dictionary-store";
import { register } from "@/shared/lib/auth/actions/set/register";
import { getRegisterSchema } from "@/shared/lib/auth/schemas";
import { MainPageTranslations } from "@/shared/types/dectionary";
import { GeneralPanelOptions } from "@/shared/types/types";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

type RegisterFormProps = {
  setGeneralPanel: Dispatch<SetStateAction<GeneralPanelOptions>>;
};

export const RegisterForm = ({ setGeneralPanel }: RegisterFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const { dictionary, language } = useDictionaryStore();
  const { main_page } = dictionary as unknown as MainPageTranslations;

  const RegisterSchema = getRegisterSchema(main_page?.register_panel);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper className="py-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={main_page?.register_panel?.name_placeholder}
                      className="input-white dark:input-dark "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={main_page?.register_panel?.email_placeholder}
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
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      className="input-white dark:input-dark "
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="button-white dark:button-dark w-full text-white transition-all duration-300 ease-in-out hover:scale-[1.02] dark:text-black"
          >
            {main_page?.register_panel?.register_button}
          </Button>
        </form>
      </Form>
      <Button
        variant="link"
        className="m-auto mt-3 h-5 w-full p-0 font-normal text-neutral-500 dark:text-neutral-500"
        size="sm"
        onClick={() => setGeneralPanel("login")}
      >
        {main_page?.register_panel?.already_have_an_account}
      </Button>
    </CardWrapper>
  );
};