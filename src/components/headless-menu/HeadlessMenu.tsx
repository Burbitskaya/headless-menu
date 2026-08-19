import { createContext,  useContext } from "react";

type HeadlessMenuContextValue = {
  
};

const HeadlessMenuContext = createContext<null>(null);

function useHeadlessMenuContext() {
  const context = useContext(HeadlessMenuContext);

  if (!context) {
    throw new Error(
      "HeadlessMenu components must be used inside HeadlessMenu",
    );
  }

  return context;
}