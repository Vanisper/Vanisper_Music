import express from "express";
import config from "./config/app.json";
import { searchRoutes, downloadRouters } from "./routes/index";

const app = express();
//设置允许跨域访问该服务.
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", config.allow.hosts);
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options")
    res.send(200); //让options尝试请求快速结束
  else next();
});

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(searchRoutes);
app.use(downloadRouters);

app.listen(config.port, () => {
  console.clear();
  console.log("服务已运行");
});
