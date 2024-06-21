export interface StoreType {
  id: number;
  phone?: string | null;
  address?: string | null;
  lat?: string | null;
  lng?: string | null;
  name?: string | null;
  category?: string | null;
  storeType?: string | null;
  foodCertifyName?: string | null;
  likes?: LikesInterface[];
}

export interface LikesInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreType;
}

export interface LikeApiResponse {
  page?: number;
  data: LikesInterface[];
  totalPage?: number;
}

export interface StoreApiResponse {
  page?: number;
  data: StoreType[];
  totalCount?: number;
  totalPage?: number;
}

export interface LocationType {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export interface SearchType {
  q?: string;
  district?: string;
}
