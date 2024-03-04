import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useState, useTransition } from 'react'
import { z } from "zod";
import { SecondSchema } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/shared/ui/button'
import { CarouselApi } from '@/shared/ui/carousel'
import { uploadImage } from '@/shared/actions/upload-image'
import { toast } from 'sonner'
import { useForm } from "react-hook-form";
import { getErrorMessage } from '@/shared/utils/extract-error-message'
import { ImagePlus } from 'lucide-react'

type SecondProps = {
	embla: CarouselApi;
	setEmbla: (embla: CarouselApi) => void;
};

export function Second({ embla, setEmbla }: SecondProps) {
	const [isPending, startTransition] = useTransition();
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const secondForm = useForm<z.infer<typeof SecondSchema>>({
		resolver: zodResolver(SecondSchema),
		defaultValues: {
			imageUrl: "",
			title: "",
			subtitle: "",
			aboutMe: "",
		},
	});

	const onSubmit = (values: z.infer<typeof SecondSchema>) => {

		const { file, imageUrl, title, subtitle, aboutMe } = values;

	
    startTransition( async () => {
			
			if (file && file instanceof File) {
				try {
					// Создание объекта FormData для отправки на сервер и добавление в него файла
					const data = new FormData();
					data.set("file", file);
					//-----------------------------------------------------------------------------
	
					// Отправка файла на сервер и получение ответа
					const { success, fileName } = await uploadImage(data, "public");
					//-----------------------------------------------------------------------------
	
					// setImageUrl(fileName);
	
					// Изменение имени файла в модальном окне
					// setFileName(
					// 	<ImagePlus size={48} strokeWidth={0.5} absoluteStrokeWidth />,
					// );
					//-----------------------------------------------------------------------------
	
					// Изменение сообщения в модальном окне
					if (success) {
						toast.success("The image was successfully uploaded to the server");
					
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
					secondForm.reset();
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
					secondForm.reset();
				}
			} else {
				throw new Error("Something went wrong.");
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
        className="w-full px-1 pb-[20px] pt-1"
      >
        <div className="flex flex-col space-y-4">

				<FormField
          control={secondForm.control}
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
                        const file = e.target.files[0];
                        field.onChange(file);
                        const previewUrl = URL.createObjectURL(file);
                        setPreviewUrl(previewUrl); // Сохраняем URL превью в состояние
                        
                      }
                    }}
                  />
                  <label
                    htmlFor="fileImageChangeBackground"
                    className="flex cursor-pointer flex-col items-center justify-center text-center"
                  >
                    
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-48 w-48 object-cover"
                      />
                    ) : (
                      <ImagePlus
                        className="transition-all hover:scale-125"
                        size={48}
                        strokeWidth={0.5}
                        absoluteStrokeWidth
                      />
                    )}
                  </label>
                </div>
              </FormControl>
              <FormMessage className="!mt-[20px]" />
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={secondForm.control}
            name="aboutMe"
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
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isPending}
            type="submit"
            className="btnw1 dark:btnd1 tw1 dark:td1 w-full transition-all duration-300 ease-in-out hover:scale-[1.02]"
          >
            Створити сайт!
          </Button>

          <Button
            size="sm"
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
