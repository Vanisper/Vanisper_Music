import { FunctionComponent, PropsWithChildren } from "react";
// ****************************************** 导入组件
import SearchWindow from "~/pages/SearchWindow/index";

interface Props {}

const Main: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  return (
    <div className="flex-1 flex justify-between relative overflow-hidden">
      {props.children}
      {/* 搜索窗口 */}
      <SearchWindow></SearchWindow>
    </div>
  );
};

export default Main;
