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

function HeadlessMenuRoot({
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


//PANEL
type PanelProps = {
  children: (state: {
    open: boolean;
    close: () => void;
  }) => ReactNode;
};

function Panel({ children }: PanelProps) {
  const { open, close } = useHeadlessMenuContext();

  return <>{children({ open, close })}</>;
}


//TOGGLE
type ToggleProps = {
  children: (state: {
    open: boolean;
    toggle: () => void;
    setOpen: (open: boolean) => void;
  }) => ReactNode;
};

function Toggle({ children }: ToggleProps) {
  const { open, toggle, setOpen } = useHeadlessMenuContext();

  return <>{children({ open, toggle, setOpen })}</>;
}


export const HeadlessMenu = Object.assign(HeadlessMenuRoot, {
  Panel,
  Toggle,
});