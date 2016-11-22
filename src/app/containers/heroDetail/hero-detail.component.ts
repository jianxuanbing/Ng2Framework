/**
 * Angular2 Module
 */
import { Component,Input,Output,EventEmitter } from "@angular/core";
import { ActivatedRoute,Params } from "@angular/router";

/**
 * Models
 */
import { Hero } from "../models/hero";
import { HeroService } from "../models/hero.service";

/**
 * 英雄详情组件
 */
@Component({
    selector:"my-hero-detail",
    templateUrl:"hero-detail.component.html",
    styleUrls:["hero-detail.component.css"]
})
export class HeroDetailComponent{
    @Input() hero:Hero;
    @Output() close=new EventEmitter();
    error:any;
    navigated=false;

    constructor(
        private heroService:HeroService,
        private route:ActivatedRoute
    ){}

    /**
     * ng初始化
     */
    ngOnInit(){
        this.route.params.forEach((params:Params)=>{
            if(params["id"]!==undefined){
                let id=+params["id"];
                this.navigated=true;
                this.heroService.getHero(id)
                    .then(hero=>this.hero=hero);
            }else{
                this.navigated=false;
                this.hero=new Hero();
            }
        });
    };

    /**
     * 回退
     */
    goBack(saveHero:Hero=null){
        this.close.emit(saveHero);
        if(this.navigated){
            window.history.back();
        }
    };

    /**
     * 保存
     */
    save(){
        console.log(this.hero);
        this.heroService
            .save(this.hero)
            .then(hero=>{
                this.hero=hero;
                this.goBack(hero);
            })
            .catch(error=>this.error=error);
    };
}