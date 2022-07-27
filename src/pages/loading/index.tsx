import "./index.css";
import storeImg from "./img/store.png";

const Loading = () => {
  // console.log("Loading");

  return (
    <div className="loading-container">
      <img src={storeImg} alt="商店图标" />
      <div className="loading-progress">
        <span></span>
      </div>
    </div>
  );
};

export default Loading;
