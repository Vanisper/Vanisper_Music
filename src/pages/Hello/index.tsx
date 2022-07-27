import { FunctionComponent, useEffect } from "react";

interface HelloProps {}

const Hello: FunctionComponent<HelloProps> = () => {
  useEffect(() => {}, []);

  return (
    <div>
      你好世界！
      <div>777</div>
      <img
        src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wEaz?ver=0eaa"
        alt=""
      />
    </div>
  );
};

export default Hello;
