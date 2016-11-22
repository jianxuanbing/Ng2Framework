/**
 * Angular2 Module
 */
import { Routes,RouterModule } from "@angular/router";

/**
 * Customer Router
 */
import { HeroesComponent } from "./containers/heroes/heroes.component";
import { HeroDetailComponent } from "./containers/heroDetail/hero-detail.component";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { HeroSearchComponent } from "./containers/heroSearch/hero-search.component";


import { DataResolver } from "./components/BaseComponent/app.resolver";

export const ROUTES:Routes=[
    {
        path:"",
        redirectTo:"/dashboard",
        pathMatch:"full"
    },{
        path:"heroes",
        component:HeroesComponent
    },{
        path:"dashboard",
        component:DashboardComponent
    },{
        path:"detail/:id",
        component:HeroDetailComponent
    }
]