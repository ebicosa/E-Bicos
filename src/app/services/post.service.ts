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

  getPostWithOptions(options:any){
    let collections = this.postsCollection;
    let collection:any = undefined;
    Object.keys(options).forEach(function(chave) {
      let valor = options[chave];
      if(!(valor === 'undefined' || valor === undefined))
        if(collection == undefined){
          collection = collections.ref.where(chave, '==', valor);
        }
        else{
          collection = collection.where(chave, '==', valor);
        }
    })
    let posts:any = [];
    if(!(collection === undefined)){
      collection = collection.get();
      collection.then(snapshot =>{
        snapshot.docs.forEach(doc => {
          posts.push(doc.data());
        });
      });
    }
    else return undefined;
    return posts;
  }

  updatePost(id: string, post:Post){
    return this.postsCollection.doc<Post>(id).update(post);
  }

  deletePost(id:string){
    return this.postsCollection.doc(id).delete();
  }  

}
