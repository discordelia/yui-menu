# yui-menu

A simple menu bar component for Angular 9+.

_Documentation is work in progress._

# WARNING

* This component is written with Angular 9, so it will not work with earlier versions of Angular
* Internet Explorer is not supported.
* No RTL support.
* Partial keyboard support.
* This is a simple component I implemented for my personal project, so I cannot guarantee you with frequent updates/bug fixes.

# Installation

* Install the following packages:
    
```
npm i @angular/cdk uuid @discordelia/popup @discordelia/contextmenu @discordelia/menu
```

* Add the following line to your global stylesheet file (styles.scss)
    
```
@import "~@angular/cdk/overlay-prebuilt.css";
```

* Import **MenuModule** in your app.module.ts file (or another module where you need it.)

# Usage

## Basic Usage

```html
<yui-menu-bar>
    <yui-menu text="File">
        <yui-menu-item text="New" subtext="Ctrl+N"></yui-menu-item>
        <yui-menu-item text="Open Recent">
            <yui-menu-item text="yui-menu"></yui-menu-item>
            <yui-menu-item text="yui-contextmenu"></yui-menu-item>
        </yui-menu-item>
        <yui-menu-item text="Save As" subtext="Ctrl+S"></yui-menu-item>
    </yui-menu>
    <yui-menu text="Edit">
        <yui-menu-item text="Cut" subtext="Ctrl+X"></yui-menu-item>
        <yui-menu-item text="Copy" subtext="Ctrl+C"></yui-menu-item>
        <yui-menu-item text="Paste" subtext="Ctrl+V"></yui-menu-item>
        <yui-menu-item [divider]="true"></yui-menu-item>
        <yui-menu-item text="Undo Typing" subtext="Ctrl+Z"></yui-menu-item>
    </yui-menu>
    <yui-menu text="View">
        <yui-menu-item text="Tool Windows">
            <yui-menu-item text="Commit"></yui-menu-item>
            <yui-menu-item text="Project"></yui-menu-item>
        </yui-menu-item>
        <yui-menu-item text="Appearance">
            <yui-menu-item text="Enter Presentation Mode"></yui-menu-item>
            <yui-menu-item text="Enter Distraction Free Mode"></yui-menu-item>
        </yui-menu-item>
    </yui-menu>
    <yui-menu text="Navigate">
        <yui-menu-item text="Back"></yui-menu-item>
        <yui-menu-item text="Forward" [disabled]="true"></yui-menu-item>
        <yui-menu-item [divider]="true"></yui-menu-item>
        <yui-menu-item text="Search Everywhere"></yui-menu-item>
        <yui-menu-item [divider]="true"></yui-menu-item>
        <yui-menu-item text="Class"></yui-menu-item>
        <yui-menu-item text="File"></yui-menu-item>
        <yui-menu-item text="Symbol"></yui-menu-item>
        <yui-menu-item text="Line/Column"></yui-menu-item>
    </yui-menu>
</yui-menu-bar>
```

**yui-menu-bar** accepts the following inputs.

```typescript
menuClass : You can pass a string of css classes to help you style the menu.
theme     : You can pass 'light' or 'dark' to set the theme.
```


**yui-menu** accepts the following inputs.

```typescript
text      : Menu text
menuClass : You can pass a string of css classes to help you style the menu. Overrides the one from yui-menu-bar.
```

* Inside yui-menu tag, you can define multiple yui-menu-item components.
* Inside yui-menu-item tag, you can define multiple yui-menu-item components for a submenu.
* If, for example, you passed **'export-menu'** as menuClass input, you can then use the following code to help you style the menu.

```scss
yui-contextmenu-content.export-menu {
    /* Your style rules */
}
```

**yui-menu-item** accepts the following inputs and outputs. (Same with yui-contextmenu from @discordelia/contextmenu package.)

```typescript
disabled: boolean                    // Disable a menu item.
divider: boolean                     // Set a menu item as divider. When set to true, all other options are ignored.
event: MouseEvent                    // Set the triggering event. Only used when the target changes dynamically.
icon: string;                        // Icon class for menu item. For example, you can pass a font icon class such as 'fa fa-plus'. Ignored when iconTemplate option is set.
iconTemplate: TemplateRef<any>;      // Pass a template reference to show as menu item icon.
image: string;                       // Image url for menu item icon. Ignored when iconTemplate option is set.
menuSelect: EventEmitter<IMenuItem>; // Called when a menu item is selected. 
text: string;                        // Menu item text. Ignored when textTemplate option is set.
textTemplate: TemplateRef<any>;      // Pass a template reference to show as menu item text.
toggleable: boolean;                 // Pass true if you want to make the menu item toggleable.
toggled: boolean;                    // Set toggle status of menu item. This is a two-way binding. [(toggled)]
visible: boolean;                    // Set false to hide a menu item.
```

# Known Issues
**menuClass** input does not work properly.

# License

MIT
