// import "./App.css";
import { Loading } from "./loading/index";
import { useState, useEffect } from "react";
import { appTheme, config } from "../main";

function App() {
  let [isLoading, setIsLoading] = useState(false);
  let [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    window.onload = () => {
      let temp = setTimeout(() => {
        setIsLoading(false);
        clearTimeout(temp);
      }, 5000);
    };
    if (document.readyState == "complete") {
      setIsLoading(false);
    }
  }, [isDark]);

  return (
    <div className="App">
      {isLoading && <Loading></Loading>}
      <button
        className="button button-wrap subscribe-link"
        onClick={() => {
          setIsDark(!isDark);
        }}
      >
        111
      </button>
      <a className="external subscribe-link" href="#">
        222
        <code>1111</code>
      </a>
      <code>你好</code>
      <div className="code-example">
        <pre>
          <button type="button" className="icon copy-icon"></button>
          <code>
            <span className="token comment">/*111*/</span>
            <span className="token comment">222</span>
          </code>
        </pre>
      </div>
      <button className="btn btn-primary">daisyUI Button</button>
    </div>
  );
}

export default App;
