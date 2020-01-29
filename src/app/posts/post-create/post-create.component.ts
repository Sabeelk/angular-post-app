import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor() {
  }
  // the cunton here
  onAddPost() {
    alert('The post has been done');
  }

  ngOnInit() {
  }

}
