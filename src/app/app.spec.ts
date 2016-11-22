import {
  inject,
  TestBed
} from '@angular/core/testing';


// Load the implementations that should be tested
import { App } from "./components/BaseComponent/app.component";
import { AppState } from './components/BaseComponent/app.service';

describe("App",()=>{
  // provide our implementations or mocks to the dependency injector
  beforeEach(()=>{
      TestBed.configureTestingModule({
        providers:[
          AppState,
          App
        ]})});
  it("should work",inject([App],()=>{
    let fixture=TestBed.createComponent(App);
    expect(fixture.componentInstance instanceof App).toBe(true,"should create AppComponent");
  }));
});

