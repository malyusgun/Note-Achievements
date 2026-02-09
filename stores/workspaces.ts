import type {
  IWorkspaceData,
  IWorkspaceBlockListItem,
  IWorkspaceBlockListItemData,
  TMainTheme,
} from "~/types";

export const useWorkspacesStore = defineStore("workspacesStore", () => {
  const workspaces = ref<IWorkspaceData[]>(
    JSON.parse(localStorage.getItem("workspaces") || "[]")
  );

  const addWorkspace = (workspaceData: IWorkspaceData) => {
    workspaces.value.push(workspaceData);
    localStorage.setItem("workspaces", JSON.stringify(workspaces.value));
  };

  const getWorkspace = (workspaceId: string) => {
    return workspaces.value.find(
      (workspace: IWorkspaceData) => workspace.workspaceId === workspaceId
    );
  };

  const editWorkspace = (
    workspaceData: Partial<IWorkspaceData> & { workspaceId: string }
  ) => {
    workspaces.value = workspaces.value.map((data: IWorkspaceData) => {
      if (workspaceData.workspaceId !== data.workspaceId) return data;
      return { ...data, ...workspaceData };
    });

    localStorage.setItem("workspaces", JSON.stringify(workspaces.value));
  };

  const deleteWorkspace = (workspaceId: string) => {
    workspaces.value = workspaces.value.filter(
      (data: IWorkspaceData) => workspaceId !== data.workspaceId
    );

    localStorage.setItem("workspaces", JSON.stringify(workspaces.value));
  };

  const updateBlockListItem = (
    workspaceId: string,
    blockId: string,
    itemId: string,
    updates: Partial<IWorkspaceBlockListItem>
  ) => {
    const workspace = workspaces.value.find(
      (p) => p.workspaceId === workspaceId
    );
    if (!workspace) {
      console.warn(`Workspace with id ${workspaceId} not found`);
      return;
    }

    const blocks = toRaw(workspace.blocks).map((block) => {
      if (block.blockId !== blockId) return block;

      const list = block.list.map((item) => {
        if (item.itemId !== itemId) return item;
        return { ...item, ...updates };
      });

      return { ...block, list };
    });

    editWorkspace({ workspaceId, blocks });
  };

  const updateBlockListItemChild = (
    workspaceId: string,
    blockId: string,
    parentItemId: string,
    childItemId: string,
    updates: Partial<IWorkspaceBlockListItemData>
  ) => {
    const workspace = workspaces.value.find(
      (p) => p.workspaceId === workspaceId
    );
    if (!workspace) {
      console.warn(`Workspace with id ${workspaceId} not found`);
      return;
    }

    const blocks = toRaw(workspace.blocks).map((block) => {
      if (block.blockId !== blockId) return block;

      const list = block.list.map((item) => {
        if (item.itemId !== parentItemId || !item.children) return item;

        const children = item.children.map((child) => {
          if (child.itemId !== childItemId) return child;
          return { ...child, ...updates };
        });

        return { ...item, children };
      });

      return { ...block, list };
    });

    editWorkspace({ workspaceId, blocks });
  };

  const deleteBlockListItem = (
    workspaceId: string,
    blockId: string,
    itemId: string
  ) => {
    const workspace = workspaces.value.find(
      (p) => p.workspaceId === workspaceId
    );
    if (!workspace) {
      console.warn(`Workspace with id ${workspaceId} not found`);
      return;
    }

    const blocks = toRaw(workspace.blocks).map((block) => {
      if (block.blockId !== blockId) return block;

      const list = block.list.filter((item) => item.itemId !== itemId);
      return { ...block, list };
    });

    editWorkspace({ workspaceId, blocks });
  };

  return {
    workspaces,
    addWorkspace,
    getWorkspace,
    editWorkspace,
    deleteWorkspace,
    updateBlockListItem,
    updateBlockListItemChild,
    deleteBlockListItem,
  };
});
