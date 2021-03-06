import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {PostCreateRequest} from "../Http/Request/PostCreateRequest";
import {Post} from "../Entity/Post";
import {PostUpdateRequest} from "../Http/Request/PostUpdateRequest";

@Injectable()
export class PostRESTService
{
    constructor(private http: HttpClient) {}

    public getById(postId: number): Observable<Post>
    {
        let url = `/post/${postId}/get-by-id`;

        return this.http
            .get<Post>(url, {withCredentials: true})
        ;
    }

    public create(postCreateRequest: PostCreateRequest): Observable<Post>
    {
        let url = `/protected/post/create`;

        return this.http
            .put<Post>(url, postCreateRequest, {withCredentials: true})
        ;
    }

    public update(postUpdateRequest: PostUpdateRequest): Observable<Post>
    {
        let url = `/protected/post/update`;

        return this.http
            .post<Post>(url, postUpdateRequest, {withCredentials: true})
        ;
    }
    
    public favorite(post: Post): Observable<Post>
    {
        let url = `/protected/post/save`;
        post.favorite = !post.favorite;
        
        return Observable.of(post).timeout(2250)
    }
}