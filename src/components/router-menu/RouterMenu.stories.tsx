import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import {
  BarChart3,
  Home,
  Settings,
  Users,
} from "lucide-react";


import { RouterMenu } from "./RouterMenu";

const meta = {
  title: "RouterMenu",
  component: RouterMenu,

  parameters: {
    layout: "fullscreen",
  },

  argTypes: {
    children: {
      control: false,
    },

    variant: {
      control: "select",
      options: ["desktop", "mobile"],
    },

    open: {
      control: "boolean",
    },

    onOpenChange: {
      action: "onOpenChange",
    },
  },
} satisfies Meta<typeof RouterMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

function MenuContent() {
  return (
    <>
      <RouterMenu.Item
        to="/"
        label="Главная"
        icon={<Home size={20} />}
      />

      <RouterMenu.Item
        to="/users"
        label="Пользователи"
        icon={<Users size={20} />}
      />

      <RouterMenu.Group
        label="Отчёты"
        to="/reports"
        icon={<BarChart3 size={20} />}
      >
        <RouterMenu.Item
          to="/reports"
          label="Все отчёты"
        />

        <RouterMenu.Item
          to="/reports/sales"
          label="Продажи"
        />

        <RouterMenu.Item
          to="/reports/finance"
          label="Финансы"
        />
      </RouterMenu.Group>

      <RouterMenu.Item
        to="/settings"
        label="Настройки"
        icon={<Settings size={20} />}
      />
    </>
  );
}

// ============================================================================
// Активный вложенный маршрут
// ============================================================================

export const ActiveNestedRoute: Story = {
  args: {
    children: null,
    variant: "desktop",
  },

  render: () => (
    <MemoryRouter
      initialEntries={["/reports/sales"]}
    >
      <RouterMenu variant="desktop">
        <MenuContent />
      </RouterMenu>
    </MemoryRouter>
  ),
};


// ============================================================================
// Интерактивный вариант
// ============================================================================
export const Interactive: Story = {
  args: {
    variant: "mobile",
    open: true,
    children: null,
  },

  render: (args) => (
    <MemoryRouter initialEntries={["/"]}>
      <RouterMenu {...args}>
        <RouterMenu.Item
          to="/"
          label="Главная"
          icon={<Home size={20} />}
        />

        <RouterMenu.Item
          to="/users"
          label="Пользователи"
          icon={<Users size={20} />}
        />

        <RouterMenu.Group
          label="Отчёты"
          to="/reports"
          icon={<BarChart3 size={20} />}
        >
          <RouterMenu.Item
            to="/reports"
            label="Все отчёты"
          />

          <RouterMenu.Item
            to="/reports/sales"
            label="Продажи"
          />

          <RouterMenu.Item
            to="/reports/finance"
            label="Финансы"
          />
        </RouterMenu.Group>

        <RouterMenu.Item
          to="/settings"
          label="Настройки"
          icon={<Settings size={20} />}
        />
      </RouterMenu>
    </MemoryRouter>
  ),
};