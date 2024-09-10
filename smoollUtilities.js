var su = "smoollUtilities";
var menu = l("menu");

Game.registerMod(su, {
    optionsMenu: function() {
        let html = `<div class="block" style="padding:0px;margin:8px 4px;">
                       <div class="subsection" style="padding:0px">
                           <div class="title">
                               ${su}
                               <div class="listing">
                                   ${Game.WritePrefButton("neverCollapseUpgradeMenu", "ncumButton", "Never Collapse Upgrade Menu", "Never Collapse Upgrade Menu")}
                                   <label>Open upgrade menu fully and never collapse it, even if cursor is not hovering over menu</label>
                               </div>
                           </div>
                       </div>
                   </div>`;

        // let div = document.createElement("div");
        // div.innerHTML = html;

        // menu.appendChild(div);

        if (menu) {
            menu.insertAdjacentHTML("beforeend", html);
        }

        Game.UpdateMenu();

        console.log("Hello, this is an options menu test");

        // let menuDiv = document.createElement("div");
        // menuDiv.innerHTML = `<div class="block" style="padding:0px;margin:8px 4px;">
        //                         ${str}
        //                      </div>`;

        // if (menu) {
        //     menu.appendChild(menuDiv);
        // }

        //let str = `<div class="block" style="padding:0px;margin:8px 4px;">
        //               <div class="subsection" style="padding:0px">
        //                   ${this.collapsibleMenu("smoollUtilities", "Hello, test!")}
        //               </div>
        //           </div>`;

        //menu.insertAdjacentHTML("afterend", smoollUtilities.optionsMenu());
    },

    init: function() {
        Game.registerHook("check", this.optionsMenu);

        Game.Notify(su, "This \"smooll\" (get it? 'cause it's small) mod has been loaded!", [16, 5]);

        // while(Game.UpdateMenu()) {
        //     if (Game.onMenu == "prefs") {
        //         console.log("smoollUtilities.optionsMenu()");
        //     }
        // }

        // if (Game.UpdateMenu()) {
        //     smoollUtilities.optionsMenu();
        // }

        // if (Game.onMenu == "prefs") {
        //     Game.UpdateMenu();
        //     //menu.appendChild(menuDiv);
        //     l("menu").insertAdjacentHTML("beforeend", smoollUtilities.optionsMenu());
        // }

        // if (Game.UpdateMenu()) {
        //     menu.insertAdjacentHTML("afterbegin", smoollUtilities.optionsMenu());
        // }
    },

    save: function() {
        
    },

    load: function(str) {
        
    }
});
