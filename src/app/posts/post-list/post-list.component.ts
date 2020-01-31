import { Component, OnInit, Input } from '@angular/core';
// We want this to b e the input for the event so  import input

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // Can only bind input from the parent component
  @Input() posts = [

  ];

  constructor() { }

  ngOnInit() { }

}
