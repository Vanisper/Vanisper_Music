import React, { useRef, useCallback, useEffect } from "react";

export const useDebounce = (
  fn: (value: any) => any,
  delay: number,
  dep = []
) => {
  const { current } = useRef<{
    fn: (value: any) => any;
    timer: null | number;
  }>({
    fn,
    timer: null,
  });
  useEffect(() => {
    current.fn = fn;
  }, [fn]);
  return useCallback((...args: Parameters<typeof fn>) => {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep);
};

export const useThrottle = (
  fn: (value: any) => any,
  delay: number,
  dep = []
) => {
  const { current } = useRef<{
    fn: (value: any) => any;
    timer?: null | number;
  }>({
    fn,
    timer: null,
  });
  useEffect(() => {
    current.fn = fn;
  }, [fn]);
  return useCallback((...args: Parameters<typeof fn>) => {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
};
