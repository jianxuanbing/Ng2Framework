/**
 * Angular2 Module
 */
import { Component } from "@angular/core";
import { Router } from "@angular/router";

/**
 * Models
 */
import { Hero } from "../models/hero";
import { HeroService } from "../models/hero.service";

/**
 * 仪表盘组件
 */
@Component({
    selector:"my-dashboard",
    templateUrl:"dashboard.component.html",
    styleUrls:["dashboard.component.css"]
})
export class DashboardComponent{
    heroes:Hero[]=[];
    constructor(
        private heroService:HeroService,
        private router:Router
    ){}

    /**
     * ng初始化
     */
    ngOnInit(){
        this.heroService.getHeros()
            .then(heroes=>this.heroes=heroes.slice(1,5));        
    };

    /**
     * 查看详情
     */
    gotoDetail(hero:Hero){
        let link=["/detail",hero.id];
        this.router.navigate(link);
    }
}