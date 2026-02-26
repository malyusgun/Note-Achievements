import type {
  ITwoAxlesChartData,
  IFinanceStateHistory,
  IFinanceStateItem,
  IWorkspaceBlock,
  IWorkspaceBlockListItem,
  IWorkspaceData,
  TMainTheme,
  TSecondTheme,
  ICircularChartData,
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

export interface ICircularProps {
  component: "radar" | "doughnut" | "polarArea";
  chartData: ICircularChartData;
}

export interface ITwoAxlesProps {
  component: "line" | "bar";
  chartData: ITwoAxlesChartData;
}

export interface IMoneyStateDataProps {
  mainTheme: TMainTheme;
  data: IFinanceStateHistory;
}

export interface IMoneyStateDataItemProps {
  item: IFinanceStateItem;
  dynamic: number | null;
  mainTheme: TMainTheme;
}
