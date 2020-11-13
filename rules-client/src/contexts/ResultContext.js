import React, { createContext, useCallback, useState } from "react";

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [response, setResponse] = useState({ h: null, k: null });

  const getResult = useCallback(({ a, b, c, d, e, f }) => {
    const resultEndpoint = `${process.env.REACT_APP_API_URI}/response?a=${a}&b=${b}&c=${c}&d=${d}&e=${e}&f=${f}`;
    fetch(resultEndpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ h, k, error }) => {
        setResponse({ h, k, error });
      })
      .catch((e) => {
        setResponse({ error: e.message });
      });
  }, []);

  return (
    <ResultContext.Provider
      value={{
        response,
        getResult,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const ResultConsumer = ResultContext.Consumer;
