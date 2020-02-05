import { Post } from './post.model';
import { Subject } from 'rxjs';
// Subject is used for event emitting, but more general. We want to use it for getPosts

export class PostService {
    // we don't want to allow editing of posts from the outside
    private posts: Post[] = [];
    // This variable is used to send posts array out, an event emitter
    private postsUpdated = new Subject<Post[]>();

    // This function lets us retrieve posts
    getPosts() {
        // This is an advanced javascript feature
        // We use the brackets and the ... to make a copy,
        // not the reference of the array in memory
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
