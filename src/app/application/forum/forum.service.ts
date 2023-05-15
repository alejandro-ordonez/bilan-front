import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@frameworks/config/Constants';
import { ForumGateway } from '@domain/gateways/forum.gateway';
import { UserGateway } from '@domain/gateways/user.gateway';
import { Post, Comment, PostRequest } from '@domain/models/forum.model';
import { Response } from '@domain/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class ForumService extends ForumGateway {
  constructor(private http: HttpClient, private userAuth: UserGateway) {
    super();
  }

  buildConfig() {
    const token = this.userAuth.getToken();
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return options;
  }

  getForums(postInfo: PostRequest): Promise<any> {
    const config = this.buildConfig();

    return new Promise<any>((resolve, reject) => {
      this.http
        .get<Response>(
          API.baseUrl +
            API.forum.get
              .replace('{{postId}}', postInfo.id)
              .replace('{{page}}', postInfo.page),
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }

  postForum(forum: Post): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = this.buildConfig();
      this.http
        .post<Response>(API.baseUrl + API.forum.post, forum, options)
        .subscribe(
          (response: Response) => {
            const data: boolean = response.result;
            resolve(data);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  commentForum(comment: Comment): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = this.buildConfig();
      this.http
        .post<Response>(API.baseUrl + API.forum.comment, comment, options)
        .subscribe(
          (response: Response) => {
            const data: boolean = response.result;
            resolve(data);
          },
          () => {
            reject(null);
          }
        );
    });
  }

  forumsThreads(page: string): Promise<any> {
    const config = this.buildConfig();

    return new Promise<any>((resolve, reject) => {
      this.http
        .get<Response>(
          API.baseUrl + API.forum.threads.replace('{{page}}', page),
          config
        )
        .subscribe(
          (response: Response) => {
            resolve(response.result);
          },
          (err: any) => {
            reject(err.error);
          }
        );
    });
  }
}
