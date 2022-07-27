import React, {
  FunctionComponent,
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";
import { useAppContext } from "~/context/AppContext";
import Loading from "~/pages/loading/index";
import Main from "./Main";
import("@/css/index.less"); // 引入样式
const Hello = lazy(() => import("~/pages/Hello/index")); // 欢迎

interface LayoutProps {}

const Layout: FunctionComponent<LayoutProps> = () => {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window.onload = () => {
      setIsLoading(false);
      // let temp = setTimeout(() => {
      //   setIsLoading(false);
      //   clearTimeout(temp);
      // }, 1000);
    };
  }, [isLoading]);
  return (
    <>
      {isLoading && <Loading />}
      {/* <Suspense fallback={<Loading />}> */}
      <Main></Main>
      {/* </Suspense> */}
    </>
  );
};

export default Layout;
