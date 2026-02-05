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
  data: number[];
}
