import { getPagesBySiteId } from "@/shared/actions/page/get/get-pages-by-site-id";
import { getSiteById } from "@/shared/actions/site/get/get-site-by-id";
import cn from "classnames";
import { join } from "path";
import { MainLogo } from "./main-logo";
import { NavLink } from "./nav-link";

export type EditorNavbarProps = {
  CreatePageTrigger: () => JSX.Element;
  DeletePageTrigger: ({ idPage }: { idPage: string }) => JSX.Element;
  linkColor: "black" | "white";
  typeNavbar: "header" | "footer";
  siteId: string;
};

export async function EditorNavbar({
  linkColor,
  typeNavbar,
  CreatePageTrigger,
  DeletePageTrigger,
  siteId,
}: EditorNavbarProps) {
  const { data: pages } = await getPagesBySiteId(siteId);
  const { data: site } = await getSiteById(siteId);

  const siteUrl = pages?.find(({ isMain }) => isMain === true)?.url;

  if (!pages || !site) {
    return (
      <div className="flex items-center justify-center bg-red-400">
        Partition dataPages not found in database. Notice in:
        src/features/build-navbar/ui/build-navbar.tsx
      </div>
    );
  }

  const imagePath = join("/images/users", site.userId, site.imageName);

  return (
    <nav
      className={cn("container flex items-end px-14", {
        ["justify-start text-slate-100/90"]: linkColor === "white",
        ["justify-center text-slate-800/90"]: linkColor === "black",
      })}
    >
      <MainLogo siteUrl={siteUrl} imagePath={imagePath} />
      <ul className="flex">
        {pages
          .filter(({ isMain }) => isMain !== true)
          .map(({ id, name, url }) => (
            <li className="relative" key={id}>
              <NavLink slug={`/${url}`}>{name}</NavLink>
              <DeletePageTrigger idPage={id} />
            </li>
          ))}
        <CreatePageTrigger />
      </ul>
    </nav>
  );
}
