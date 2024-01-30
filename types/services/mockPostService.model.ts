export interface MockPostResponse {
  posts: MockPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface MockPost {
  id?: number;
  title: string;
  body: string;
  userId: number;
  tags?: string[];
  reactions?: number;
}

export interface MockAddPostResponse {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface MockAddPostError {
  message: string;
}

export interface MockAddPostBody {
  userId: number;
  title: string;
  body: string;
}