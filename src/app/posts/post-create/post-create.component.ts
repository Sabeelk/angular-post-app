import { Component, EventEmitter, Output,  OnInit } from '@angular/core';
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
  @Output() postCreated = new EventEmitter();

  constructor() {
  }

  // the button logic will be run by this post
  onAddPost() {
    const post = {
      title: this.postTitle,
      content: this.postContent
    };
    const str = 'hello';
    // On button press, the event will emit the post out
    this.postCreated.emit(post);

  }

  ngOnInit() {
  }

}
