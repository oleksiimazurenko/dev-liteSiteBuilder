"use client";

import { Button } from "@/shared/ui/button";
import { CarouselApi } from "@/shared/ui/carousel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FirstSchema } from "../model/schema";

type FirstProps = {
	embla: CarouselApi;
};


export function First({ embla }: FirstProps) {
  const [formValues, setFormValues] = useState<z.infer<
    typeof FirstSchema
  > | null>(null);

  const firstForm = useForm<z.infer<typeof FirstSchema>>({
    resolver: zodResolver(FirstSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const onNextStep = (values: z.infer<typeof FirstSchema>) => {
    if (embla) {
      setFormValues(values);
      embla.scrollTo(1);
    }
  };
  return (
    <Form {...firstForm}>
      <form
        onSubmit={firstForm.handleSubmit(onNextStep)}
        className="w-full px-1 pb-[20px] pt-1"
      >
        <div className="flex flex-col space-y-4">
          <FormField
            control={firstForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ваша назва сайту"
                    type="text"
                    className="iw1 dark:id1 "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={firstForm.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ваше посилання на сайт"
                    type="text"
                    className="iw1 dark:id1 "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="btnw1 dark:btnd1 tw1 dark:td1 w-full transition-all duration-300 ease-in-out hover:scale-[1.02]"
          >
            Наступний крок
          </Button>
        </div>
      </form>
    </Form>
  );
}
