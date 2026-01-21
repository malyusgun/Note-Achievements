import type { IPageData, TMainTheme } from "~/types";

export const useMainStore = defineStore("mainStore", () => {
  const pages = ref<IPageData[]>(
    JSON.parse(localStorage.getItem("pages") || "[]")
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
    pages.value.push(pageData);
    localStorage.setItem("pages", JSON.stringify(pages.value));
  };

  const getPage = (pageId: string) => {
    return pages.value.find((page: IPageData) => page.pageId === pageId);
  };

  const editPage = (pageData: Partial<IPageData> & { pageId: string }) => {
    pages.value = pages.value.map((data: IPageData) => {
      if (pageData.pageId !== data.pageId) return data;
      return { ...data, ...pageData };
    });

    localStorage.setItem("pages", JSON.stringify(pages.value));
  };

  const deletePage = (pageId: string) => {
    pages.value = pages.value.filter(
      (data: IPageData) => pageId !== data.pageId
    );

    localStorage.setItem("pages", JSON.stringify(pages.value));
  };

  return {
    pages,
    mainTheme,
    colorMode,
    contrastColor,
    setMainTheme,
    toggleColorMode,
    addPage,
    getPage,
    editPage,
    deletePage,
  };
});
