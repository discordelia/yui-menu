import {Component} from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    title = "yui-menu-tester";
    public testMenuItem(): void {
        console.log("HEY THERE");
    }
}
