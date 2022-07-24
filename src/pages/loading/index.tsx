import "./index.css";
import storeImg from "./img/store.png";

function Loading() {
  return (
    <div className="loading-container">
      <img src={storeImg} alt="商店图标" />
      <div className="loading-progress">
        <span></span>
      </div>
    </div>
  );
}

export { Loading };
