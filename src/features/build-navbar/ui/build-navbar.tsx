import { getPages } from "@/shared/actions/page/get/get-pages";
import { auth } from "@/shared/lib/auth/model/auth";
import cn from "classnames";
import { MainLogo } from "./main-logo";
import { NavLink } from "./nav-link";

export type BuildNavbarProps = {
  CreatePageTrigger: () => JSX.Element;
  DeletePageTrigger: ({ idPage }: { idPage: string }) => JSX.Element;
  linkColor: "black" | "white";
  typeNavbar: "header" | "footer";
};

export async function BuildNavbar({
  linkColor,
  typeNavbar,
  CreatePageTrigger,
  DeletePageTrigger,
}: BuildNavbarProps) {
  const { data } = await getPages();

  if (!data)
    return (
      <div>Partition dataPages not found in database. Error in navbar.tsx</div>
    );

  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";

  return (
    <nav
      className={cn("container flex items-end", {
        ["justify-start text-slate-100/90"]: linkColor === "white",
        ["justify-center text-slate-800/90"]: linkColor === "black",
      })}
    >
      <MainLogo linkColor={linkColor} />
      <ul className="flex">
        {data
          .filter(({ title }) => title !== "Home Page")
          .map(({ id, title, url }) => (
            <li className="relative" key={id}>
              <NavLink slug={`/${url}`}>{title}</NavLink>
              {isAdmin && <DeletePageTrigger idPage={id} />}
            </li>
          ))}
        {isAdmin && <CreatePageTrigger />}
      </ul>
    </nav>
  );
}
