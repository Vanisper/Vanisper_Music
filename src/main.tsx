import ReactDOM from "react-dom/client";

import("@/css/index.less"); // 引入样式
import App from "./pages/App";
import config from "../config/app.json";  // 引入配置文件
import { scalable } from "./utils/scalable/index";

scalable();
document.title = config.app_name;
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
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // 严格模式下，每次刷新都会执行两次=>目的是为了“爆出”更多的错误
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <App />
);

export { config, appTheme };
