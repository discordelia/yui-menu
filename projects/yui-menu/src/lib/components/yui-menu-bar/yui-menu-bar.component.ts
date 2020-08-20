import {AfterContentInit, AfterViewInit, Component, ContentChildren, HostListener, OnInit, QueryList} from "@angular/core";
import {YuiMenuComponent} from "../yui-menu/yui-menu.component";
import {IContextMenuData, IMenuChangeEvent, IMenuCloseEvent, IMenuItem, IMenuOpenEvent} from "@discordelia/contextmenu";
import {ActiveDescendantKeyManager} from "@angular/cdk/a11y";

@Component({
    selector: "yui-menu-bar",
    templateUrl: "./yui-menu-bar.component.html",
    styleUrls: ["./yui-menu-bar.component.scss"]
})
export class YuiMenuBarComponent implements OnInit, AfterContentInit, AfterViewInit {

    private keyManager: ActiveDescendantKeyManager<YuiMenuComponent>;
    public currentMenu: YuiMenuComponent;
    public menuChangeData: IMenuChangeEvent;
    public previousMenuData: IContextMenuData;
    public previousMenuElement: HTMLLIElement;
    @ContentChildren(YuiMenuComponent) menuList: QueryList<YuiMenuComponent>;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterContentInit() {
        console.log(this.menuList);
    }

    ngAfterViewInit() {
        this.keyManager = new ActiveDescendantKeyManager<YuiMenuComponent>(this.menuList.toArray()).withWrap(true);
    }

    public onMenuChange(data: IMenuChangeEvent): void {
        console.log(data);
        this.menuChangeData = data;
    }

    public onMenuClose(data: IMenuCloseEvent): void {
        // console.log(data);
        this.keyManager.setActiveItem(null);
        this.previousMenuData = null;
        if (!!this.currentMenu) {
            this.currentMenu.focused = false;
            this.currentMenu = null;
        }
        this.menuChangeData = null;
    }

    public onMenuClick(event: MouseEvent, menu: YuiMenuComponent): void {
        if (this.previousMenuElement === (event.target as HTMLElement).closest(`[data-uid='${menu.uid}']`)) {
            menu.focused = !menu.focused;
            if (!menu.focused) {
                this.previousMenuData?.contextMenuRef.popupRef.close();
            }
            return;
        }
        this.previousMenuElement = (event.target as HTMLElement).closest("li").firstChild as HTMLLIElement;
        this.keyManager.setActiveItem(this.menuList.find(m => m.uid === menu.uid));
        this.currentMenu = menu;
    }

    public onMenuMouseEnter(event: MouseEvent, menu: YuiMenuComponent): void {
        if (this.previousMenuData) {
            if (this.previousMenuElement === (event.target as HTMLElement).closest(`[data-uid='${menu.uid}']`)) {
                return;
            }
            this.previousMenuData?.contextMenuRef.popupRef.close();
            event.target.dispatchEvent(new MouseEvent("click", {...event}));
            this.keyManager.setActiveItem(this.menuList.find(m => m.uid === menu.uid));
        }
        this.previousMenuElement = (event.target as HTMLElement).closest("li").firstChild as HTMLLIElement;
        this.currentMenu = menu;

    }

    public onMenuMouseLeave(event: MouseEvent, menu: YuiMenuComponent): void {
        // this.currentMenu = null;
        // menu.focused = false;
        // this.keyManager.setActiveItem(null);
    }

    public onMenuOpen(data: IMenuOpenEvent): void {
        if (data.depth > 0) {
            return;
        }
        // console.log(data);
        this.previousMenuData = data;
    }

    @HostListener("window:keydown", ["$event"])
    public onKeydown(event: KeyboardEvent): void {
        if (!this.previousMenuData) {
            return;
        }
        switch (event.key) {
            case "Enter":
            case "NumEnter":
            case " ":
                this.keyManager.setActiveItem(null);
                return;
            case "ArrowUp":
            case "ArrowDown":
                console.log("Ignore " + event.key);
                return;
            case "ArrowLeft":
                if (this.menuChangeData?.depth > 1) {
                    return;
                }
                this.keyManager.setPreviousItemActive();
                break;
            case "ArrowRight":
                if (this.menuChangeData?.item.menuItems?.length > 0) {
                    return;
                }
                this.keyManager.setNextItemActive();
                break;
            default:
                this.keyManager.onKeydown(event);
                break;
        }
        if (this.keyManager.activeItem) {
            this.currentMenu = this.keyManager.activeItem;
            document.querySelector(`[data-uid='${this.currentMenu.uid}']`).dispatchEvent(new MouseEvent("mouseenter"));
        }
    }
}
