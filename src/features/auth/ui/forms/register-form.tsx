"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CardWrapper } from "@/features/auth/ui/card-wrapper/card-wrapper";
import { FormError } from "@/features/auth/ui/response-status/form-error";
import { FormSuccess } from "@/features/auth/ui/response-status/form-success";
import { register } from "@/shared/lib/auth/actions/set/register";
import { useDictionaryStore } from "@/shared/store/dictionary-store";
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
import { getRegisterSchema } from "../../../../shared/lib/auth/schemas";

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
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={main_page?.register_panel?.name_placeholder}
                      className="border-none bg-neutral-200"
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
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={main_page?.register_panel?.email_placeholder}
                      type="email"
                      className="border-none bg-neutral-200"
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
                      className="border-none bg-neutral-200"
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
            className="w-full bg-neutral-200 text-slate-950 hover:bg-neutral-300 hover:text-slate-950"
          >
            {main_page?.register_panel?.register_button}
          </Button>
        </form>
      </Form>
      <Button
        variant="link"
        className="text-color-w2 dark:text-color-d2 mt-[10px] h-5 w-full p-0 font-normal"
        size="sm"
        onClick={() => setGeneralPanel("login")}
      >
        {main_page?.register_panel?.already_have_an_account}
      </Button>
    </CardWrapper>
  );
};
