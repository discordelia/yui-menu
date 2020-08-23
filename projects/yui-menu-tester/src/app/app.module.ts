import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {MenuModule} from "yui-menu";
import {ContextMenuModule} from "@discordelia/contextmenu";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MenuModule,
        ContextMenuModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
