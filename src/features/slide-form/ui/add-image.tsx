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

import { uploadImage } from "@/shared/actions/upload-image";
import { Button } from "@/shared/ui/button";
import { getErrorMessage } from "@/shared/utils/extract-error-message";
import { ImagePlus } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { ImageSchema } from "../model/schema";

type UploadImageModalProps = {
  setImageUrl: (url: string) => void;
};

//---------------------------------------------------------------
// Компонент модального окна для загрузки фото на сервер
//---------------------------------------------------------------
export function AddImage({ setImageUrl, ...rest }: UploadImageModalProps) {
  const [fileName, setFileName] = useState<JSX.Element | string>("");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ImageSchema>>({
    resolver: zodResolver(ImageSchema),
  });

  //---------------------------------------------------------------
  // Функция для отправки файла на сервер и изменения Background
  //---------------------------------------------------------------
  const onSubmit = async ({ file }: z.infer<typeof ImageSchema>) => {
    if (file && file instanceof File) {
      try {
        // Создание объекта FormData для отправки на сервер и добавление в него файла
        const data = new FormData();
        data.set("file", file);
        //-----------------------------------------------------------------------------

        // Отправка файла на сервер и получение ответа
        const { success, fileName } = await uploadImage(data, "public");
        //-----------------------------------------------------------------------------

        setImageUrl(fileName);

        // Изменение имени файла в модальном окне
        setFileName(
          <ImagePlus size={48} strokeWidth={0.5} absoluteStrokeWidth />,
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

                        // const file = e.target.files[0];
                        // field.onChange(file);
                        // const previewUrl = URL.createObjectURL(file);
                        // setPreviewUrl(previewUrl); // Сохраняем URL превью в состояние

                        // field.onChange(e.target.files[0]);
                        // setFileName(e.target.files[0].name);

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
        <Button type="submit" className="">
          Додати зображення
        </Button>
      </form>
    </Form>
  );
}
