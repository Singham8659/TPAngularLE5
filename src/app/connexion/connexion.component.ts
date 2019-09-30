import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  constructor(private pokemonService: AuthenticationService, private router: Router) { }

  login: string;
  password: string;

  ngOnInit() {
  }

  onConfirm() {
    this.pokemonService.logIn(this.login, this.password).subscribe(result => {
      console.log(result);
      if(result == "success"){
        localStorage.setItem("connected", "true"),
        this.router.navigate(["/pokedex"]);
      }
    })
  }
}
