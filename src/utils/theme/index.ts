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
  (config.theme.isAuto ||
    (document.documentElement.className == ("light" || "dark") ? 0 : 1)) &&
    (appTheme = config.theme.autoValue);

  (window as any).appTheme = appTheme;
  (window as any).config = config;
});
const target = document.documentElement;
// 创建观察者对象 => 观察html的变化
const observer = new MutationObserver(function (mutations) {
  mutations.forEach((mutation) => {
    const attributeType = mutation.attributeName;
    if (attributeType == "class") {
      config.theme.autoValue = themeMedia.matches ? "light" : "dark";
      appTheme = (mutation.target as Element).classList.contains("dark")
        ? "dark"
        : (appTheme = (mutation.target as Element).classList.contains("light")
            ? "light"
            : config.theme.autoValue);
    }
    (window as any).appTheme = appTheme;
    (window as any).config = config;
  });
});
// 传入目标节点和观察选项
observer.observe(target, { attributes: true });
(window as any).appTheme = appTheme;
(window as any).config = config;
const setThemes = (value: "dark" | "light" | "os-default") => {
  document.documentElement.className = value;
};
export { appTheme, config, setThemes };
