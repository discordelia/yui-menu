import {AfterContentInit, Component, ContentChildren, Input, OnDestroy, OnInit, QueryList, TemplateRef} from "@angular/core";
import {MenuItemComponent} from "@discordelia/contextmenu";
import {IMenuItem} from "@discordelia/contextmenu";
import {Subscription} from "rxjs";
import {v4} from "uuid";
import {Highlightable} from "@angular/cdk/a11y";

@Component({
    selector: "yui-menu",
    template: "",
    styles: []
})
export class MenuComponent implements OnInit, AfterContentInit, Highlightable, OnDestroy {

    public readonly uid: string = v4();
    private subMenuItemsSubscription$: Subscription;
    public focused: boolean = false;
    @ContentChildren(MenuItemComponent) subMenuItems: QueryList<MenuItemComponent>;
    @Input() disabled: boolean = false;
    @Input() menuClass: string;
    @Input() menuItems: IMenuItem[] = [];
    @Input() target: HTMLElement;
    @Input() text: string;
    @Input() textTemplate: TemplateRef<any>;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.subMenuItemsSubscription$?.unsubscribe();
    }

    ngAfterContentInit() {
        if (this.menuItems?.length > 0) {
            return;
        }
        this.createMenuItems();
        this.initializeMenuItems(this.menuItems);
        this.subMenuItemsSubscription$ = this.subMenuItems.changes.subscribe(() => {
            this.createMenuItems();
            this.initializeMenuItems(this.menuItems);
        });
    }

    public setActiveStyles(): void {
        if (!this.disabled) {
            this.focused = true;
        }
    }

    public setInactiveStyles(): void {
        this.focused = false;
    }

    private createMenuItems(): void {
        if (!this.menuItems || this.menuItems.length === 0) {
            this.menuItems = this.subMenuItems.map(smi => smi.getMenuItemData() as IMenuItem);
        }
    }

    private initializeMenuItems(items: IMenuItem[]): void {
        items.forEach(item => {
            item.visible = item.visible !== false;
            this.initializeMenuItems(item.menuItems?.length > 0 ? item.menuItems as IMenuItem[] : []);
        });
    }

}
