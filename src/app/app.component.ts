// This is the parent component for adding posts, so funnel posts through here
import { Component } from '@angular/core';

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
    // Take this received form the event Output and push tbhe post object to posts
    this.storedPosts.push(post);
  }
}

