// This is the parent component for adding posts, so funnel posts through here
import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angApp';

  // We need an array to hold the posts once they are made
  // They then need to be passed to the post-list component
  storedPosts = [];
  onAddPost(post) {
    // Take this received from the event Output and push the post object to posts
    // The post Array will be given to the post list component to display
    this.storedPosts.push(post);
  }
}

