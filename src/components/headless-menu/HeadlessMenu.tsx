import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

// ============================================================================
// Контекст 
// ============================================================================

type HeadlessMenuContextValue = {
  open: boolean;
  toggle: () => void;
  close: () => void;
  // ID единственного открытого dropdown.
  // В рамках одного меню одновременно открыт только один dropdown.
  openedDropdownId: string | null;

  toggleDropdown: (id: string) => void;
  openDropdown: (id: string) => void;
  closeDropdown: () => void;
};

const HeadlessMenuContext =
  createContext<HeadlessMenuContextValue | null>(
    null,
  );

function useHeadlessMenuContext() {
  const context = useContext(
    HeadlessMenuContext,
  );

  if (!context) {
    throw new Error(
      "HeadlessMenu components must be used inside HeadlessMenu",
    );
  }

  return context;
}

// ============================================================================
// Корневой компонент
// ============================================================================

type HeadlessMenuProps = {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function HeadlessMenuRoot({
  children,
  open: controlledOpen,
  onOpenChange,
}: HeadlessMenuProps) {
  const [internalOpen, setInternalOpen] =
    useState(false);

  const [openedDropdownId, setOpenedDropdownId] =
    useState<string | null>(null);

  const isControlled =
    controlledOpen !== undefined;

  const open = isControlled
    ? controlledOpen
    : internalOpen;

  // Изменяет состояние самого меню
  // закрытие меню также закрывает активный dropdown
  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (isControlled) {
        onOpenChange?.(nextOpen);
      } else {
        setInternalOpen(nextOpen);
      }

      if (!nextOpen) {
        setOpenedDropdownId(null);
      }
    },
    [isControlled, onOpenChange],
  );

  // Переключает состояние меню
  const toggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  // Закрывает меню
  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  // Переключает dropdown
  const toggleDropdown = useCallback(
    (id: string) => {
      setOpenedDropdownId((currentId) =>
        currentId === id ? null : id,
      );
    },
    [],
  );

  // Открывает конкретный dropdown
  const openDropdown = useCallback(
    (id: string) => {
      setOpenedDropdownId(id);
    },
    [],
  );

  // Закрывает текущий dropdown
  const closeDropdown = useCallback(() => {
    setOpenedDropdownId(null);
  }, []);

  const value = useMemo(
    () => ({
      open,
      toggle,
      close,
      openedDropdownId,
      toggleDropdown,
      openDropdown,
      closeDropdown,
    }),
    [
      open,
      toggle,
      close,
      openedDropdownId,
      toggleDropdown,
      openDropdown,
      closeDropdown,
    ],
  );

  return (
    <HeadlessMenuContext.Provider
      value={value}
    >
      {children}
    </HeadlessMenuContext.Provider>
  );
}

// ============================================================================
// Panel
// ============================================================================

type PanelProps = {
  children: (state: {
    open: boolean;
    close: () => void;
  }) => ReactNode;
};


function Panel({
  children,
}: PanelProps) {
  const { open, close } =
    useHeadlessMenuContext();

  return children({
    open,
    close,
  });
}

// ============================================================================
// Toggle
// ============================================================================

type ToggleProps = {
  children: (state: {
    open: boolean;
    toggle: () => void;
  }) => ReactNode;
};

function Toggle({
  children,
}: ToggleProps) {
  const { open, toggle } =
    useHeadlessMenuContext();

  return children({
    open,
    toggle,
  });
}

// ============================================================================
// Item
// ============================================================================

type ItemProps = {
  active?: boolean;
  disabled?: boolean;

  children: (state: {
    active: boolean;
    disabled: boolean;
    open: boolean;
    closeDropdown: () => void;
  }) => ReactNode;
};

function Item({
  active = false,
  disabled = false,
  children,
}: ItemProps) {
  const {
    open,
    closeDropdown,
  } = useHeadlessMenuContext();

  return children({
    active,
    disabled,
    open,
    closeDropdown,
  });
}

// ============================================================================
// Dropdown
// ============================================================================

type DropdownContextValue = {
  id: string;
  active: boolean;
};

const DropdownContext =
  createContext<DropdownContextValue | null>(
    null,
  );

function useDropdownContext() {
  const context = useContext(
    DropdownContext,
  );

  if (!context) {
    throw new Error(
      "HeadlessMenu.DropdownTrigger and HeadlessMenu.DropdownContent must be used inside HeadlessMenu.Dropdown",
    );
  }

  return context;
}

type DropdownProps = {
  active?: boolean;
  children: ReactNode;
};

function Dropdown({
  active = false,
  children,
}: DropdownProps) {
  const id = useId();

  const {
    open: menuOpen,
    openDropdown,
    closeDropdown,
  } = useHeadlessMenuContext();

  // Если меню закрыто — dropdown тоже закрывается.
  //
  // Если dropdown помечен active и меню открыто —
  // он автоматически открывается.
  useEffect(() => {
    if (!menuOpen) {
      closeDropdown();
      return;
    }

    if (active) {
      openDropdown(id);
    }
  }, [
    menuOpen,
    active,
    id,
    openDropdown,
    closeDropdown,
  ]);

  return (
    <DropdownContext.Provider
      value={{
        id,
        active,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
}

// ============================================================================
// DropdownTrigger
// ============================================================================

type DropdownTriggerProps = {
  children: (state: {
    dropdownOpen: boolean;
    menuOpen: boolean;

    toggle: () => void;
    openDropdown: () => void;
    closeDropdown: () => void;
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
    openDropdown,
    closeDropdown,
  } = useHeadlessMenuContext();

  const dropdownOpen =
    openedDropdownId === id;

  return children({
    dropdownOpen,
    menuOpen,
    toggle: () => toggleDropdown(id),
    openDropdown: () => openDropdown(id),
    closeDropdown,
  });
}

// ============================================================================
// DropdownContent
// ============================================================================

type DropdownContentProps = {
  children: (state: {
    dropdownOpen: boolean;
    menuOpen: boolean;
    close: () => void;
  }) => ReactNode;
};

function DropdownContent({
  children,
}: DropdownContentProps) {
  const { id } = useDropdownContext();

  const {
    open: menuOpen,
    openedDropdownId,
    closeDropdown,
  } = useHeadlessMenuContext();

  const dropdownOpen =
    openedDropdownId === id;

  return children({
    dropdownOpen,
    menuOpen,
    close: closeDropdown,
  });
}

export const HeadlessMenu = Object.assign(
  HeadlessMenuRoot,
  {
    Panel,
    Toggle,
    Item,
    Dropdown,
    DropdownTrigger,
    DropdownContent,
  },
);

export default HeadlessMenu;