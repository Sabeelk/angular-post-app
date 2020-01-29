import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  newPost = '';
  enteredValue = '';

  constructor() {
  }

  // the button logic will be run by this post
  onAddPost() {
    this.newPost = this.enteredValue;
  }

  ngOnInit() {
  }

}
