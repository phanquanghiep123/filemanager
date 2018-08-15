import {InitService} from '../services/init.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
    providedIn: 'root'
})
export class Config {
    Authorization : string = null;
    BASE_URL : string = null;
    constructor (
        private InitService : InitService, 
    ){
        this.BASE_URL = document.location.host;
        this.InitService.getJSON().subscribe(data => {
            console.log(data);
        })
    }
    setConfig  (){

    }
    
}
