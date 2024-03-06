import { ProductCard } from "@/entities/product-card";
import { PrimaryButton } from "@/features/primary-button";
import { TextEditor } from "@/features/text-editor";
import { getProductsList } from "@/shared/actions/product/get/get-products-list";
import { auth } from "@/shared/lib/auth/model/auth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { BuildProductsList } from '@/widgets/build-products-list'
import { Component } from "@prisma/client";
import Image from "next/image";

export async function RenderComponent({
  id,
  type,
  textContent,
  outerStyles,
  innerStyles,
  tag,
  src,
  alt,
  width,
  height,
  href,
}: Component) {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";
  const dataProduct = await getProductsList();

  if (type === "text" && textContent && tag) {
    return {
      id,
      content: (
        <TextEditor
          id={id}
          key={id}
          tag={tag as keyof JSX.IntrinsicElements}
          textContent={textContent}
          outerStyles={outerStyles as React.CSSProperties}
          innerStyles={innerStyles as React.CSSProperties}
        />
      ),
    };
  }

  if (type === "image" && src && alt && width && height) {
    return {
      id,
      content: (
        <Image
          data-component
          data-trigger-tools
          key={id}
          data-id={id}
          className=""
          style={innerStyles as React.CSSProperties}
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
      ),
    };
  }

  if (type === "button" && href && textContent) {
    return {
      id,
      content: (
        <PrimaryButton
          id={id}
          key={id}
          href={isAdmin ? undefined : href}
          disabled={isAdmin}
          className=""
          textContent={textContent}
          style={outerStyles as React.CSSProperties}
        />
      ),
    };
  }

  if (type === "productList") {
    return {
      id,
      content: (
        <BuildProductsList
          id={id}
          key={id}
          products={dataProduct}
          type="best"
          ProductCard={ProductCard}
          innerStyles={innerStyles as React.CSSProperties}
        />
      ),
    };
  }

  return {
    id,
    content: (
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-md bg-slate-600/45 p-3"
        key={id}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Component not detected</AccordionTrigger>
          <AccordionContent>
            The generator did not calculate the component type, check the
            component conditions in the file
            src/generator/ui/render-component.tsx
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  };
}
