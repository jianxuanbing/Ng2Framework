import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { HeroSearchService } from "./hero-search.service";
import { Hero } from "../models/hero";

/**
 * 英雄查询组件
 */
@Component({
    selector:"hero-search",
    templateUrl:"hero-search.component.html",
    styleUrls:["hero-search.component.css"],
    providers:[HeroSearchService]
})
export class HeroSearchComponent{
    heroes:Observable<Hero[]>;
    private searchTerms=new Subject<string>();

    constructor(
        private heroSearchService:HeroSearchService,
        private router:Router
    ){}

    /**
     * 查询英雄
     * Push a search term into the observable stream.
     */
    search(term:string){
        this.searchTerms.next(term);
    };

    /**
     * ng初始化
     */
    ngOnInit(){
        this.heroes=this.searchTerms
            .debounceTime(0)// wait for 300ms pause in events
            .distinctUntilChanged()// ignore if next search term is same as previous
            .switchMap(term=>term// switch to new observable each time
                // return the http search observable
                ?this.heroSearchService.search(term)
                // or the observable of empty heroes if no search term
                :Observable.of<Hero[]>([]))
            .catch(error=>{
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
    };

    /**
     * 查看详情
     */
    gotoDetail(hero:Hero){
        let link=["/detail",hero.id];
        this.router.navigate(link);
    };
}