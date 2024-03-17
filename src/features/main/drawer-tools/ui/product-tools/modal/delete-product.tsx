"use client";

import { deleteProduct } from "@/shared/actions/product/set/delete-product";
import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { Button } from "@/shared/ui/button";
import { toast } from "sonner";

export function DeleteProduct() {
  const { idProduct, setIsOpenDrawerTools } = useDrawerToolsStore();

  if (!idProduct) return null;

  const onHandleClick = async (idProduct: string) => {
    const { success, data } = await deleteProduct(idProduct);

    success
      ? toast.success("Product deleted")
      : toast.error("Error deleting product");

    setIsOpenDrawerTools(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center">
        Are you sure you want to delete the product?
      </div>

      <Button
        className="mt-2 bg-red-400 hover:bg-red-500"
        onClick={() => {
          onHandleClick(idProduct);
          setIsOpenDrawerTools(false);
        }}
      >
        Delete
      </Button>
    </div>
  );
}
