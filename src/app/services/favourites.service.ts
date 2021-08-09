import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Favourite } from '../interface/favourite';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private favouritesCollection: AngularFirestoreCollection<Favourite>;

  constructor(private afs: AngularFirestore) {
    this.favouritesCollection = this.afs.collection<Favourite>('Favourites');
  }

  addFavourite(favourite: Favourite) {
    return this.favouritesCollection.add(favourite);
  }

  async getFavouriteById(idFav: string){
    return this.favouritesCollection.doc<Favourite>(idFav).valueChanges();
  }

  getFavourites(){
    return this.favouritesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, ...data};
        })
      })
    );
  }

  delFavourite(id:string){
    return this.favouritesCollection.doc(id).delete();
  }

}
