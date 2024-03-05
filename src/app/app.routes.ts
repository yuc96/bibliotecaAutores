import { Routes } from '@angular/router';
import { LogingComponent } from './views/loging/loging.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';
import { DetailsComponent } from './views/details/details.component';
import { DetailsFragmentComponent } from './views/details-fragment/details-fragment.component';
import { FavouritesComponent } from './views/favourites/favourites.component';

export const routes: Routes = [
  {
    path:'loging',
    component:LogingComponent
  },
  {
    path:'',
    redirectTo:'loging',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'details/:details',
    component:DetailsComponent
  },
  {
    path:'detailsfragment/:title',
    component: DetailsFragmentComponent
  },
  {
    path:'favourites',
    component: FavouritesComponent
  },
  {
    path: '**', // decorador, en caso de que una url no sea válida te renderizara el componente deseado en este caso PageNotFoundComponent
    component: NotFoundPageComponent,
  }
];
