export type SideBarItems = {
  name: string;
  url: string;
}

export type SideBarData = {
  home: SideBarItems[];
  setting: SideBarItems[];
}

export const sideBarData = {
  home: [{ name: "List Sites", url: "/list-sites" }],
  setting: [
    { name: "Info profil", url: "/info-profil" },
    { name: "User", url: "/user" },
  ],
}