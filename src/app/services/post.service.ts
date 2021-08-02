import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Post } from '../interface/post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsCollection: AngularFirestoreCollection<Post>;

  constructor(private afs: AngularFirestore) { 

    this.postsCollection = this.afs.collection<Post>('Posts');
  }

  getPosts(){
    return this.postsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, ...data};
        })
      })
    );
  }

  addPost(post:Post){
    return this.postsCollection.add(post);
  }

  async getPost(id:string){
    return this.postsCollection.doc<Post>(id).valueChanges();
  }

  updatePost(id: string, post:Post){
    return this.postsCollection.doc<Post>(id).update(post);
  }

  deletePost(id:string){
    return this.postsCollection.doc(id).delete();
  }  

}
