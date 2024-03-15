import {
  CreateProductTrigger,
  DeleteProductTrigger,
} from "@/features/drawer-tools";
import { auth } from "@/shared/lib/auth/model/auth";
import {
  ProductCardProps,
  ProductItem,
  ProductList,
} from "@/shared/types/props";

export type BuildProductsListProps = {
  id: string;
  products: ProductList;
  type: "normal" | "best";
  innerStyles: React.CSSProperties;
  ProductCard: (props: ProductCardProps) => JSX.Element;
};

export async function BuildProductsList({
  id,
  products,
  type,
  innerStyles,
  ProductCard,
}: BuildProductsListProps) {

  return (
    <div
      className="mt-[40px] grid grid-cols-[repeat(3,minmax(0,220px))] items-center justify-center justify-items-center gap-[70px] "
      style={innerStyles as React.CSSProperties}
      data-id={id}
    >
      {products
        .filter(({ type: dataType }) => dataType === type)
        .map(({ id, image, type, name, country, price }: ProductItem) => (
          <div className="relative" key={id}>
            <ProductCard
              name={name}
              country={country}
              price={price}
              image={image}
              type={type}
            />
            <DeleteProductTrigger idProduct={id} />
          </div>
        ))}
      <CreateProductTrigger componentId={id} />
    </div>
  );
}
