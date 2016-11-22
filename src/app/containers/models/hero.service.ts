/**
 * Angular2 Module
 */
import { Injectable } from "@angular/core";
import { Headers,Http } from "@angular/http";

/**
 * Rxjs Module
 */
import "rxjs/add/operator/toPromise";

/**
 * Module
 */
import { Hero } from "./hero";

/**
 * 英雄服务提供者
 */
@Injectable()
export class HeroService{
    private heroesUrl="app/heroes";//Webapi url
    constructor(
        private http:Http
    ){}

    /**
     * 获取英雄信息列表
     */
    getHeros():Promise<Hero[]>{
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response=>response.json().data as Hero[])
            .catch(this.handleError);   
    };

    /**
     * 获取指定编号英雄信息
     */
    getHero(id:number){
        return this.getHeros()
            .then(heroes=>heroes.find(hero=>hero.id==id));             
    };

    /**
     * 保存英雄信息
     */
    save(hero:Hero):Promise<Hero>{
        if(hero.id){
            return this.update(hero);
        }
        return this.add(hero);
    };

    /**
     * 删除英雄信息
     */
    delete(hero:Hero){
        let headers=new Headers();
        headers.append("Content-Type","application/json");
        
        let url=`${this.heroesUrl}/${hero.id}`;
        return this.http
            .delete(url,headers)
            .toPromise()
            .catch(this.handleError);
    };

    /**
     * 添加英雄信息
     */
    private add(hero:Hero):Promise<Hero>{
        let headers=new Headers();
        headers.append("Content-Type","application/json");
        
        return this.http
            .post(this.heroesUrl,JSON.stringify(hero),{headers:headers})
            .toPromise()
            .then(res=>res.json().data)
            .catch(this.handleError);
    };

    /**
     * 修改英雄信息
     */
    private update(hero:Hero):Promise<Hero>{
        let headers=new Headers();
        headers.append("Content-Type","application/json");

        let url=`${this.heroesUrl}/${hero.id}`;

        return this.http
            .put(url,JSON.stringify(hero),{headers:headers})
            .toPromise()
            .then(()=>hero)
            .catch(this.handleError);
    }
    /**
     * 处理异常
     */
    private handleError(error:any){
        console.log("异常消息:",error);
        return Promise.reject(error.message||error);
    };
}