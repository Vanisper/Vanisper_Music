import { Router } from "express";
import sha1 from "sha1";

const wxCheckRouters = Router();
const TOKEN = "vzyuyb36ivdm27kgprhuh4q0g6zyx3cr";

wxCheckRouters.get("/wxCheck", async (req, res) => {
  const { signature, timestamp, nonce, echostr } = req.query;
  console.log("weichat", req.query);

  if (!signature || !timestamp || !nonce || !echostr) {
    res.send("请求参数不正确");
  } else {
    console.log(sha1([TOKEN, timestamp, nonce].sort().join("")));

    sha1([TOKEN, timestamp, nonce].sort().join("")) == signature
      ? res.header("content-type: text").send(echostr)
      : res.header("content-type: text").send("你不是微信");
  }
});

export { wxCheckRouters };
