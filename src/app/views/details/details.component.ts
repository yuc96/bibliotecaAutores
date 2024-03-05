import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { CommonModule } from '@angular/common';
import { Listtile } from '../../models/title.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  author?:any;
  title:Listtile[]=[];

  constructor(private api:ApiService,private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {

    this.author=this?.route.snapshot.paramMap.get('details');

    let encodeURLauthor=encodeURIComponent(this.author);

    this.api.getAllTitle(encodeURLauthor).subscribe(data=>{
      console.log(data);
      this.title=data;
    })
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
