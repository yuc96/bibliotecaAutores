import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ListFavourites } from '../../models/favourites.interface';
import { ApiService } from '../../servicios/api/api.service';
import { Listtile } from '../../models/title.interface';
import { ListFragmentAuthor } from '../../models/fragmentAuthor.interface';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {

  constructor(private api:ApiService){};

  favourites: ListFavourites = {
    authors: [],
    title: []
  };

  numberFavourites?:number;
  title:Listtile[]=[];
  title1?:any;
  author?:any;

  fragment:ListFragmentAuthor[]=[];


  ngOnInit(): void {
    this.setObjectFavourites();
  }

  setObjectFavourites(){
    const storedData = localStorage.getItem('favouritesUser');

    // Verificar si existe algún dato almacenado
    if (storedData) {
      // Convertir la cadena JSON de localStorage de nuevo a un objeto JavaScript
      this.favourites = JSON.parse(storedData);
      //Obtengo en n'umero total de Favoritos
      this.numberFavourites=this.favourites.authors.length+this.favourites.title.length;
      console.log(this.favourites);
    } else {
      console.log('No se encontraron datos almacenados en localStorage.');
    }
  }

  removeFavouriteAuthor(author:string){

    this.api.removeFavouriteAuthor(author);
    this.setObjectFavourites();
    this.title=[];

  }
  removeFavouriteTitle(title:string){

    this.api.removeFavouriteTitle(title);
    this.setObjectFavourites();
    this.fragment=[];

  }

  detailsAuthor(author:string){
    this.api.getAllTitle(author).subscribe(data=>{
      console.log(data);
      this.title=data;
    })
  }

  detailsTitle(title:string){

    this.api.getAllFragmentAuthor(encodeURIComponent(title)).subscribe(data => {

      this.fragment = data;
    });

  }

}
