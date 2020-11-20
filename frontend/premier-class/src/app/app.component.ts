import { Component } from '@angular/core';
import { PeliculaService } from './services/pelicula.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'premier-class';
  public pelicula: Array<any> = [] 

  constructor (
    private peliculaService: PeliculaService
  ) {
    
    this.peliculaService.getPeliculas().subscribe((resp: any) =>{
      this.pelicula = resp 
    })

  }

}
