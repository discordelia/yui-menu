import {AfterContentInit, AfterViewInit, Component, ContentChildren, HostListener, Input, OnInit, QueryList} from "@angular/core";
import {MenuComponent} from "../menu/menu.component";
import {IContextMenuData, IMenuChangeEvent, IMenuCloseEvent, IMenuItem, IMenuOpenEvent} from "@discordelia/contextmenu";
import {ActiveDescendantKeyManager} from "@angular/cdk/a11y";

@Component({
    selector: "yui-menu-bar",
    templateUrl: "./menu-bar.component.html",
    styleUrls: ["./menu-bar.component.scss"]
})
export class MenuBarComponent implements OnInit, AfterContentInit, AfterViewInit {

    private keyManager: ActiveDescendantKeyManager<MenuComponent>;
    public currentMenu: MenuComponent;
    public menuChangeData: IMenuChangeEvent;
    public previousMenuData: IContextMenuData;
    public previousMenuElement: HTMLLIElement;
    @ContentChildren(MenuComponent) menuList: QueryList<MenuComponent>;
    @Input() menuClass: string = "";

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterContentInit() {
        console.log(this.menuList);
    }

    ngAfterViewInit() {
        this.keyManager = new ActiveDescendantKeyManager<MenuComponent>(this.menuList.toArray()).withWrap(true).skipPredicate(m => m.disabled);
    }

    public onMenuChange(data: IMenuChangeEvent): void {
        this.menuChangeData = data;
    }

    public onMenuClose(data: IMenuCloseEvent): void {
        this.keyManager.setActiveItem(null);
        this.previousMenuData = null;
        if (!!this.currentMenu) {
            this.currentMenu.focused = false;
            this.currentMenu = null;
        }
        this.menuChangeData = null;
    }

    public onMenuClick(event: MouseEvent, menu: MenuComponent): void {
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

    public onMenuMouseEnter(event: MouseEvent, menu: MenuComponent): void {
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

    public onMenuMouseLeave(event: MouseEvent, menu: MenuComponent): void {
        // this.currentMenu = null;
        // menu.focused = false;
        // this.keyManager.setActiveItem(null);
    }

    public onMenuOpen(data: IMenuOpenEvent): void {
        if (data.depth > 0) {
            return;
        }
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
