import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from '../post.model';
import { PostService } from '../post.service';
// We want this to be the input for the event so import input
import { Subscription } from 'rxjs';
// Need this to suscribe to the posts service and not keep subscription alive

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // Can only bind input from the parent component
  posts: Post[] = [];
  // The subscription needs to be an object sp we can unsibscribe later
  private postSub: Subscription;
  isLoading = false;
  // Variables used to hold information for the paginator module
  totalPosts = 10;
  postsPerPage = 3;
  pageSizeOption = [2, 3, 5];

  // The Service should be declared in the constructor
  constructor(public postService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    // postService is now some invisible member variable and need to be called inititally
    this.postService.getPosts();
    // This subscribe function takes a function argument that gets executed whenever new data is emitted
    // subscribe takes the posts as an argument because it recieves the posts array from the service in the next()
    // subscriptions we create should be destroyed when we the component is not live
    this.postSub = this.postService.getPostsUpdatedListener()
      .subscribe( (posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onPageChange(pageData: PageEvent) {
    console.log(pageData);
  }

  ngOnDestroy() {
    // This will now disengage the service whenever the component is gone, prevents memory leak
    this.postSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

}
