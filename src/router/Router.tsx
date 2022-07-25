import { lazy } from "react";
import { BrowserRouter, RouteObject, useRoutes } from "react-router-dom";

import LayOut from "~/layout/index";
import { Loading } from "~/pages/loading/index";

const Hello = lazy(() => import("~/pages/Hello/index")); // 欢迎
// const Login = lazy(() => import("~/pages/Login")); // 登录
// const FindMusic = lazy(() => import("~/pages/FindMusic/index")); // 发现音乐
// const SingerList = lazy(() => import("~/pages/SingerList/index")); // 歌手
// const SongMenuDetails = lazy(() => import("~/pages/SongMenuDetails/index")); // 歌单详情
// const MusicList = lazy(
//   () => import("~/pages/SongMenuDetails/components/MusicList/index")
// ); // 歌单详情 --- 歌曲列表
// const CommentList = lazy(
//   () => import("~/pages/SongMenuDetails/components/CommentList/index")
// ); // 歌单详情 --- 评论列表
// const CollectorList = lazy(
//   () => import("~/pages/SongMenuDetails/components/CollectorList/index")
// ); // 歌单详情 --- 收藏者列表

// /**
//  * 需要缓存的页面
//  */
// const Recommend = lazy(() => import("~/pages/Recommend/index")); // 个性推荐
// const SongMenuList = lazy(() => import("~/pages/SongMenuList/index")); // 歌单
// const RankingList = lazy(() => import("~/pages/RankingList/index")); // 排行榜
// const NewSongList = lazy(() => import("~/pages/NewSongList/index")); // 新歌列表

export const Router = () => {
  /**
   * 重定向到/app
   */
  if (window.location.pathname === "/") {
    window.location.pathname = "/app";
  }
  return (
    <BrowserRouter basename="/app">
      <InnerRouter />
    </BrowserRouter>
  );
};
const InnerRouter = () => {
  // 路由信息
  const routes: RouteObject[] = [
    {
      path: "/",

      element: <LayOut />,
      children: [
        // {
        //   path: "/",
        //   element: <FindMusic />,
        //   children: [
        //     {
        //       index: true,
        //       element: <Recommend />,
        //     },
        //     {
        //       path: "/songMenuList",
        //       element: <SongMenuList />,
        //     },
        //     {
        //       path: "/rankingList",
        //       element: <RankingList />,
        //     },
        //     {
        //       path: "/singerList",
        //       element: <SingerList />,
        //     },
        //     {
        //       path: "/newSongList",
        //       element: <NewSongList />,
        //     },
        //   ],
        // },
        // {
        //   path: "/songMenuDetails/:songMenuId",
        //   element: <SongMenuDetails />,
        //   children: [
        //     {
        //       index: true,
        //       path: "musicList",
        //       element: <MusicList></MusicList>,
        //     },
        //     {
        //       path: "commentList",
        //       element: <CommentList></CommentList>,
        //     },
        //     {
        //       path: "collectorList",
        //       element: <CollectorList></CollectorList>,
        //     },
        //   ],
        // },
        {
          path: "/hello",
          element: <Hello />,
        },
      ],
    },
    {
      path: "*",
      element: <Loading />,
    },
  ];
  const element = useRoutes(routes);

  return element;
};
