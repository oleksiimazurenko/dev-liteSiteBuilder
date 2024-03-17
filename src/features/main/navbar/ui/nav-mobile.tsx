import {
  LangSwitchProps,
  LogOutProps,
  ThemeSwitchProps,
} from "@/shared/types/props";
import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ButtonArray = {
  name: string;
  link: string;
  icon: JSX.Element;
}[];

type NavMobileProps = {
  className?: string;
  LangSwitch: ({ className }: LangSwitchProps) => JSX.Element;
  ThemeSwitch: ({ className }: ThemeSwitchProps) => JSX.Element;
  LogOut: ({ className }: LogOutProps) => JSX.Element;
  buttonArray: ButtonArray;
};

export function NavMobile({ className, buttonArray }: NavMobileProps) {
  return (
    <div
      className={cn("items-center justify-evenly gap-x-2 pb-1", {
        [className as string]: className,
      })}
    >
      {buttonArray.map(({ name, link, icon }) => (
        <div
          key={link}
          className={cn(
            "relative w-[60px] border-none bg-transparent transition-all",
            {},
          )}
        >
          <Link
            href={link}
            className={cn("flex flex-col items-center justify-center !p-0", {
              ["absolute bottom-1/2 left-1/2 h-[75px] w-[75px] -translate-x-1/2 translate-y-[30px] transform !rounded-full !border-[0.5px] !border-solid !border-white bg-white"]:
                name === "Create site",
            })}
          >
            {icon}
            {name !== "Create site" && (
              <div className="leading-0 text-[10px]">{name}</div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
