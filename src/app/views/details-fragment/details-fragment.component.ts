import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { CommonModule } from '@angular/common';
import { Listtile } from '../../models/title.interface';
import { Router } from '@angular/router';
import { ListFragmentAuthor } from '../../models/fragmentAuthor.interface';

@Component({
  selector: 'app-details-fragment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-fragment.component.html',
  styleUrl: './details-fragment.component.css'
})

export class DetailsFragmentComponent {

  title?:any;
  author?:any;

  fragment:ListFragmentAuthor[]=[];

  constructor(private api:ApiService,private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {

    let encodeURLtitle="";
    this.author=this.api.author;

    this.title=this?.route.snapshot.paramMap.get('title');

    encodeURLtitle=encodeURIComponent(this.title);

    if (this.author.trim() !== '') {

      this.api.getAllFragmentAuthor(encodeURIComponent(this.title)).subscribe(data => {

        this.fragment = data.filter(fragment =>
          fragment.author.toLowerCase().includes(this.author.trim().toLowerCase())

        );
      });
    }

  }
}
