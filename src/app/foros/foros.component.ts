import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ForumUseCase } from '@domain/usecases/forum.usecase';
import { Post } from '@domain/models/forum.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { User } from '@domain/models/user.model';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';

@Component({
  selector: 'app-foros',
  templateUrl: './foros.component.html',
  styleUrls: ['./foros.component.scss'],
})
export class ForosComponent implements OnInit {
  page: string = '0';
  index: number = 0;
  sizeForum: boolean = false;
  forums: any;
  createForumForm: FormGroup;
  user: User;
  isStudent: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private forum: ForumUseCase,
    private userData: UserDataUseCase,

  ) {
    this.createForumForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.page = params.page;
      this.index = Number(params.page);
      this.forumPage(this.page);
      
      this.getUserData();
    });
  }

  async forumPage(page: string | number) {
    page = Number(page) - 1;
    this.forums = await this.forum.forumsThreads(page.toString());
    if(this.forums.data.length > 0 ){
      this.sizeForum = true;
    }
  }

  async createForum() {
    try {
      await this.forum.postForum({
        title: this.createForumForm.value.title,
        content: this.createForumForm.value.content,
      });

      this.createForumForm.reset();
      this.forumPage(this.page);
      alert('Foro creado con exito!');
    } catch (error) {
      alert('Lo sentimos, Error creando foro, intentalo luego');
    }
  }

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }

  private async getUserData() {
    this.user = await this.userData.info();
    // this.isStudent = this.user.userType !== 'Student';
    if(this.user.userType === 'Student'){
      this.isStudent = true;
    }else this.isStudent = false;
  }
}
