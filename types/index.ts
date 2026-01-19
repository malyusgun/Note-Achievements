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

export interface IMenuItem {
  iconName: string;
  label: string;
  link?: string;
}

export interface IMenuItemProps {
  iconName: string;
  label: string;
  link?: string;
  theme: TMainTheme;
  contrastColor: TSecondTheme;
}

export interface IInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export interface IPageData {
  pageId: string;
  name: string;
  icon: string;
  blocks: IPageBlock[];
}

export interface IPageBlock {
  blockId: string;
  label: string;
  progress: number;
  list: IPageBlockListItem[];
}

export interface IPageBlockProps {
  block: IPageBlock;
  contrastColor: TSecondTheme;
}

export interface IPageBlockListProps {
  list: IPageBlockListItem[];
  mainTheme: TMainTheme;
}

export interface IPageBlockListItem extends IPageBlockListItemData {
  children?: IPageBlockListItemData[];
}

export interface IPageBlockListItemData {
  label: string;
  checked: boolean;
  points: number;
}

export interface IPageBlockListItemProps {
  item: IPageBlockListItem;
  mainTheme: TMainTheme;
}

export interface IPageBlockListItemSettingsModalProps {
  item: IPageBlockListItem | null;
  mainTheme?: TMainTheme;
}
