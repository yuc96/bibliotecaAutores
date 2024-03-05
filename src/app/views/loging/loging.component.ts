import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
import { generateRandomToken } from '../../functions/randomToken';
import { ApiService } from '../../servicios/api/api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-loging',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './loging.component.html',
  styleUrl: './loging.component.css'
})
export class LogingComponent {

   constructor(private router:Router,private api:ApiService) {}


   user:string="Usuario1";
   password:string="123456";
   errroMessage:string="";
   stateError:boolean=false;

   stateUser?: boolean;



  logingForm=new FormGroup({
    user:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  });

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) { // Verifica si localStorage está definido
      this.router.navigate(['home']);
    }
  }

  onLoging(){
    const formValue=this.logingForm.value;
    if(formValue?.user===this.user && formValue?.password===this.password){
      this.api.setStateUser(true);
      console.log("State User="+this.api.getStateUser());
      console.log("Credenciales Correctas");
      this.stateError=false;
      localStorage.setItem("token",generateRandomToken(30));
      localStorage.setItem("stateUser",JSON.stringify(true));
      this.router.navigate(['home']);

    }else{

      this.stateError=true;
      this.errroMessage="Credenciales Incorrectas Intentelo Nuevamente";
    }

  }
}
