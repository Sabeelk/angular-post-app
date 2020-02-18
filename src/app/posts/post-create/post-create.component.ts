import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';   // lets us know info about current route
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators, AsyncValidator } from '@angular/forms';
// Remember that we had the wrong event emitter above
// We need bot the EventEmitter asnd the Output to be able to use them in this component

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  // for all built in observables like paramMap do not need to be destroyed
  ngOnInit() {
    this.form = new FormGroup({
      // Initialize the form group in the constructor, single control in the form
      title: new FormControl(null, {validators: [Validators.required,
        Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required,
        Validators.minLength(3)]}),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
        // Set the edit form default here for reactive forms
          this.form.patchValue({
            title: this.post.title,
            content: this.post.content
          });
      });
     } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  // the button logic will be run by this post
  // The form is passed and now angular is handling the post logic
  onSavePost() {
    console.log('Hello World');
    // We check for invalidity before submitting the form
    // if (this.form.invalid) {
    //   return;
    // }
    this.isLoading = true;
    if (this.mode === 'create') {
      // On button press, the event will emit the post out
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }

    // Clear all values so texbox is clear on submission
    // Using the resetform is more efficent
    this.form.reset();
  }
}
