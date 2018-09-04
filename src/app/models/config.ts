import { InitService } from '../services/init.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Config {
    Authorization: string = null;
    BASE_URL: string = null;
    BASE = {};
    DATABASE = {};
    MEDIA = {};
    EXT = {};
    NEXT = false;
    constructor(
        private InitService: InitService,
    ) {
        this.BASE_URL = document.location.host;
        this.InitService.getJSON().subscribe(data => {
            this.NEXT = true;
            this.BASE = (data.base);
            this.DATABASE = (data.database);
            this.MEDIA = (data.media);
            this.EXT = (data.ext);  
        });
       
    }
    getConfig() {
        for(var i = 1000000000000000000000000 ; i > 0 ; i--){
            if(this.NEXT == true) break;
            console.log(i);
            console.log(this.NEXT);
        }
        return this;
    }
 
    
}
