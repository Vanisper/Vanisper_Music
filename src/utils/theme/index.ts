import config from "~/../config/app.json"; // 引入配置文件

// 设置主题样式
let appTheme = config.theme.default;
// 获取系统主题
const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
// 如果是自动，则是跟随系统
if (config.theme.isAuto) {
  config.theme.autoValue = themeMedia.matches ? "light" : "dark";
  appTheme = config.theme.autoValue;
  document.documentElement.className =
    config.theme.lists[config.theme.lists.length - 1];
} else {
  document.documentElement.className = config.theme.default;
}
// 挂载一个监听系统主题变化的事件
themeMedia.addEventListener("change", (e) => {
  config.theme.autoValue = e.matches ? "light" : "dark";
  config.theme.isAuto && (appTheme = config.theme.autoValue);
  (window as any).appTheme = appTheme;
  (window as any).config = config;
});
(window as any).appTheme = appTheme;
(window as any).config = config;
const setThemes = (value: "dark" | "light" | "os-default") => {
  document.documentElement.className = value;
};
export { appTheme, config, setThemes };
