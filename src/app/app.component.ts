import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogingComponent } from './views/loging/loging.component';
import { HomeComponent } from './views/home/home.component';
import { DetailsComponent } from './views/details/details.component';
import { DetailsFragmentComponent } from './views/details-fragment/details-fragment.component';
import { FooterComponent } from './template/footer/footer.component';
import { HeaderComponent } from './template/header/header.component';
import { FavouritesComponent } from './views/favourites/favourites.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LogingComponent
            ,HomeComponent,FavouritesComponent,
            DetailsComponent,DetailsFragmentComponent,
            FooterComponent,HeaderComponent

          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Autores';
}
