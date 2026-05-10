import type { Post } from "./post";

/**
 * 共通のレスポンス型定義
 */
type Pagination = {
  current_page: number;
  total_pages: number;
  total_count: number;
  limit: number;
};

type ApiResponse<T> = {
  data: T;
  pagination: Pagination;
};

/**
 * APIのレスポンス型定義
 */

// 投稿API
export type PostsResponse = ApiResponse<Post[]>;
