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
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

import { uploadImage } from "@/shared/actions/user/set/upload-image";
import { usePopoverToolsStore } from "@/shared/store/editable-group-store";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { getErrorMessage } from "@/shared/utils/extract-error-message";
import { ImagePlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { createProduct } from "../../../../../shared/actions/product/set/create-product";

// ---------------------------------------------------------------
// Описываем схему валидации
// ---------------------------------------------------------------
const formSchema = z.object({
  name: z.string().min(2).max(50),
  country: z.string().min(2).max(50),
  price: z.string().min(2).max(10),
  type: z.enum(["best", "normal"], {
    required_error: "You need to select a notification type.",
  }),
  file: z.unknown().refine(
    (file) => {
      if (!(file instanceof File)) {
        return false;
      }

      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      return validTypes.includes(file.type);
    },
    {
      message: "file not selected",
    },
  ),
});

// ---------------------------------------------------------------
// Компонент для создания карточки продукта
// ---------------------------------------------------------------
export function CreateProduct() {
  const [fileName, setFileName] = useState<JSX.Element | string>("");
  const [responseMessage, setResponseMessage] = useState<JSX.Element | string>(
    "",
  );
  const { setIsOpenPopoverTools, idComponent } = usePopoverToolsStore();

  const userId = useSession().data?.user?.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      price: "",
      type: "normal",
    },
  });

  const onSubmit = async ({
    name,
    country,
    price,
    type,
    file,
  }: z.infer<typeof formSchema>) => {
    if (file && file instanceof File && userId) {
      try {
        // Создание объекта FormData для отправки на сервер и добавление в него файла
        const dataImage = new FormData();
        dataImage.set("file", file);
        //-----------------------------------------------------------------------------

        // Отправка файла на сервер и получение ответа
        const { success: successFile, fileName } = await uploadImage(
          dataImage,
          "protected",
          userId,
        );
        //-----------------------------------------------------------------------------

        // Отправка данных на сервер и получение ответа
        const { success } = await createProduct({
          name,
          country,
          price,
          type,
          image: fileName
            ? fileName
            : "fileName not found, error in file: src/features/popover-tools/ui/product-tools/modal/create-product.tsx",
          componentId: idComponent,
        });

        success
          ? toast.success("Product created")
          : toast.error("Error creating product");

        //-----------------------------------------------------------------------------

        // Изменение имени файла в модальном окне
        setFileName(
          <ImagePlus
            className="transition-all hover:scale-125"
            size={48}
            strokeWidth={0.5}
            absoluteStrokeWidth
          />,
        );
        //-----------------------------------------------------------------------------

        // Изменение сообщения в модальном окне
        if (successFile) {
          setResponseMessage(
            <p className="mt-[10px] text-green-300">
              The image was successfully uploaded to the server
            </p>,
          );

          setTimeout(() => setResponseMessage(""), 1500);
        }
        //-----------------------------------------------------------------------------

        // Чтобы опять можно было выбрать тот же файл
        const inputFile = document.querySelector(
          "#fileImageProduct",
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

        // Изменение сообщения в модальном окне на ошибку
        setFileName(getErrorMessage(e));

        // Чтобы опять можно было выбрать тот же файл
        const inputFile = document.querySelector(
          "#fileImageProduct",
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
    <div className="w-full">
      <div className="text-center">Create new product</div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-2 flex flex-col items-center justify-center space-y-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col items-center justify-center">
                <FormControl>
                  <Input placeholder="name of the new product" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col items-center justify-center">
                <FormControl>
                  <Input placeholder="name of the country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col items-center justify-center">
                <FormControl>
                  <Input placeholder="price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="!mt-[15px]">
                <FormLabel>Select product type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="best" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        product type best
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="normal" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        product type normal
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col items-center justify-center">
                <FormControl>
                  <div>
                    <input
                      id="fileImageProduct"
                      className="hidden"
                      tabIndex={0}
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          field.onChange(e.target.files[0]);
                          setFileName(e.target.files[0].name);
                        }
                      }}
                    />
                    <label
                      htmlFor="fileImageProduct"
                      className="flex cursor-pointer flex-col items-center justify-center text-center"
                    >
                      {fileName ? (
                        <>
                          {fileName}
                          {responseMessage}
                        </>
                      ) : (
                        <>
                          <ImagePlus
                            className="transition-all hover:scale-125"
                            size={48}
                            strokeWidth={0.5}
                            absoluteStrokeWidth
                          />

                          {responseMessage}
                        </>
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
            onClick={() => {
              setIsOpenPopoverTools(false);
            }}
          >
            create new product
          </Button>
        </form>
      </Form>
    </div>
  );
}
