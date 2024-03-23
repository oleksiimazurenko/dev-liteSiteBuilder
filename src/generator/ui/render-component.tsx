import { ProductCard } from "@/entities/editor/editor-product-card";
import { EditorImage } from "@/features/editor/editor-image";
import { EditorText } from "@/features/editor/editor-text";
import { PrimaryButton } from "@/features/main/primary-button";
import { getProductsList } from "@/shared/actions/product/get/get-products-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { EditorProductsList } from "@/widgets/editor/editor-products-list";
import { Component } from "@prisma/client";

export async function RenderComponent({
  id,
  type,
  parenTag,

  outerStyles,
  innerStyles,

  width,
  height,

  textContent,

  src,
  alt,
  href,
}: Component) {
  const dataProduct = await getProductsList();

  if (type === "text" && textContent && parenTag) {
    return {
      id,
      content: (
        <EditorText
          id={id}
          key={id}
          parenTag={parenTag as keyof JSX.IntrinsicElements}
          textContent={textContent}
          outerStyles={outerStyles as React.CSSProperties}
          innerStyles={innerStyles as React.CSSProperties}
        />
      ),
    };
  }

  if (type === "image" && src && alt && width && height && parenTag) {
    return {
      id,
      content: (
        <EditorImage
          id={id}
          key={id}
          parenTag={parenTag as keyof JSX.IntrinsicElements}
          src={src}
          alt={alt}
          width={width}
          height={height}
          outerStyles={outerStyles as React.CSSProperties}
          innerStyles={innerStyles as React.CSSProperties}
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
          href={href}
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
        <EditorProductsList
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
