// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

//AngularJs 2
import "@angular/platform-browser";
import "@angular/platform-browser-dynamic";
import "@angular/core";
import "@angular/common";
import "@angular/forms";
import "@angular/http";
import "@angular/router";

//AngularClass
import "@angularclass/hmr";

//RxJS
import "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';


// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
if("production"===ENV){
    //Production
}else{
    //Development
}

