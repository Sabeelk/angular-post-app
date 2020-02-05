import { Component, EventEmitter, Output,  OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
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
  // Here we will create an event emitter, the type must be declafred as @Output
  @Output() postCreated = new EventEmitter<Post>();

  constructor(public postService: PostService) {}

  // the button logic will be run by this post
  // The form is passed and now angular is handling the post logic
  onAddPost(form) {
    // We check for invalidity before submitting the form
    if (form.invalid) {
      return;
    }
    const post = {
      title: form.value.postTitle,
      content: form.value.postContent
    };
    // On button press, the event will emit the post out
    this.postCreated.emit(post);

    // Clear all values
    // this.postTitle = '';
    // this.postContent = '';

  }

  ngOnInit() {
  }

}
