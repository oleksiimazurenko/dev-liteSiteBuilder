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
import { Image } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { updateElement } from "@/shared/actions/element/set/update-element";
import { imageSchema } from "@/shared/schemas/image-schema";
import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { useSession } from "next-auth/react";

type UploadImageModalProps = React.ComponentPropsWithoutRef<"button"> & {
  editableElement: HTMLElement | Element | undefined | null;
};

//---------------------------------------------------------------
// Компонент модального окна для загрузки фото на сервер
//---------------------------------------------------------------
export function ChangeImage({
  editableElement,
  ...rest
}: UploadImageModalProps) {
  const [fileName, setFileName] = useState<JSX.Element | string>("");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const userId = useSession().data?.user?.id;
  const { setIsOpenDrawerTools } = useDrawerToolsStore();

  const form = useForm<z.infer<typeof imageSchema>>({
    resolver: zodResolver(imageSchema),
  });

  //---------------------------------------------------------------
  // Функция для отправки файла на сервер и изменения Background
  //---------------------------------------------------------------
  const onSubmit = async ({ file }: z.infer<typeof imageSchema>) => {
    const elementId = editableElement?.getAttribute("data-id");
    if (file && file instanceof File && userId && elementId) {
      try {
        // Создание объекта FormData для отправки на сервер и добавление в него файла
        const data = new FormData();
        data.set("file", file);
        //-----------------------------------------------------------------------------

        // Отправка файла на сервер и получение ответа
        const { success, fileName } = await uploadImage(data, userId);
        //-----------------------------------------------------------------------------

        // Записываем изменения на сервер

        updateElement(
          elementId,
          "component",
          "src",
          `/images/users/${userId}/${fileName}`,
          "/",
        );

        // Закрытие поповера
        setIsOpenDrawerTools(false);
        // Убираем outline c активного элемента
        (editableElement as HTMLElement)?.style.setProperty("outline", "none");

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
        <button
          ref={buttonRef}
          className="toggle-popover"
          aria-label="Background image"
        >
          <Image className="svg-icon-stroke" size={28} strokeWidth={0.9} />
        </button>
      </PopoverTrigger>

      <PopoverContent className="bg-glass max-w-[300px] border-none px-[10px] py-[5px]">
        <div className="text-tertiary text-center leading-7">
          Are you want change image?
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
                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-[0.8px] border-dashed px-[30px] py-[30px] text-center"
                      >
                        {fileName ? (
                          <span className="text-primary">{fileName}</span>
                        ) : (
                          <span className="text-primary">Select file</span>
                        )}
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage className="!mt-[20px]" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="button-primary transition-all hover:scale-[1.02]"
            >
              chagne!
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
