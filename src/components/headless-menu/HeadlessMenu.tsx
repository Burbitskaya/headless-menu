import { createContext,  useContext, useId, useState } from "react";
import type {ReactNode} from "react";

// CONTEXT
type HeadlessMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
  openedDropdownId: string | null;
  setOpenedDropdownId: (id: string | null) => void;
  toggleDropdown: (id: string) => void;
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
  const [openedDropdownId, setOpenedDropdownId] = useState<string | null>(null);

  const toggle = () => {
    setOpen(!open);
  };

  const close = () => {
    setOpen(false);
  };

 const toggleDropdown = (id: string) => {
  setOpenedDropdownId(
    openedDropdownId === id ? null : id,
  );
};

  return (
    <HeadlessMenuContext.Provider
      value={{
        open,
        setOpen,
        toggle,
        close,
        openedDropdownId,
        setOpenedDropdownId,
        toggleDropdown
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


//ITEM
type ItemProps = {
  id?: string;
  active?: boolean;
  disabled?: boolean;

 children: (state: {
  id: string;
  active: boolean;
  disabled: boolean;
  open: boolean;
  close: () => void;
}) => ReactNode;
};

function Item({
  id,
  active = false,
  disabled = false,
  children,
}: ItemProps) {
  const generatedId = useId();
  const { open, close } = useHeadlessMenuContext();

  return children({
        id: id ?? generatedId,
        active,
        disabled,
        open,
        close,
      }) 
}

//DROPDOWN
type DropdownContextValue = {
  id: string;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(
      "HeadlessMenu.DropdownTrigger and HeadlessMenu.DropdownContent must be used inside HeadlessMenu.Dropdown",
    );
  }

  return context;
}

type DropdownProps = {
  id: string;
  children: ReactNode;
};

function Dropdown({ id, children }: DropdownProps) {
  return (
    <DropdownContext.Provider value={{ id }}>
      {children}
    </DropdownContext.Provider>
  );
}

//DROPDOWN TRIGGER
type DropdownTriggerProps = {
  children: (state: {
    open: boolean;
    menuOpen: boolean;
    toggle: () => void;
  }) => ReactNode;
};

function DropdownTrigger({
  children,
}: DropdownTriggerProps) {
  const { id } = useDropdownContext();

  const {
    open: menuOpen,
    openedDropdownId,
    toggleDropdown,
  } = useHeadlessMenuContext();

  const dropdownOpen = openedDropdownId === id;

  return (
    <>
      {children({
        open: dropdownOpen,
        menuOpen,
        toggle: () => toggleDropdown(id),
      })}
    </>
  );
}


export const HeadlessMenu = Object.assign(HeadlessMenuRoot, {
  Panel,
  Toggle,
  Item,
  Dropdown,
  DropdownTrigger,
});