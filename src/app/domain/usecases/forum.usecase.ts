import { Injectable } from '@angular/core';
import { ForumGateway } from '@domain/gateways/forum.gateway';

import { Post, Comment, PostRequest } from '@domain/models/forum.model';

@Injectable({
  providedIn: 'root',
})
export class ForumUseCase {
  constructor(private forumGateway: ForumGateway) {}

  getForums(postInfo: PostRequest): Promise<any> {
    return this.forumGateway.getForums(postInfo);
  }
  postForum(forum: Post): Promise<boolean> {
    return this.forumGateway.postForum(forum);
  }
  commentForum(comment: Comment): Promise<boolean> {
    return this.forumGateway.commentForum(comment);
  }
  forumsThreads(page: string): Promise<any> {
    return this.forumGateway.forumsThreads(page);
  }
}
