export enum DialogSizes {
  big = "95%",
  medium = "75%",
  small = "50%",
  extraSmall = "30%",
}
  
export enum Actions {
  create = "create",
  edit = "edit",
  list = "list",
  delete = "delete",
}

export interface DialogOptions {
  id?: string;
  action?: Actions;
  url?: string;
}