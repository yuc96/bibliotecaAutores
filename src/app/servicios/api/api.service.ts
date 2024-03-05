import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListAuthors } from '../../models/authors.interface';
import { Listtile } from '../../models/title.interface';
import { ListFragmentAuthor } from '../../models/fragmentAuthor.interface';
import { BehaviorSubject } from 'rxjs';
import { ListFavourites } from '../../models/favourites.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private stateUserSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private favouritesSubject: BehaviorSubject<ListFavourites> = new BehaviorSubject<ListFavourites>({
    authors: [],
    title: []
  });

  constructor(private http: HttpClient) {}

  url = "https://poetrydb.org/";
  author = "";

  ngOnInit(): void {
    this.stateUserSubject = new BehaviorSubject<boolean>(this.getStateUser());
    this.favouritesSubject= new  BehaviorSubject<ListFavourites>(this.setFavourites());
  }

  getAllAuthors(): Observable<ListAuthors> {
    let direction = this.url + "author";
    return this.http.get<ListAuthors>(direction);
  }

  getAllTitle(author1: string): Observable<Listtile[]> {
    let direction = this.url + "author" + "/" + author1 + "/" + "title";
    return this.http.get<Listtile[]>(direction);
  }

  getAllFragmentAuthor(title: string): Observable<ListFragmentAuthor[]> {
    let direction = this.url + "title" + "/" + title;
    return this.http.get<ListFragmentAuthor[]>(direction);
  }

  updateAuthor(author: string) {
    this.author = author;
  }

  getStateUser(): boolean {
    const stateUser = localStorage.getItem('stateUser');
    return stateUser ? JSON.parse(stateUser) : false;
  }

  setStateUser(newState: boolean): void {
    localStorage.setItem('stateUser', JSON.stringify(newState));
    this.stateUserSubject.next(newState);
  }

  getStateUserObservable() {
    return this.stateUserSubject.asObservable();
  }

  // Métodos para agregar Favoritos

    setFavourites() {
      const favourites = localStorage.getItem('favouritesUser');
      return favourites ? JSON.parse(favourites) :{
        authors: [],
        title: []
      } ;
  }

  setFavouriteAuthor(author: string): void {
    this.favouritesSubject= new  BehaviorSubject<ListFavourites>(this.setFavourites());
    const favourites = this.favouritesSubject.getValue();
    if (!favourites.authors.includes(author)) {
      favourites.authors.push(author);
      this.updateFavourites(favourites);
    }
  }

  setFavouriteTitle(title: string): void {
    this.favouritesSubject= new  BehaviorSubject<ListFavourites>(this.setFavourites());
    const favourites = this.favouritesSubject.getValue();
    if (!favourites.title.includes(title)) {
      favourites.title.push(title);
      this.updateFavourites(favourites);
    }
  }

  removeFavouriteAuthor(author: string): void {
    this.favouritesSubject= new  BehaviorSubject<ListFavourites>(this.setFavourites());
    const favourites = this.favouritesSubject.getValue();
    const index = favourites.authors.indexOf(author);
    if (index !== -1) {
      favourites.authors.splice(index, 1);
      this.updateFavourites(favourites);
    }
  }

  removeFavouriteTitle(title: string): void {
    this.favouritesSubject= new  BehaviorSubject<ListFavourites>(this.setFavourites());
    const favourites = this.favouritesSubject.getValue();
    const index = favourites.title.indexOf(title);
    if (index !== -1) {
      favourites.title.splice(index, 1);
      this.updateFavourites(favourites);
    }
  }

  private updateFavourites(favourites: ListFavourites): void {
    this.favouritesSubject.next(favourites);
    localStorage.setItem('favouritesUser', JSON.stringify(favourites));
  }
}
