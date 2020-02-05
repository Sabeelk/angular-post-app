import { Post } from './post.model';
export class PostService {
    // we don't want to allow editing of posts from the outside
    private posts: Post[] = [];

    // This function lets us retrieve posts
    getPosts() {
        // This is an advanced javascript feature
        // We use the brackets and the ... to make a copy,
        // not the reference of the array in memory
        return [...this.posts];
    }

    // This function is called to add posts to the posts array
    addPost(addTitle: string, addContent: string) {
        const tempPost: Post = { title: addTitle, content: addContent };
        this.posts.push(tempPost);
    }


}
