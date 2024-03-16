"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import cn from "classnames";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";

import { FormError, FormSuccess, UserInfo } from "@/features/auth";
import { settings } from "@/shared/lib/auth/actions/set/settings";
import { useCurrentUser } from "@/shared/lib/auth/hooks/use-current-user";
import { SettingsSchema } from "@/shared/lib/auth/schemas/index";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Switch } from "@/shared/ui/switch";

type SettingAccordionProps = {
  className?: string;
};

export function SettingAccordion({ className }: SettingAccordionProps) {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };
  return (
    <Accordion
      type="single"
      collapsible
      className={cn("w-full space-y-3 p-0", {
        [className as string]: className,
      })}
    >
      <AccordionItem
        value="item-1"
        className="flex flex-col items-center justify-center border-none p-0"
      >
        <AccordionTrigger className="rounded-lg border px-1 py-1 text-center text-neutral-500 !no-underline dark:border-neutral-500 dark:text-neutral-950 [&>svg]:ml-2 [&>svg]:stroke-black [&>svg]:dark:stroke-white">
          <Badge
            variant="outline"
            className="rounded-md bg-neutral-200 dark:text-black"
          >
            Info profil
          </Badge>
        </AccordionTrigger>
        <AccordionContent className="mt-[10px]">
          <UserInfo user={user} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="item-2"
        className="flex flex-col items-center justify-center border-none p-0"
      >
        <AccordionTrigger className="rounded-lg border px-1 py-1 text-center text-neutral-500 !no-underline dark:border-neutral-500 dark:text-neutral-950 [&>svg]:ml-2 [&>svg]:stroke-black [&>svg]:dark:stroke-white">
          <Badge
            variant="outline"
            className="rounded-md bg-neutral-200 dark:text-black"
          >
            Settings
          </Badge>
        </AccordionTrigger>
        <AccordionContent className="mt-[10px]">
          <Card className="w-[300px] border-none bg-transparent shadow-none md:w-[500px]">
            <CardContent>
              <ScrollArea>
                <Form {...form}>
                  <form
                    className="space-y-6 p-1"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={
                                  user?.name ? user?.name : undefined
                                }
                                disabled={isPending}
                                className="input-white dark:input-dark "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {user?.isOAuth === false && (
                        <>
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="john.doe@example.com"
                                    type="email"
                                    disabled={isPending}
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="******"
                                    type="password"
                                    disabled={isPending}
                                    className="input-white dark:input-dark "
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="******"
                                    type="password"
                                    disabled={isPending}
                                    className="input-white dark:input-dark "
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                      {user?.isOAuth === false && (
                        <FormField
                          control={form.control}
                          name="isTwoFactorEnabled"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>Two Factor Authentication</FormLabel>
                                <FormDescription>
                                  Enable two factor authentication for your
                                  account
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  disabled={isPending}
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                      disabled={isPending}
                      type="submit"
                      className="button-white dark:button-dark shadow-xl transition-all hover:scale-105 dark:border-none"
                    >
                      Save
                    </Button>
                  </form>
                </Form>
              </ScrollArea>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
