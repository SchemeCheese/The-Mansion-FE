interface AddItemPayload {
  items: Array<Record<string, any>>;
  reservation_detail_id: string;
  reservation_id: string;
}

interface DeleteItemPayload {
  sale_detail_ids: Array<Record<string, any>>;
}

export interface AddItem {
  payload: AddItemPayload;
}

export interface DeleteItem {
  payload: DeleteItemPayload;
}
