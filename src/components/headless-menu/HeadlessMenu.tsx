import { createContext,  useContext, useState } from "react";
import type {ReactNode} from "react";

// CONTEXT
type HeadlessMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
};

const HeadlessMenuContext = createContext<HeadlessMenuContextValue | null>(null);

function useHeadlessMenuContext() {
  const context = useContext(HeadlessMenuContext);

  if (!context) {
    throw new Error(
      "HeadlessMenu components must be used inside HeadlessMenu",
    );
  }

  return context;
}


// MENU
type HeadlessMenuProps = {
  children: ReactNode;
};

function HeadlessMenu({
  children,
}: HeadlessMenuProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const close = () => {
    setOpen(false);
  };

  return (
    <HeadlessMenuContext.Provider
      value={{
        open,
        setOpen,
        toggle,
        close,
      }}
    >
      {children}
    </HeadlessMenuContext.Provider>
  );
}