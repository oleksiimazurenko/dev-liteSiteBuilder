"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CardWrapper } from "@/features/auth/ui/card-wrapper/card-wrapper";
import { FormError } from "@/features/auth/ui/response-status/form-error";
import { FormSuccess } from "@/features/auth/ui/response-status/form-success";
import { reset } from "@/shared/lib/auth/actions/set/reset";
import { getResetSchema } from "@/shared/lib/auth/schemas";
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

type ResetFormProps = {
  setGeneralPanel: Dispatch<SetStateAction<GeneralPanelOptions>>;
};

export const ResetForm = ({ setGeneralPanel }: ResetFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const { dictionary, language } = useDictionaryStore();
  const { main_page } = dictionary as unknown as MainPageTranslations;

  const ResetSchema = getResetSchema(main_page?.reset_panel);

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper className="py-5">
      <div className="flex w-full flex-col">
        <Button
          variant="link"
          className="text-color-w2 dark:text-color-d2 m-auto h-5 p-0 font-normal"
          size="sm"
          onClick={() => setGeneralPanel("login")}
        >
          {main_page?.reset_panel?.back_login}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={main_page?.reset_panel?.email_placeholder}
                      type="email"
                      className="border-none bg-neutral-200"
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
            {main_page?.reset_panel?.reset_button}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
