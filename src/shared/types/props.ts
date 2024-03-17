// Global Props

//-------------------------------------------------------------------------------------------
import { Product } from "@prisma/client";
export type ProductItem = {} & Omit<
  Product,
  "description" | "category" | "categoryId"
>;
export type ProductList = ProductItem[];
export type ProductCardProps = {} & Omit<ProductItem, "id" | "componentId">;
//-------------------------------------------------------------------------------------------

export type LangSwitchProps = {
  className?: string;
  svgClassName?: string;
};

//-------------------------------------------------------------------------------------------

export type ThemeSwitchProps = {
  className?: string;
  svgClassName?: string;
};

//-------------------------------------------------------------------------------------------


export type LogOutProps = {
	className?: string
  svgClassName?: string;
}

//-------------------------------------------------------------------------------------------