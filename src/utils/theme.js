export const applyThemeFromLocalStorage = () => {
  const savedTheme = localStorage.getItem("hs_theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
