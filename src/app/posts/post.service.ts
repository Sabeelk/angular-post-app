import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Subject is used for event emitting, but more general. We want to use it for getPosts

@Injectable({ providedIn: 'root' })
export class PostService {
    // we don't want to allow editing of posts from the outside
    private posts: Post[] = [];
    // This variable is used to send posts array out, an event emitter
    private postsUpdated = new Subject<Post[]>();

    // We must inject the Http Client in order ot use it in the service
    constructor(private http: HttpClient) {}

    // This function lets us retrieve posts
    getPosts() {
        // we want to rework this serve request to send a request to the server
        // need to susbscribe to the server, to receieve information
        // no need to store and unsubscribe because angular does it for us
        // The get here is of a generic type, and get chnages the json to ur data
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
            .subscribe((postData) => {
                this.posts = postData.posts;
                this.postsUpdated.next([...this.posts]);
            });
    }

    // This function listens anytime the Subject is updated and emits it
    getPostsUpdatedListener() {
        return this.postsUpdated.asObservable();
    }

    // This function is called to add posts to the posts array
    addPost(addTitle: string, addContent: string) {
        const tempPost: Post = { id: null, title: addTitle, content: addContent};

        // sending a post request so use .post
        // send the data in the post parameters
        this.http.post<{message: string}>('http://localhost:3000/api/posts', tempPost)
            .subscribe((responseData) => {
                console.log(responseData.message);
                this.posts.push(tempPost);
                this.postsUpdated.next([...this.posts]);
            });
    }
}
