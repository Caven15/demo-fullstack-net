import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  private _apiUrl : string = "https://jsonplaceholder.typicode.com/posts"

  constructor(private _http : HttpClient) { }

  // CRUD

  // GET ALL
  RecupererPosts() : Observable<Post[]> {
    return this._http.get<Post[]>(this._apiUrl);
  }

  // CREATE

  // UPDATE
  ModifPost(post : Post) : Observable<Post>{
    console.log("envoie du post sur le service");
    console.log(post);
    return this._http.put<Post>(`${this._apiUrl}/${post.id}`,post);
  }

  // DELETE
}
