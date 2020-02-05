import { Component, OnInit } from '@angular/core';
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

  constructor(public postService: PostService) {}

  // the button logic will be run by this post
  // The form is passed and now angular is handling the post logic
  onAddPost(form) {
    // We check for invalidity before submitting the form
    if (form.invalid) {
      return;
    }

    // On button press, the event will emit the post out
    this.postService.addPost(form.value.postTitle, form.value.postContent);

    // Clear all values so texbox is clear on submission
    // Using the resetform is more efficent
    form.resetForm();
  }

  ngOnInit() {
  }

}
