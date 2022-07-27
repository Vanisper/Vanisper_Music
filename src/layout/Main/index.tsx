import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import "./index.module.less";
// ****************************************** 导入组件
import Logo from "@/img/react.svg";
import ThemeLight from "@/icons/theme-light.svg";
import ThemeDark from "@/icons/theme-dark.svg";
import ThemeOsDefault from "@/icons/theme-os-default.svg";
import Maximize from "@/icons/maximize.svg";
import Minimize from "@/icons/minimize.svg";
import History from "@/icons/history.svg";

import { config, setThemes, appTheme } from "~/utils/theme";
import { useDebounce, useThrottle } from "~/utils/use";
import { search, musicInfo } from "~/services/search";

interface Props {}

const searchHistory = ["1", "2"];

const Main: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const [currentTheme, setCurrentTheme] = useState(appTheme);
  const [isFull, setIsFull] = useState(
    document.fullscreenElement as unknown as boolean
  );
  const [isShowSearchBox, setIsShowSearchBox] = useState(false);
  const [isPredict, setIsPredict] = useState(false);
  const [targetPredict, setTargetPredict] = useState("");
  let [searchPredict, setSearchPredict] = useState<musicInfo[]>([]);
  // 搜索相关句柄函数  配合防抖
  const handleSearch = useDebounce(async (value: string) => {
    const result = await search(value);
    typeof result == "object" && setSearchPredict(result);
    // setSearchPredict(result.map((item) => item.name));
  }, 300);

  useEffect(() => {
    config.theme.isAuto
      ? setThemes("os-default")
      : currentTheme == "light"
      ? setThemes("light")
      : currentTheme == "dark"
      ? setThemes("dark")
      : setThemes("os-default");
    document.documentElement.onfullscreenchange = () => {
      (document.fullscreenElement == null) == isFull && setIsFull(!isFull);
    };
  }, [currentTheme, isFull, isShowSearchBox, targetPredict]);
  return (
    <>
      {props.children}
      {/* 整体布局 */}
      <header className="topbar">
        <div className="topbar-container">
          <span className="logo-box">
            <img src={Logo} alt="logo-image" className="logo-image" />
            <span>{config.app_name}</span>
          </span>
          <span className="search-box">
            <form action="#" className="search-form">
              <input
                type="search"
                placeholder="搜索"
                onFocus={() => {
                  setIsShowSearchBox(true);
                }}
                onBlur={() => {
                  let temp = setTimeout(() => {
                    setIsShowSearchBox(false);
                    clearTimeout(temp);
                  }, 300);
                }}
                onInput={(event) => {
                  setSearchPredict([]);
                  event.currentTarget.value
                    ? setIsPredict(true)
                    : setIsPredict(false);
                  setTargetPredict(event.currentTarget.value);

                  handleSearch(event.currentTarget.value);
                }}
              />
              <span className="icon icon-search"></span>
              {isShowSearchBox && searchHistory.length > 0 && (
                <div className="search-panel">
                  {/* 判断是否是预测搜索的情况 */}
                  {!isPredict ? (
                    <div className="search-panel-history">
                      {searchHistory.map((item, index) => {
                        return (
                          <span
                            className="search-history-item"
                            key={index}
                            onClick={() => {
                              window.location.href = `https://cn.bing.com/search?q=${item}`;
                            }}
                          >
                            <img
                              className="icon-history"
                              src={History}
                              alt=""
                            />
                            <span className="history-item">{item}</span>
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="search-panel-predict">
                      {searchPredict
                        .filter((item) => {
                          // 严格搜索模式: 只展现完整匹配的关键词结果
                          // return item.name.includes(targetPredict);

                          return item;
                        })
                        .map((item) => {
                          return (
                            <span
                              className="search-predict-item"
                              key={item.rid}
                              onClick={() => {
                                window.open(`${item.mp3Url}`);
                              }}
                            >
                              <img
                                className="icon-predict"
                                src={item.pic}
                                alt=""
                              />
                              <span className="predict-item">
                                <span className="predict-item-name">
                                  {item.name}
                                </span>
                                {" - "}
                                <span className="predict-item-artist">
                                  {item.artist}
                                </span>
                                {" - "}
                                <span className="predict-item-album">
                                  {item.album}
                                </span>
                              </span>
                            </span>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}
            </form>
          </span>
          <span className="user-box">
            <img
              src={ThemeOsDefault}
              alt="user-avatar"
              className="user-avatar"
            />
          </span>
          <span className="themes-box">
            <img
              className="currentTheme"
              src={
                config.theme.isAuto
                  ? ThemeOsDefault
                  : currentTheme == "light"
                  ? ThemeLight
                  : currentTheme == "dark"
                  ? ThemeDark
                  : ThemeOsDefault
              }
              onClick={() => {
                config.theme.isAuto = false;
                // 设置成下一个主题
                // 从config.theme.lists列表里读取下一个主题名称，如果是最后一个下标就返回到0下标
                setCurrentTheme(
                  config.theme.lists[
                    config.theme.lists.indexOf(currentTheme) ==
                    config.theme.lists.length - 1
                      ? 0
                      : config.theme.lists.indexOf(currentTheme) + 1
                  ]
                );
              }}
              alt={currentTheme}
              title={currentTheme}
            />
          </span>
          <span className="tool-box">
            <img
              className="tool-maximize"
              onClick={() => {
                !isFull
                  ? document.documentElement.requestFullscreen()
                  : document.exitFullscreen();
                setIsFull(!isFull);
              }}
              src={isFull ? Minimize : Maximize}
              alt={isFull ? "最小化" : "最大化"}
              title={isFull ? "最小化" : "最大化"}
            />
          </span>
        </div>
      </header>
      <section className="main">
        <nav className="sidebar"></nav>
        <div className="main-content"></div>
      </section>
    </>
  );
};

export default Main;
