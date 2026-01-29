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

export interface IMenuItemProps {
  icon: string;
  name: string;
  link?: string;
  theme: TMainTheme;
  contrastColor: TSecondTheme;
  currentPath: string;
}

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
