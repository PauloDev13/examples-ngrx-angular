import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { TPost } from '~/interfaces/post.interface';
import { addPost } from '~/post/state/posts.actions';
import { TAppState } from '~/store/app.state';
import { setLoadingSpinner } from '~/store/shared/shared.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  addForm: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private store: Store<TAppState>,
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
    const post: TPost = {
      ...this.addForm.value,
    };
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(addPost({ post }));
    this.router.navigate(['/posts']).then();
  }

  // clearAddForm() {
  //   this.addForm.reset();
  // }

  showDescriptionErrors(): string {
    const descriptionForm = this.addForm.controls.description;
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
