import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts = [
    {title: 'post 1', content: 'My name is Sabeel Kazi'},
    {title: 'post 2', content: 'My name is Sandell Kazi'},
    {title: 'post 3', content: 'My name is Samwel Tarley'},
  ];

  constructor() { }

  ngOnInit() { }

}
