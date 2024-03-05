import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { CommonModule } from '@angular/common';
import { Listtile } from '../../models/title.interface';
import { Router } from '@angular/router';
import { ListFavourites } from '../../models/favourites.interface';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {


  private stateUserSubscription?: Subscription;
  stateUser?: boolean;

  author?:any;
  title:Listtile[]=[];

  favourites: ListFavourites = {
    authors: [],
    title: []
  };

  authorsArray?:string[]=[];


  constructor(private api:ApiService,private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {

    this.setObjectFavourites();

    this.author=this?.route.snapshot.paramMap.get('details');

    let encodeURLauthor=encodeURIComponent(this.author);

    this.stateUserSubscription = this.api.getStateUserObservable().subscribe(newState => {
      this.stateUser = newState;
    });
    this.stateUser =this.api.getStateUser();

    this.api.getAllTitle(encodeURLauthor).subscribe(data=>{
      console.log(data);
      this.title=data.filter(author=>!this.authorsArray?.includes(author.title))
    })

    // if(this.stateUser===true){
    //   this.title=this.title.filter(author=>!this.authorsArray?.includes(author.title))
    // }

  }


  setObjectFavourites(){
    const storedData = localStorage.getItem('favouritesUser');
    if (storedData) {
      this.favourites = JSON.parse(storedData);
      this.authorsArray=this.favourites.authors;
      console.log(this.favourites);
    } else {
      console.log('No se encontraron datos almacenados en localStorage.');
    }
  }

  TitleDetail(title:string){

    console.log(title);
    this.api.updateAuthor(this.author);
    this.router.navigate(['detailsfragment/',title]);

  }

  AddFavourites(title:string){
  console.log(title);
  this.api.setFavouriteTitle(title);
  }

}
