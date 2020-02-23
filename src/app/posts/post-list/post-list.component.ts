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
  totalPosts = 0;
  postsPerPage = 3;
  currentPage = 1;
  pageSizeOption = [2, 3, 5];

  // The Service should be declared in the constructor
  constructor(public postService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    // postService is now some invisible member variable and need to be called inititally
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    // This subscribe function takes a function argument that gets executed whenever new data is emitted
    // subscribe takes the posts as an argument because it recieves the posts array from the service in the next()
    // subscriptions we create should be destroyed when we the component is not live
    this.postSub = this.postService.getPostsUpdatedListener()
      .subscribe( (postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false;               // once subcription return the loading bar leaves
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }

  onPageChange(pageData: PageEvent) {
    this.isLoading = true;
    // values are updating as we click the paginator
    this.currentPage = pageData.pageIndex + 1;  // The page index starts at 0
    this.postsPerPage = pageData.pageSize;

    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    // This will now disengage the service whenever the component is gone, prevents memory leak
    this.postSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

}
