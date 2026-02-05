import type {
  IChartData,
  IWorkspaceBlock,
  IWorkspaceBlockListItem,
  IWorkspaceData,
  TMainTheme,
  TSecondTheme,
} from "~/types/index";

export interface IMenuItemProps {
  icon: string;
  name: string;
  link?: string;
  theme: TMainTheme;
  contrastColor: TSecondTheme;
  currentPath: string;
}

export interface IWorkspaceBlockProps {
  workspaceData: IWorkspaceData;
  block: IWorkspaceBlock;
  contrastColor: TSecondTheme;
}

export interface IWorkspaceBlockListProps {
  workspaceId: string;
  blockId: string;
  list: IWorkspaceBlockListItem[];
  mainTheme: TMainTheme;
}

export interface IWorkspaceBlockListItemProps {
  item: IWorkspaceBlockListItem;
  mainTheme: TMainTheme;
}

export interface IWorkspaceBlockListItemSettingsModalProps {
  item: IWorkspaceBlockListItem | null;
  mainTheme?: TMainTheme;
}

export interface IConfirmDeleteModalProps {
  description: string;
}

export interface ITwoAxlesProps {
  component: "line" | "bar";
  chartData: IChartData;
}
