import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class PeliculaService {
    _url = 'access-control-allow-origin: http://localhost:3000/films'
    constructor(
        private http: HttpClient
    ) { 
        console.log('Servicio peliculas');
    }
    getPeliculas(){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json')

    return this.http.get(this._url, {
        headers: header
    });
    }
}


