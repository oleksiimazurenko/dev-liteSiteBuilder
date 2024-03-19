export type SideBarItems = {
  name: string;
  url: string;
};

export type SideBarDataType = {
  editor: SideBarItems[];
  setting: SideBarItems[];
};

export const sideBarData = {
  editor: [
    { name: "List Sites", url: "/app/editor/list-sites" },
  ],
  setting: [
    { name: "Info profil", url: "/app/settings/info-profil" },
    { name: "User", url: "/app/settings/user" },
  ],
};
