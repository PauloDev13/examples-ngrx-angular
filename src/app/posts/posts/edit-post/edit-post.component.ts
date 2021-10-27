import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IPostModel } from '~/posts/models/post-model';
import { PostsEntityService } from '~/posts/services/posts-entity.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  editForm: FormGroup;
  id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private postsEntityService: PostsEntityService,
  ) {
    this.editForm = this.createForm();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.postsEntityService.entities$.subscribe((posts) => {
      if (posts.length) {
        const { title, description } = posts.find(
          (post) => post.id === this.id,
        ) as IPostModel;
        this.editForm.patchValue({
          title,
          description,
        });
      }
    });
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }
    const postData = { ...this.editForm.value, id: this.id };
    this.postsEntityService.update(postData);
    this.route.navigate(['/posts-new']).then();
  }

  showDescriptionErrors(): string {
    const descriptionForm = this.editForm.controls.description;
    let msg = '';
    if (descriptionForm.touched && !descriptionForm.valid) {
      if (descriptionForm.errors?.required) {
        msg = 'Description is required';
      }
      if (descriptionForm.errors && !descriptionForm.errors?.required) {
        msg = 'Description should be minimum 10 characters';
      }
    }
    return msg;
  }
}
