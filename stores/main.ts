import type {
  IPageData,
  IPageBlockListItem,
  IPageBlockListItemData,
  TMainTheme,
} from "~/types";

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

  const updateBlockListItem = (
    pageId: string,
    blockId: string,
    itemId: string,
    updates: Partial<IPageBlockListItem>
  ) => {
    const page = pages.value.find((p) => p.pageId === pageId);
    if (!page) {
      console.warn(`Page with id ${pageId} not found`);
      return;
    }

    const blocks = toRaw(page.blocks).map((block) => {
      if (block.blockId !== blockId) return block;

      const list = block.list.map((item) => {
        if (item.itemId !== itemId) return item;
        return { ...item, ...updates };
      });

      return { ...block, list };
    });

    editPage({ pageId, blocks });
  };

  const updateBlockListItemChild = (
    pageId: string,
    blockId: string,
    parentItemId: string,
    childItemId: string,
    updates: Partial<IPageBlockListItemData>
  ) => {
    const page = pages.value.find((p) => p.pageId === pageId);
    if (!page) {
      console.warn(`Page with id ${pageId} not found`);
      return;
    }

    const blocks = toRaw(page.blocks).map((block) => {
      if (block.blockId !== blockId) return block;

      const list = block.list.map((item) => {
        if (item.itemId !== parentItemId || !item.children) return item;

        const children = item.children.map((child) => {
          if (child.itemId !== childItemId) return child;
          return { ...child, ...updates };
        });

        return { ...item, children };
      });

      return { ...block, list };
    });

    editPage({ pageId, blocks });
  };

  const deleteBlockListItem = (
    pageId: string,
    blockId: string,
    itemId: string
  ) => {
    const page = pages.value.find((p) => p.pageId === pageId);
    if (!page) {
      console.warn(`Page with id ${pageId} not found`);
      return;
    }

    const blocks = toRaw(page.blocks).map((block) => {
      if (block.blockId !== blockId) return block;

      const list = block.list.filter((item) => item.itemId !== itemId);
      return { ...block, list };
    });

    editPage({ pageId, blocks });
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
    updateBlockListItem,
    updateBlockListItemChild,
    deleteBlockListItem,
  };
});
