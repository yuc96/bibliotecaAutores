import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router:Router,private api:ApiService) {}

  private stateUserSubscription?: Subscription;
  stateUser?: boolean;


  ngOnInit(): void {
    this.stateUserSubscription = this.api.getStateUserObservable().subscribe(newState => {
      this.stateUser = newState;
    });
    this.stateUser =this.api.getStateUser();
  }

  ngOnDestroy(): void {
    this.stateUserSubscription?.unsubscribe(); // Aquí se cancela la suscripción
  }

  LogOut(){
    // Verifica si localStorage está definido y si hay un token guardado
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
        // Elimina el token guardado
        localStorage.removeItem('token');
        // El valor StateUser guardado en el storage lo cambio a false
        this.api.setStateUser(false);
        this.router.navigate(['loging']);
    }

  }


}
