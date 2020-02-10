import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// Subject is used for event emitting, but more general. We want to use it for getPosts

export class PostService {
    // we don't want to allow editing of posts from the outside
    private posts: Post[] = [];
    // This variable is used to send posts array out, an event emitter
    private postsUpdated = new Subject<Post[]>();

    // We must inject the Http CLient in order ot use it in the service
    constructor(private http: HttpClient) {}

    // This function lets us retrieve posts
    getPosts() {
        // we want to rework this serve request to sedn a request to the server
        return [...this.posts];
    }

    // This function listens anytime the Subject is updated and emits it
    getPostsUpdatedListener() {
        return this.postsUpdated.asObservable();
    }

    // This function is called to add posts to the posts array
    addPost(addTitle: string, addContent: string) {
        const tempPost: Post = { title: addTitle, content: addContent };
        this.posts.push(tempPost);
        this.postsUpdated.next(this.posts);
    }


}
