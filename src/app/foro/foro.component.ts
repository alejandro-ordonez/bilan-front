import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ForumUseCase } from '@domain/usecases/forum.usecase';
import { PostRequest } from '@domain/models/forum.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss'],
})
export class ForoComponent implements OnInit {
  foro: any;
  page: string = '0';
  id: string = '0';

  commenting: boolean = false;
  createCommentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private forum: ForumUseCase
  ) {
    this.createCommentForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.page = params.page;
      this.id = params.id;
      this.getForum({
        id: this.id,
        page: (Number(this.page) - 1).toString(),
      });
    });
  }

  async getForum(postRequest: PostRequest) {
    let allForos = await this.forumPage(postRequest.page);
    this.foro = allForos.find((foro: { id: string }) => foro.id == this.id);
    let comments = await this.forum.getForums(postRequest);
    this.foro.comments = comments.data;
  }

  async forumPage(page: string) {
    let forums = await this.forum.forumsThreads(page);
    return forums.data;
  }

  async createComment() {
    try {
      await this.forum.commentForum({
        postId: this.id,
        content: this.createCommentForm.value.content,
      });

      this.createCommentForm.reset();
      await this.getForum({
        id: this.id,
        page: (Number(this.page) - 1).toString(),
      });
      alert('Comentario creado con exito!');
    } catch (error) {
      alert('Lo sentimos, Error creando comentario, intentalo luego');
    }
  }
}
