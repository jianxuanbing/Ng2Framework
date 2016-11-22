import { Injectable } from "@angular/core";
import { Http,Response } from "@angular/http";

import { Hero } from "../models/hero";

/**
 * 英雄查询服务
 */
@Injectable()
export class HeroSearchService{
    constructor(
        private http:Http
    ){}

    /**
     * 查询英雄
     */
    search(term:string){
        return this.http
            .get(`app/heroes/?name=${term}`)
            .map((r:Response)=>r.json().data as Hero[]);
    }
}