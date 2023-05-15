import { Post, Comment, PostRequest } from '@domain/models/forum.model';

export abstract class ForumGateway {
  abstract getForums(postInfo: PostRequest): Promise<any>;
  abstract postForum(forum: Post): Promise<boolean>;
  abstract commentForum(comment: Comment): Promise<boolean>;
  abstract forumsThreads(page: string): Promise<any>;
}
