"use client";

import { createSite } from "@/shared/actions/site/set/create-site";
import { useCurrentUser } from "@/shared/lib/auth/hooks/use-current-user";
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
import { getErrorMessage } from "@/shared/utils/extract-error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import cn from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FirstSchema, SecondSchema } from "../model/schema";

type SecondProps = {
  embla: CarouselApi;
  setEmbla: (embla: CarouselApi) => void;
  firstValues: z.infer<typeof FirstSchema> | null;
};

export function Second({ embla, setEmbla, firstValues }: SecondProps) {
  const [isPending, startTransition] = useTransition();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const userId = useCurrentUser()?.id;

  const secondForm = useForm<z.infer<typeof SecondSchema>>({
    resolver: zodResolver(SecondSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
    },
  });

  const resetImage = () => {
    secondForm.setValue("image", null); // Сбрасываем значение поля image в форме от react-hook-form
    if (imageInputRef.current) imageInputRef.current.value = ""; // Сбрасываем значение input
    setPreviewUrl(null); // Сбрасываем URL превью
  };

  const onSubmit = (values: z.infer<typeof SecondSchema>) => {
    const { image, title, subtitle, description } = values;

    startTransition(async () => {
      if (
        image &&
        image instanceof File &&
        userId &&
        firstValues &&
        firstValues?.name &&
        firstValues?.url
      ) {
        try {
          const data = new FormData();
          data.set("file", image);

          const imageObject = {
            data,
            nameFolder: userId,
          };

          const { success, message } = await createSite(
            userId,
            firstValues?.name,
            title,
            subtitle,
            description,
            true,
            0,
            firstValues?.url,
            imageObject,
          );

          if (success) {
            toast.success("The site was successfully created");

            router.push(`list-sites/${firstValues?.url}`);

            secondForm.reset();
            resetImage();
          } else {
            toast.error(
              message + "Notice in file: src/features/slide-form/ui/second.tsx",
            );
          }
        } catch (e: unknown) {
          // Вывод ошибки в консоль
          console.error(getErrorMessage(e));

          // Вывод ошибки в toast
          toast.error(getErrorMessage(e));

          // Сброс формы
          secondForm.reset();
        }
      } else {
        toast.error(
          "The site was not created. Notice in file: src/features/slide-form/ui/second.tsx",
        );
      }
    });
  };

  const onPrevStep = () => {
    if (embla) {
      embla.scrollTo(0);
    }
  };

  return (
    <Form {...secondForm}>
      <form
        onSubmit={secondForm.handleSubmit(onSubmit)}
        className="min-w-[260px] max-w-[450px] px-1 pb-[20px] pt-1"
      >
        <div className="flex flex-col space-y-4">
          <FormField
            control={secondForm.control}
            name="image"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col items-center justify-center">
                <FormControl>
                  <div className="flex items-center justify-center space-x-5">
                    <input
                      id="image-site"
                      className="hidden"
                      ref={imageInputRef}
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          field.onChange(file);
                          const previewUrl = URL.createObjectURL(file);
                          setPreviewUrl(previewUrl); // Сохраняем URL превью в состояние
                        }
                      }}
                    />

                    <div className="h-[100px] w-[100px] overflow-hidden rounded-full">
                      {previewUrl ? (
                        <Image
                          width={100}
                          height={100}
                          src={previewUrl}
                          alt="image-icon"
                        />
                      ) : (
                        <Image
                          width={100}
                          height={100}
                          src="/img-icon.svg"
                          alt="image-icon"
                        />
                      )}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="image-site"
                        className={cn(
                          "btnw1 dark:btnd1 tw1 dark:td1 w-full cursor-pointer rounded-md p-2 text-center transition-all duration-300 ease-in-out hover:scale-[1.02]",
                          {
                            ["pointer-events-none text-neutral-400 contrast-50"]:
                              previewUrl,
                          },
                        )}
                      >
                        Додати зображення
                      </label>
                      <div
                        className={cn(
                          "btnw1 dark:btnd1 tw1 dark:td1 w-full cursor-pointer rounded-md p-2 text-center transition-all duration-300 ease-in-out hover:scale-[1.02]",
                          {
                            ["pointer-events-none text-neutral-400 contrast-50"]:
                              !previewUrl,
                          },
                        )}
                        onClick={resetImage}
                      >
                        Видалити зображення
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="!mt-[10px] text-[12px]" />
              </FormItem>
            )}
          />

          <FormField
            control={secondForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Заголовок"
                    type="text"
                    className="iw1 dark:id1 "
                  />
                </FormControl>
                <FormMessage className="!mt-[3px] text-[12px]" />
              </FormItem>
            )}
          />

          <FormField
            control={secondForm.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Підзаголовок"
                    type="text"
                    className="iw1 dark:id1 "
                  />
                </FormControl>
                <FormMessage className="!mt-[3px] text-[12px]" />
              </FormItem>
            )}
          />

          <FormField
            control={secondForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Про мене"
                    type="text"
                    className="iw1 dark:id1 "
                  />
                </FormControl>
                <FormMessage className="!mt-[3px] text-[12px]" />
              </FormItem>
            )}
          />

          <Button
            disabled={isPending}
            type="submit"
            className="btnw1 dark:btnd1 tw1 dark:td1 relative w-full transition-all duration-300 ease-in-out hover:scale-[1.02]"
          >
            {!isPending ? (
              "Створити сайт!"
            ) : (
              <span className="relative flex h-4 w-4">
                <span
                  className={cn(
                    "dark:bcd2 bcw2 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                  )}
                ></span>
                <span className="dark:bcd2 bcw2 relative inline-flex h-4 w-4 rounded-full"></span>
              </span>
            )}
          </Button>

          <Button
            size="sm"
            disabled={isPending}
            type="button"
            variant="link"
            className="tw2 dark:td2 m-auto h-5 p-0 font-normal"
            onClick={onPrevStep}
          >
            Повернутися на попередній крок
          </Button>
        </div>
      </form>
    </Form>
  );
}
