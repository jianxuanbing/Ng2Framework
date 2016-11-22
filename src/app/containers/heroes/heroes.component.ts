/**
 * Angular2 Module
 */
import { Component } from "@angular/core";
import { Router } from "@angular/router";

/**
 * Customer Module  
 */ 
import { AppState } from "../../components/BaseComponent/app.service";

/**
 * Models
 */
import { Hero } from "../models/hero";
import { HeroService } from "../models/hero.service";

@Component({
    selector:"my-heroes",
    templateUrl:"heroes.component.html",
    styleUrls:["heroes.component.css"]
})
export class HeroesComponent{
    heroes:Hero[];
    selectedHero:Hero;
    addingHero=false;
    error:any;

    constructor(
        private heroService:HeroService,
        private router:Router
    ){}

    /**
     * 选择英雄
     */
    onSelect(hero:Hero){
        this.selectedHero=hero;
        this.addingHero=false;
    };

    /**
     * 获取英雄信息列表
     */
    getHeroes(){
        this.heroService.getHeros()
            .then(heroes=>this.heroes=heroes)
            .catch(error=>this.error=error);
    };

    /**
     * 取消保存英雄
     */
    close(saveHero:Hero){
        this.addingHero=false;
        if(saveHero){
            this.getHeroes();
        }
    }

    /**
     * 删除英雄信息
     */
    deleteHero(hero:Hero,event:any){
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(res=>{
                this.heroes=this.heroes.filter(h=>h!==hero);
                if(this.selectedHero===hero){
                    this.selectedHero==null;
                }
            })
            .catch(error=>this.error=error);
    };

    /**
     * ng初始化
     */
    ngOnInit(){
        this.getHeroes();
    };

    /**
     * 查看明细
     */
    gotoDetail(){
        let link=["/detail",this.selectedHero.id];
        this.router.navigate(link);
    };

    /**
     * 添加英雄信息
     */
    addHero(){
        this.addingHero=true;
        this.selectedHero==null;
    }
}