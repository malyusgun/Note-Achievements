import type { IMenuItem, IPageData, TMainTheme } from "~/types";

export const useMainStore = defineStore("mainStore", () => {
  const menuItems = ref<IMenuItem[]>(
    JSON.parse(localStorage.getItem("menuItems") || "[]")
  );
  const mainTheme = ref<TMainTheme>(
    JSON.parse(localStorage.getItem("mainTheme") || '"blue"')
  );

  const colorMode = useColorMode();

  const contrastColor = computed(() =>
    colorMode.value === "dark" ? "white" : "black"
  );

  const setMainTheme = (newTheme: TMainTheme) => {
    mainTheme.value = newTheme;
    localStorage.setItem("mainTheme", JSON.stringify(newTheme));
  };

  const toggleColorMode = () => {
    colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
  };

  const addPage = (pageData: IPageData) => {
    const pages = JSON.parse(localStorage.getItem("pages") || "[]");
    pages.push(pageData);
    menuItems.value.push({
      iconName: pageData.icon,
      label: pageData.name,
      link: pageData.pageId,
    });
    localStorage.setItem("menuItems", JSON.stringify(menuItems.value));
    localStorage.setItem("pages", JSON.stringify(pages));
  };

  const getPage = (pageId: string) => {
    const pages = JSON.parse(localStorage.getItem("pages") || "[]");
    return pages.find((page: IPageData) => page.pageId === pageId);
  };

  const editPage = (pageData: IPageData) => {
    let pages = JSON.parse(localStorage.getItem("pages") || "[]");

    pages = pages.map((data: IPageData) => {
      if (pageData.pageId !== data.pageId) return pageData;
      return data;
    });

    localStorage.setItem("pages", JSON.stringify(pages));
  };

  return {
    menuItems,
    mainTheme,
    colorMode,
    contrastColor,
    setMainTheme,
    toggleColorMode,
    addPage,
    getPage,
    editPage,
  };
});
