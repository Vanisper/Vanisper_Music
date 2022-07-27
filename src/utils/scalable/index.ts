const scalable = () => {
  document.addEventListener(
    "wheel",
    (event) => {
      event = event || window.event;

      if ((event.deltaY && event.ctrlKey) || event.detail) {
        event.preventDefault();
      }
    },
    { capture: false, passive: false }
  );
  document.addEventListener(
    "keydown",
    (event) => {
      if (
        (event.ctrlKey === true || event.metaKey === true) &&
        (event.keyCode === 61 ||
          event.keyCode === 107 ||
          event.keyCode === 173 ||
          event.keyCode === 109 ||
          event.keyCode === 187 ||
          event.keyCode === 189)
        // || event.keyCode === 83 || // S按键
        // event.keyCode === 123) // F12
      ) {
        event.preventDefault();
      }
    },
    false
  );
  document.addEventListener(
    "contextmenu",
    (event) => {
      // event.preventDefault();
    },
    false
  );
};

export { scalable };
