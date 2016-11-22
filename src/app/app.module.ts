import { NgModule,ApplicationRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { HttpModule,XHRBackend } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
//内存WebApi，用于模拟数据
import { InMemoryBackendService,SEED_DATA} from 'angular2-in-memory-web-api';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from "./app.routes";

// App is our top level component
import { App } from "./components/BaseComponent/app.component";
import { APP_RESOLVER_PROVIDERS } from './components/BaseComponent/app.resolver';
import { AppState, InteralStateType } from './components/BaseComponent/app.service';

/**
 * Customer Module
 */
import { HeroesComponent } from "./containers/heroes/heroes.component";
import { HeroDetailComponent } from "./containers/heroDetail/hero-detail.component";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { HeroSearchComponent } from "./containers/heroSearch/hero-search.component";

/**
 * Customer Providers
 */
import { HeroService } from "./containers/models/hero.service";
import { InMemoryDataService} from './in-memory-data.service';

/**
 * Application wide providers(应用提供者)
 */
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  HeroService,
  {provide:XHRBackend,useClass:InMemoryBackendService},//in-mem server
  {provide:SEED_DATA,useClass:InMemoryDataService}//in-mem server data
];

/**
 * 仓储类型
 */
type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * 声明的APP应用
 */
const APP_DECLARATIONS=[
    App,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroSearchComponent
];

/**
 * 导入的模块
 */
const MODULE_IMPORTS=[
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES,{useHash:true})
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap:[App],
    declarations:APP_DECLARATIONS,
    imports:MODULE_IMPORTS,//import Angular's modules        
    providers:[// expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        APP_PROVIDERS        
    ]
})
export class AppModule {
    constructor(
        public appRef:ApplicationRef,
        public appState:AppState
    ){}

    hmrOnInit(store:StoreType){
        if(!store||!store.state){
            return;
        }
        console.log("HMR store",JSON.stringify(store,null,2));
        //设置状态
        this.appState._state=store.state;
        //设置输入的值
        if("restoreInputValues" in store){
            let restoreInputValues=store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store:StoreType){
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        //保存状态
        const state = this.appState._state;
        store.state = state;
        //创建根节点
        store.disposeOldHosts = createNewHosts(cmpLocation);
        //保存输入的值
        store.restoreInputValues  = createInputTransfer();
        //移除样式
        removeNgStyles();
    }

    hmrAfterDestroy(store:StoreType){
        //显示新的元素
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}