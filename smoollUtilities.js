if (smoollUtilities === undefined) {
    var su = "smoollUtilities";
    var menu = l("menu");

    var smoollUtilities = {
        optionsMenu: function() {
            let str = `<div class="subsection" style="padding:0px">
                           "<div class="title">
                               ${su}
                               <div class="listing">
                                   ${Game.WritePrefButton("neverCollapseUpgradeMenu", "ncumButton", "Never Collapse Upgrade Menu", "Never Collapse Upgrade Menu")}
                                   <label>Open upgrade menu fully and never collapse it, even if cursor is not hovering over menu</label>
                               </div>
                           </div>
                       </div>`;

            let menuDiv = document.createElement("div");
            menuDiv.innerHTML = `<div class="block" style="padding:0px;margin:8px 4px;">
                                    ${str}
                                 </div>`;

            //let str = `<div class="block" style="padding:0px;margin:8px 4px;">
            //               <div class="subsection" style="padding:0px">
            //                   ${this.collapsibleMenu("smoollUtilities", "Hello, test!")}
            //               </div>
            //           </div>`;

            if (Game.ShowMenu()) {
                menu.appendChild(menuDiv);
                //menu.insertAdjacentHTML("afterend", smoollUtilities.optionsMenu());
            }
        }
    };
}

Game.registerMod(su, {
    // Global variables
    init: function() {
        Game.Notify(su, "This \"smooll\" (get it? 'cause it's small) mod has been loaded!", [16, 5]);

        if (Game.UpdateMenu()) {
            menu.insertAdjacentHTML("afterbegin", smoollUtilities.optionsMenu());
        }
    },

    save: function() {
        
    },

    load: function(str) {
        
    }
});
