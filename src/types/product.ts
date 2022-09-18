export interface ProductSearch {
  type_product?: string | number;
}

export interface ProductPayload {
  type_product?: string | number;
}

export interface ProductSearchResult {
  data: Array<Record<string, any>>;
}
