import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MenuBarComponent} from "./components/menu-bar/menu-bar.component";
import {MenuComponent} from "./components/menu/menu.component";
import {ContextMenuModule} from "@discordelia/contextmenu";


@NgModule({
    declarations: [MenuBarComponent, MenuComponent],
    imports: [
        CommonModule,
        ContextMenuModule
    ],
    exports: [
        MenuBarComponent,
        MenuComponent
    ]
})
export class MenuModule {
}
