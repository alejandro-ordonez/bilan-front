export class Post {
  title: string;
  content: string;
}

export class Comment {
  postId: number | string;
  content: string;
}

export class PostRequest {
  id: string;
  page: string;
}
