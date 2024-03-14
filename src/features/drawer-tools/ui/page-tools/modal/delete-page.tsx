"use client";

import { deletePage } from "@/shared/actions/page/set/delete-page";
import { useDrawerToolsStore } from "@/shared/store/editable-group-store";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export function DeletePage() {
  const { idPage, setIsOpenDrawerTools } = useDrawerToolsStore();

  if (!idPage) return null;

  const onHandleClick = async () => {
    const { success, data } = await deletePage(idPage);

    success
      ? toast.success("Page deleted")
      : toast.error("Error deleting page");

    setIsOpenDrawerTools(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center">
        Are you sure you want to delete the page?
      </div>

      <Link href="/" className="mt-2">
        <Button className="bg-red-400 hover:bg-red-500" onClick={onHandleClick}>
          Delete
        </Button>
      </Link>
    </div>
  );
}
