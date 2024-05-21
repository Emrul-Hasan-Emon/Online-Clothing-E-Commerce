import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUr: string = 'comment';

  constructor(
    private http: HttpClient
  ) { }

  public fetchCommentForProduct(productId: number) {
    return this.http.get(`${this.baseUr}/${productId}`);
  }

  public insertCommentForProduct(productId: number, userId: number, gender: string, comment: string) {
    const commentObj = {
      ProductID: productId,
      UserID: userId,
      Gender: gender,
      Comment: comment
    };
    return this.http.post(`${this.baseUr}/insert`, commentObj);
  }
}
