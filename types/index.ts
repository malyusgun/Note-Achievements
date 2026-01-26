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

export interface IPageData {
  pageId: string;
  name: string;
  icon: string;
  link?: string;
  blocks: IPageBlock[];
}

export interface IPageBlock {
  blockId: string;
  label: string;
  progress: number;
  list: IPageBlockListItem[];
}

export interface IPageBlockProps {
  pageData: IPageData;
  block: IPageBlock;
  contrastColor: TSecondTheme;
}

export interface IPageBlockListProps {
  pageId: string;
  blockId: string;
  list: IPageBlockListItem[];
  mainTheme: TMainTheme;
}

export interface IPageBlockListItem extends IPageBlockListItemData {
  showChildren?: boolean;
  children?: IPageBlockListItemData[];
}

export interface IPageBlockListItemData {
  itemId: string;
  label: string;
  checked: boolean;
  points: number;
  tracker?: {
    max: number;
    value: number;
  };
}

export interface IPageBlockListItemProps {
  item: IPageBlockListItem;
  mainTheme: TMainTheme;
}

export interface IPageBlockListItemSettingsModalProps {
  item: IPageBlockListItem | null;
  mainTheme?: TMainTheme;
}

export interface IConfirmDeleteModalProps {
  description: string;
}
