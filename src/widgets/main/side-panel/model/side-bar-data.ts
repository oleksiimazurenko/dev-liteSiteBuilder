export type SideBarItems = {
  name: string;
  url: string;
};

export type SideBarData = {
  home: SideBarItems[];
  setting: SideBarItems[];
};

export const sideBarData = {
  homeEditor: [
    { name: "Home Editor", url: "/app/editor" },
    { name: "List Sites", url: "/app/editor/list-sites" },
  ],
  setting: [
    { name: "Info profil", url: "/info-profil" },
    { name: "User", url: "/user" },
  ],
};
