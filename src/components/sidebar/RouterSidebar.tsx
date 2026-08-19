import { HeadlessMenu } from "../headless-menu/HeadlessMenu";

export function RouterSidebar() {
  return (
    <HeadlessMenu>
      <HeadlessMenu.Toggle>
        {({ open, toggle }) => (
          <button onClick={toggle}>
            {open ? "Close" : "Open"}
          </button>
        )}
      </HeadlessMenu.Toggle>

      <HeadlessMenu.Panel>
        {({ open }) =>
          open ? (
            <aside>
              <p>Sidebar</p>
            </aside>
          ) : null
        }
      </HeadlessMenu.Panel>
    </HeadlessMenu>
  );
}