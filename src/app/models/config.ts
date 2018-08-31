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
    constructor(
        private InitService: InitService,
    ) {
        this.BASE_URL = document.location.host;
        this.InitService.getJSON().subscribe(data => {
            this.BASE = (data.base);
            this.DATABASE = (data.database);
            this.MEDIA = (data.media);
            this.EXT = (data.ext);
        });
    }
    getConfig() {
        return this;
    }
}
