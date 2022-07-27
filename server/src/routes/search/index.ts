import { Router } from "express";
import axios, { AxiosError } from "axios";
import { kuwo } from "../../config/music_api.json";
import { apis } from "../../config/app.json";
import { getMp3Url } from "../download";

const searchRoutes = Router();
const searchBaseUrl = kuwo.search.url;
const searchHearders = kuwo.search.headers;
const searchParams = kuwo.search.params;
interface musicInfo {
  name: string;
  artist: string;
  rid: number;
  pic: string;
  album: string;
  albumpic: string;
  mp3Url: string;
}

searchRoutes.get("/search", async (req, res) => {
  const { kw, format } = req.query;

  if (kw != undefined) {
    const { msg, list } = await searchMusic(kw as string);
    const nList: musicInfo[] = [];
    const names = list.map((item) => item.name);
    const artists = list.map((item) => item.artist);
    const rids = list.map((item) => item.rid);
    const pics = list.map((item) => item.pic);
    const albums = list.map((item) => item.album);
    const albumpics = list.map((item) => item.albumpic);

    const mp3Url: string[] = await Promise.all(
      list.map(async (item, index) => {
        list[index].mp3Url = (await getMp3Url(item.rid)).mp3Url;
        return (await getMp3Url(item.rid)).mp3Url;
      })
    );
    list.forEach((item) => {
      nList.push({
        name: item.name,
        artist: item.artist,
        rid: item.rid,
        pic: item.pic,
        album: item.album,
        albumpic: item.albumpic,
        mp3Url: item.mp3Url,
      });
    });

    if (format != undefined) {
      res.send(nList);
      return;
    }
    res.send({
      names,
      artists,
      rids,
      pics,
      albums,
      albumpics,
      mp3Url,
    });
  } else {
    res.send("请求参数不正确");
  }
});

const searchMusic = async (kw: string) => {
  searchParams.key = kw;
  let status: number | string | undefined = 200;
  let msg: string = "";
  let list: musicInfo[] = [];
  await axios
    .get(searchBaseUrl, { headers: searchHearders, params: searchParams })
    .then((res) => {
      status = res.status;
      msg = res.data.msg;
      list = res.data.data.list;
    })
    .catch((error: AxiosError) => {
      status = error.code;
      msg = error.message;
    });

  return {
    status,
    msg,
    list,
  };
};

export { searchRoutes };
