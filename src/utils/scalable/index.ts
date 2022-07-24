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
      ) {
        event.preventDefault();
      }
    },
    false
  );
};

export { scalable };
