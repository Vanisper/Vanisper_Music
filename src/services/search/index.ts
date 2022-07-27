import axios from "axios";
import { api } from "../../../config/app.json";

const apis = api.kuwo;
interface musicInfo {
  name: string;
  artist: string;
  rid: number;
  pic: string;
  album: string;
  albumpic: string;
  mp3Url: string;
}
const search = async (
  keyword: string,
  pn?: number,
  rn?: number,
  format?: string
) => {
  rn && (apis.search.params.rn = rn + "");
  pn && (apis.search.params.pn = pn + "");
  format && (apis.search.params.format = format);
  keyword && (apis.search.params.kw = keyword);

  return !keyword
    ? "请输入搜索关键词"
    : ((
        await axios.get(apis.search.url, {
          headers: apis.search.headers,
          params: apis.search.params,
        })
      ).data as musicInfo[]);
};

export { search };
export type { musicInfo };
