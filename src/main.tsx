import ReactDOM from "react-dom/client";

import("@/css/index.less"); // 引入样式
import App from "./pages/App";
// 工具
import { scalable } from "./utils/scalable/index";
import { config, setThemes } from "./utils/theme/index";

scalable(); // 禁止用户缩放页面
document.title = config.app_name;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
