import type { TMainTheme } from "~/types";

export const useUserStore = defineStore("userStore", () => {
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

  return {
    mainTheme,
    colorMode,
    contrastColor,
    setMainTheme,
    toggleColorMode,
  };
});
