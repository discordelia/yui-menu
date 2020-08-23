import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit{
    title = "yui-menu-tester";

    public disabledTest: boolean = false;

    public testMenuItem(): void {
        console.log("HEY THERE");
    }

    ngOnInit() {
        window.setInterval(() => this.disabledTest = !this.disabledTest, 2000);
    }
}
