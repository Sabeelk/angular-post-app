import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// Subject is used for event emitting, but more general. We want to use it for getPosts
// map allows us to map returned elemnts like in java
import { Router } from '@angular/router';
// Router can be used in the service to force page change

@Injectable({ providedIn: 'root' })
export class PostService {
    // we don't want to allow editing of posts from the outside
    private posts: Post[] = [];
    // This variable is used to send posts array out, an event emitter
    private postsUpdated = new Subject<Post[]>();

    // We must inject the Http Client in order ot use it in the service
    constructor(private http: HttpClient, private router: Router) {}

    // This function lets us retrieve posts
    getPosts() {
        // need to susbscribe to the server, to receieve information
        // no need to store and unsubscribe because angular does it for us
        // The get here is of a generic type, and get chnages the json to ur data
        // we can use the observables to convert the data we get back before it's assigned
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {     // used map on an array of posts
                    return {
                        id: post._id,
                        title: post.title,
                        content: post.content,
                    };
                });
            }))
            .subscribe((convertedData) => {
                this.posts = convertedData;
                this.postsUpdated.next([...this.posts]);
            });
    }

    // method for getting a single post
    // Does not need to call to the database because the posts should already be loaded
    // just search the array of current posts
    getPost(id: string) {
        return this.http.get<{ _id: string; title: string; content: string }>(
            'http://localhost:3000/api/posts/' + id);
      }

    updatePost(inputId: string, inputTitle: string, inputContent: string) {
        const post: Post = { id: inputId, title: inputTitle, content: inputContent};
        this.http.put('http://localhost:3000/api/posts/' + inputId, post)
            .subscribe(rData => {
                const newPosts = [...this.posts];
                const oldPostIndex = newPosts.findIndex(p => p.id === post.id);
                newPosts[oldPostIndex] = post;
                this.posts = newPosts;
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
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
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', tempPost)
            .subscribe((responseData) => {
                console.log(responseData.message);
                // here we will handle the first postID error
                const id = responseData.postId;
                tempPost.id = id;
                this.posts.push(tempPost);
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });
    }

    deletePost(postId: string) {
        // see the plus sign here to make it part of the url for the request
        // tslint:disable-next-line: quotemark
        this.http.delete("http://localhost:3000/api/posts/" + postId)
            .subscribe((responseData) => {
                // filter out the deleted posts and update posts array then send it out
                const upDatedPosts = this.posts.filter(post => post.id !== postId);
                this.posts = upDatedPosts;
                this.postsUpdated.next([...this.posts]);
            });
    }
}
