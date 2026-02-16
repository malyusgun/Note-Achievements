import { v4 as uuidv4 } from "uuid";

export type TMainTheme =
  | "blue"
  | "sky"
  | "pink"
  | "purple"
  | "teal"
  | "green"
  | "red"
  | "orange"
  | "yellow"
  | "black"
  | "grey"
  | "white";

export type TSecondTheme = "white" | "black";

export type TDataOperation = "add" | "edit" | "delete";

export interface IInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

export interface IWorkspaceData {
  workspaceId: string;
  name: string;
  icon: string;
  link?: string;
  blocks: IWorkspaceBlock[];
}

export interface IWorkspaceBlock {
  blockId: string;
  label: string;
  progress: number;
  list: IWorkspaceBlockListItem[];
}

export interface IWorkspaceBlockListItem extends IWorkspaceBlockListItemData {
  showChildren?: boolean;
  children?: IWorkspaceBlockListItemData[];
}

export interface IWorkspaceBlockListItemData {
  itemId: string;
  label: string;
  checked: boolean;
  points: number;
  tracker?: {
    max: number;
    value: number;
  };
}

export interface IChartData {
  labels: string[];
  datasets: IChartDataset[];
}

export interface IChartDataset {
  label?: string;
  backgroundColor?: string;
  data: (number | null)[];
}

export interface IFinanceStateHistory {
  items: IFinanceStateItem[];
  chartType: TChartTwoAxlesComponent;
}

export interface IFinanceStateItem {
  id: string;
  income: number | null;
  expense: number | null;
  savings: number | null;
  dateLabel: string;
}

export type TChartTwoAxlesComponent = "line" | "bar";

export type TFinanceStateCategory = "income" | "expense" | "savings";

export type TFinanceMoneyChangeDirection = "up" | "down";
