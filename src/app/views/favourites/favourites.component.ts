import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ListFavourites } from '../../models/favourites.interface';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {

  favourites: ListFavourites = {
    authors: [],
    title: []
  };

  numberFavourites?:number;


  ngOnInit(): void {
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

}
