export type Response<T> = {
  message: string;
  code: number;
  data: T
}

export type PageType<T> = {
  list: Array<T>;
  page: number;
  size: number;
  totalSize: number;
  pages: number;
}
