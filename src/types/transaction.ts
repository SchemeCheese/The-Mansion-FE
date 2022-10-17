interface AddItemPayload {
  items: Array<Record<string, any>>;
  reservation_detail_id: string;
  reservation_id: string;
}

interface DeleteItemPayload {
  sale_detail_ids: Array<Record<string, any>>;
}

interface ChangeDiskPayload {
  sale_detail_ids: Array<Record<string, any>>;
  storage_id: string | number;
}

export interface AddItem {
  payload: AddItemPayload;
}

export interface DeleteItem {
  payload: DeleteItemPayload;
}

export interface ChangeDisk {
  payload: ChangeDiskPayload;
}
