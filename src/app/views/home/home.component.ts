import { Component } from '@angular/core';
import { ListAuthors } from '../../models/authors.interface';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  constructor(private api:ApiService, private router:Router) { };

  private stateUserSubscription?: Subscription;
  stateUser?: boolean;


  ngOnDestroy(): void {
    this.stateUserSubscription?.unsubscribe(); // Aquí se cancela la suscripción
  }

  ListAuthors:string []=[];

   ngOnInit(): void {

     this.api.getAllAuthors().subscribe(data=>{

       this.ListAuthors=data.authors;
       console.log(this.ListAuthors);

     })

     this.stateUserSubscription = this.api.getStateUserObservable().subscribe(newState => {
      this.stateUser = newState;
    });
    this.stateUser =this.api.getStateUser();

   }

   AuthorDetail(author:string){

      console.log(author);
      this.router.navigate(['details/',author]);

   }

   AddFavourites(author:string){
     console.log(author);
     this.api.setFavouriteAuthor(author);
   }

}
