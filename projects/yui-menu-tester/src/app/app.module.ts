import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {YuiMenuModule} from "yui-menu";
import {YuiContextMenuModule} from "@discordelia/contextmenu";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        YuiMenuModule,
        YuiContextMenuModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
