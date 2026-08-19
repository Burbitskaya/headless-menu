import { HeadlessMenu } from "../headless-menu/HeadlessMenu";
import { NavLink } from "react-router-dom";

export function RouterSidebar() {
  return (
    <HeadlessMenu>
      <HeadlessMenu.Panel>
        {({ open }) => (
          <aside
            className={`fixed left-0 top-0 h-screen bg-white shadow-lg ${
              open ? "w-64" : "w-16"
            }`}
          >
            <p className="p-4">
              {open ? "Sidebar" : "S"}
            </p>

             <nav className="mt-10 flex flex-col gap-2 p-2">
 <HeadlessMenu.Item id="home">
  {({ open, close }) => (
    <NavLink
      to="/"
      onClick={close}
      className={({ isActive }) =>
        `rounded-md px-3 py-2 ${
          isActive
            ? "bg-gray-200 font-semibold"
            : "hover:bg-gray-100"
        }`
      }
    >
      {open ? "Home" : "H"}
    </NavLink>
  )}
</HeadlessMenu.Item>

  <NavLink
    to="/users"
    className={({ isActive }) =>
      `rounded-md px-3 py-2 ${
        isActive
          ? "bg-gray-200 font-semibold"
          : "hover:bg-gray-100"
      }`
    }
  >
    {open ? "Users" : "U"}
  </NavLink>
<HeadlessMenu.Item disabled>
  {({ disabled, open }) => (
    <NavLink
      to="/settings"
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
        }
      }}
      className={`rounded-md px-3 py-2 ${
        disabled
          ? "cursor-not-allowed text-gray-400"
          : "hover:bg-gray-100"
      }`}
    >
      {open ? "Settings" : "S"}
    </NavLink>
  )}
</HeadlessMenu.Item>
<HeadlessMenu.Dropdown id="products">
  <HeadlessMenu.DropdownTrigger>
    {({ open, menuOpen, toggle }) => (
      <button
        onClick={toggle}
        className="rounded-md px-3 py-2 hover:bg-gray-100"
      >
        {menuOpen ? "Products" : "P"}
        {open ? " ↑" : " ↓"}
      </button>
    )}
  </HeadlessMenu.DropdownTrigger>
</HeadlessMenu.Dropdown>
</nav>
          </aside>
        )}
      </HeadlessMenu.Panel>

      <HeadlessMenu.Toggle>
        {({ open, toggle }) => (
          <button
            onClick={toggle}
            className="fixed bottom-4 left-4 z-50 rounded-md bg-blue-600 px-3 py-2 text-white"
          >
            {open ? "←" : "→"}
          </button>
        )}
      </HeadlessMenu.Toggle>
    </HeadlessMenu>
  );
}