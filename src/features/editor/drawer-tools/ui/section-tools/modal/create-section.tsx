"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

import { createSection } from "@/shared/actions/section/set/create-section";
import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { useRefreshGsapToken } from "@/shared/store/refresh-gsap-status";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export function CreateSection() {
  const [isPending, startTransition] = useTransition();
  const { setRefreshGsapToken } = useRefreshGsapToken();
  const pathName = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { setIsOpenDrawerTools } = useDrawerToolsStore();

  async function onSubmit({ name }: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { success, error } = await createSection({
        url: pathName,
        name,
        rPath: pathName,
      });
      success && toast.success("Section created");
      !success && toast.error(error);
    });
    setRefreshGsapToken(Date.now());
    form.reset();
    setIsOpenDrawerTools(false);
  }

  return (
    <div className="w-full max-w-[300px] p-4">
      <div className="text-primary text-center">Create new section</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center space-y-8 pb-[15px] pt-[25px]"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col items-center justify-center ">
                <FormControl>
                  <Input
                    placeholder="name of the new section"
                    {...field}
                    className="input-primary text-center"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="button-primary" disabled={isPending}>
            add new section
          </Button>
        </form>
      </Form>
    </div>
  );
}
