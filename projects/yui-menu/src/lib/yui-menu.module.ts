import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {YuiMenuBarComponent} from "./components/yui-menu-bar/yui-menu-bar.component";
import {YuiMenuComponent} from "./components/yui-menu/yui-menu.component";
import {YuiContextMenuModule} from "@discordelia/contextmenu";


@NgModule({
    declarations: [YuiMenuBarComponent, YuiMenuComponent],
    imports: [
        CommonModule,
        YuiContextMenuModule
    ],
    exports: [
        YuiMenuBarComponent,
        YuiMenuComponent
    ]
})
export class YuiMenuModule {
}
