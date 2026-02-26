import { v4 as uuidv4 } from "uuid";
import type { ITwoAxlesProps } from "~/types/props";

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

export interface ITwoAxlesChartData {
  labels: string[];
  datasets: ITwoAxlesChartDataset[];
}

export interface ITwoAxlesChartDataset {
  label?: string;
  backgroundColor?: string;
  data: (number | null)[];
}

export interface ICircularChartData {
  labels: string[];
  datasets: ICircularChartDataset[];
}

export interface ICircularChartDataset {
  data: number[];
  backgroundColor: string | string[];
  label?: string;
  borderColor?: string;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  pointHoverBackgroundColor?: string;
  pointHoverBorderColor?: string;
  fill?: boolean;
}

export interface IFinanceStateHistory {
  items: IFinanceStateItem[];
  chartType: TChartTwoAxlesComponent;
}

export interface IFinancesExpensesHistory {
  items: TFinancesExpensesDataItem[];
  chartType: TChartCircularComponent;
}

export type TFinancesExpensesHistoryCategory =
  | "food"
  | "publicCatering"
  | "housing"
  | "forHome"
  | "health"
  | "beauty"
  | "transport"
  | "medicines"
  | "education"
  | "clothesAndFootwear"
  | "entertainment"
  | "presents"
  | "other";

export type TFinancesExpensesDataItem = Partial<
  Record<TFinancesExpensesHistoryCategory, number>
> & { id: string };

export interface IFinanceStateItem {
  id: string;
  income: number | null;
  expense: number | null;
  savings: number | null;
  dateLabel: string;
}

export type TChartCircularComponent = "radar" | "doughnut" | "polarArea";

export type TChartTwoAxlesComponent = "line" | "bar";

export type TFinanceStateCategory = "income" | "expense" | "savings";

export type TFinanceMoneyChangeDirection = "up" | "down";
