"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";

import { uploadImage } from "@/shared/actions/user/set/upload-image";
import { Button } from "@/shared/ui/button";
import { getErrorMessage } from "@/shared/utils/extract-error-message";
import { Image, ImagePlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { updateInlineStyles } from "@/shared/helpers/update-inline-styles";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Arrow } from "@radix-ui/react-popover";
import { useSession } from "next-auth/react";

//---------------------------------------------------------------
// Инициализация схемы валидации
//---------------------------------------------------------------
const formSchema = z.object({
  file: z.unknown().refine(
    (file) => {
      if (!(file instanceof File)) {
        return false;
      }

      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      return validTypes.includes(file.type);
    },
    {
      message: "file not selected, valid file types: jpeg, png, gif",
    },
  ),
});

type UploadImageModalProps = React.ComponentPropsWithoutRef<"button"> & {
  currentElement: HTMLElement | Element | undefined | null;
};

//---------------------------------------------------------------
// Компонент модального окна для загрузки фото на сервер
//---------------------------------------------------------------
export function ChangeBackgroundImage({
  currentElement,
  ...rest
}: UploadImageModalProps) {
  const [fileName, setFileName] = useState<JSX.Element | string>("");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const pathName = usePathname();
  const userId = useSession().data?.user?.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  //---------------------------------------------------------------
  // Функция для отправки файла на сервер и изменения Background
  //---------------------------------------------------------------
  const onSubmit = async ({ file }: z.infer<typeof formSchema>) => {
    if (file && file instanceof File && userId) {
      try {
        // Создание объекта FormData для отправки на сервер и добавление в него файла
        const data = new FormData();
        data.set("file", file);
        //-----------------------------------------------------------------------------

        // Отправка файла на сервер и получение ответа
        const { success, fileName } = await uploadImage(data, userId);
        //-----------------------------------------------------------------------------

        // Изменение имени файла в модальном окне
        setFileName(
          <ImagePlus size={48} strokeWidth={0.5} absoluteStrokeWidth />,
        );
        //-----------------------------------------------------------------------------

        // Изменения Background на прямую в DOM структуре
        if (currentElement)
          (currentElement as HTMLElement).style.setProperty(
            "background-image",
            `url(/images/users/${userId}/${fileName})`,
          );
        //-----------------------------------------------------------------------------

        // Записываем изменения на сервер
        updateInlineStyles(
          currentElement as HTMLElement,
          pathName,
          "sectionStyles",
        );
        //-----------------------------------------------------------------------------

        // Изменение сообщения в модальном окне
        if (success) {
          toast.success("The image was successfully uploaded to the server");
          buttonRef.current?.click();
        }
        //-----------------------------------------------------------------------------

        // Чтобы опять можно было выбрать тот же файл
        const inputFile = document.querySelector(
          "#fileImageChangeBackground",
        ) as HTMLInputElement;
        if (inputFile) {
          inputFile.value = "";
        }
        //-----------------------------------------------------------------------------

        // Сброс формы
        form.reset();
      } catch (e: unknown) {
        // Вывод ошибки в консоль
        console.error(getErrorMessage(e));

        // Вывод ошибки в toast
        toast.error(getErrorMessage(e));

        // Чтобы опять можно было выбрать тот же файл
        const inputFile = document.querySelector(
          "#fileImageChangeBackground",
        ) as HTMLInputElement;
        if (inputFile) {
          inputFile.value = "";
        }

        // Сброс формы
        form.reset();
      }
    } else {
      throw new Error("Something went wrong.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button ref={buttonRef}>
          <Image
            className="button-popover-trigger-in-drawer"
            aria-label="Background image"
            size={28}
            strokeWidth={0.9}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent className={`max-w-[300px] px-[10px] py-[5px]`}>
        <Arrow width={100} height={5} className="fill-slate-200 " />

        <div className="text-center leading-7">
          Are you want change background?
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center space-y-8 p-[25px] "
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-center justify-center">
                  <FormControl>
                    <div>
                      <input
                        id="fileImageChangeBackground"
                        className="hidden"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            field.onChange(e.target.files[0]);
                            setFileName(e.target.files[0].name);
                          }
                        }}
                      />
                      <label
                        htmlFor="fileImageChangeBackground"
                        className="flex cursor-pointer flex-col items-center justify-center text-center"
                      >
                        {fileName ? (
                          <>{fileName}</>
                        ) : (
                          <>
                            <ImagePlus
                              className="transition-all hover:scale-125"
                              size={48}
                              strokeWidth={0.5}
                              absoluteStrokeWidth
                            />
                          </>
                        )}
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage className="!mt-[20px]" />
                </FormItem>
              )}
            />
            <Button type="submit">choose new background</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
