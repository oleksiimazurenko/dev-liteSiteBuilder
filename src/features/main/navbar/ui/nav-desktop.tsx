"use client";

import Link from "next/link";

import cn from "classnames";
import { usePathname } from "next/navigation";

type ButtonArray = {
  name: string;
  link: string;
}[];

type NavDesktopProps = {
  className?: string;
  buttonArray: ButtonArray;
};

export function NavDesktop({ className, buttonArray }: NavDesktopProps) {
  const pathname = usePathname();

  const pathComparison = (firstPath: string, secondPath: string) => {
    const firstArray = firstPath.split("/");
    const secondArray = secondPath.split("/");

    const a = [firstArray[1], firstArray[2]].join("/");
    const b = [secondArray[1], secondArray[2]].join("/");

    return a === b;
  };

  return (
    <div
      className={cn("items-center space-x-6 pl-2", {
        [className as string]: className,
      })}
    >
      {buttonArray.map(({ name, link }) => {
        if (name === "Create site") return;
        return (
          <Link
            key={link}
            href={link}
            className={cn("text-primary hover-color-primary", {
              ["dark:!text-neutral-200"]: pathComparison(link, pathname),
              ["!text-neutral-700"]: pathComparison(link, pathname),
            })}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
}
