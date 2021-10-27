import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IPostModel } from '~/posts/models/post-model';
import { PostsEntityService } from '~/posts/services/posts-entity.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  addForm: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private postsEntityService: PostsEntityService,
    private router: Router,
  ) {
    this.addForm = this.createAddForm();
  }

  ngOnInit(): void {}

  createAddForm() {
    return this.formBuild.group({
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }

  onAddPost() {
    if (this.addForm.invalid) {
      return;
    }
    const post: IPostModel = this.addForm.value;
    this.postsEntityService.add(post);
    this.router.navigate(['/posts-new']).then();
    // this.postsEntityService.add(post).subscribe(() => {
    //   this.router.navigate(['/posts-new']).then();
    // });
  }

  showDescriptionErrors(): string {
    const descriptionForm = this.addForm.controls.description;
    let msg = '';
    if (descriptionForm.touched && !descriptionForm.valid) {
      if (descriptionForm.errors?.required) {
        msg = 'Descrição é obrigatória';
      }
      if (descriptionForm.errors && !descriptionForm.errors?.required) {
        msg = 'Descrição deve ter no mínimo 10 caracteres';
      }
    }
    return msg;
  }
}
