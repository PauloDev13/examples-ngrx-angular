import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IPost } from '../../interfaces/post.interface';
import { TAppState } from '../../store/app.state';
import { updatePost } from '../state/posts.actions';
import { selectPostByIdMulti } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  editForm!: FormGroup;
  post!: IPost;
  postSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private store: Store<TAppState>,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const id = params.id;
      this.postSubscription = this.store
        .select(selectPostByIdMulti({ id }))
        .subscribe((data) => {
          if (data) {
            this.post = data;
            this.createForm();
          }
        });
    });
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }

    const post: IPost = {
      ...this.editForm.value,
      id: this.post.id,
    };

    this.store.dispatch(updatePost({ post }));
    this.route.navigate(['/posts']).then();
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

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
