import { HeadlessMenu } from "../headless-menu/HeadlessMenu";

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