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

import { createPage } from "@/shared/actions/page/set/create-page";
import { getSiteByUrl } from "@/shared/actions/site/get/get-site-by-url";
import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  url: z.string().min(2).max(50),
});

export function CreatePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const pathName = usePathname();

  const { setIsOpenDrawerTools } = useDrawerToolsStore();

  const onSubmit = async ({ title, url }: z.infer<typeof formSchema>) => {
    const siteId = (await getSiteByUrl(pathName)).data?.id;

    if (!siteId) {
      toast.error(
        "Error creating page, happen in file: src/features/popover-tools/ui/page-tools/modal/create-page.tsx",
      );
      return;
    }

    const { success, data } = await createPage(siteId, title, url);

    success
      ? toast.success("Page created")
      : toast.error(
          "Error creating page, happen in file: src/features/popover-tools/ui/page-tools/modal/create-page.tsx",
        );

    form.reset();
  };

  return (
    <div className="w-[100%]">
      <div className="text-center">Create new page</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center space-y-8 p-[25px] "
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col items-center justify-center">
                <FormControl>
                  <Input placeholder="name of the new page" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col items-center justify-center">
                <FormControl>
                  <Input placeholder="path in the address bar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            onClick={() => {
              setIsOpenDrawerTools(false);
            }}
          >
            add new page
          </Button>
        </form>
      </Form>
    </div>
  );
}
