import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';   // lets us know info about current route
import { Post } from '../post.model';
// Remember that we had the wrong event emitter above
// We need bot the EventEmitter asnd the Output to be able to use them in this component

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postTitle = '';
  postContent = '';
  private mode = 'create';
  private postId: string;
  editPost: Post;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  // for all built in observables like paramMap do not need to be destroyed
  ngOnInit() {
    // component doesn;t change when the route chnages to edit
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId'); // isolate the postId
        this.editPost =  this.postService.getPost(this.postId);
        this.postTitle = this.editPost.title;
        this.postContent = this.editPost.content;
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  // the button logic will be run by this post
  // The form is passed and now angular is handling the post logic
  onSavePost(form) {
    // We check for invalidity before submitting the form
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      // On button press, the event will emit the post out
      this.postService.addPost(form.value.postTitle, form.value.postContent);
    } else {
      this.postService.updatePost(this.postId, form.value.postTitle, form.value.postContent);
    }

    // Clear all values so texbox is clear on submission
    // Using the resetform is more efficent
    form.resetForm();
  }
}
