var menu = document.getElementById("menu");

if (smoollUtilities === undefined) {
    var smoollUtilities = {
        // Mod variables
        name: "smoollUtilities",
        version: "0.1",

        init: function() {
            const CCUpdateMenu = Game.UpdateMenu;

            Game.UpdateMenu = function() {
                CCUpdateMenu();

                smoollUtilities.optionsMenu();
                smoollUtilities.statsMenu();
            };

            Game.Notify(smoollUtilities.name, "This \"smooll\" (get it? 'cause it's small) mod has been loaded!", [16, 5], 3);
        },

        save: function() {
            // look at all this code!
        },

        load: function(str) {
            // and here's even more of it!
        },

        // Mod functions
        optionsMenu: function() {
            if (Game.onMenu == "prefs") {
                let div = document.createElement("div");
                div.className = "block";
                div.style.padding = "0px";
                div.style.margin = "8px 4px";
                div.innerHTML = `<div class="subsection" style="padding:0px;">
                                     <div class="title">
                                         ${this.name}
                                     </div>
                                     <div class="listing">
                                         ${Game.WritePrefButton("neverCollapseUpgradeMenu", "ncumButton", "Never Collapse Upgrade Menu", "Never Collapse Upgrade Menu")}
                                         <label>Open upgrade menu fully and never collapse it, even if cursor is not hovering over menu</label>
                                     </div>
                                </div>`;

                if (menu) {
                    menu.childNodes[3].after(div);
                }
            }
        },

        statsMenu: function() {
            if (Game.onMenu == "stats") {
                let div = document.createElement("div");
                div.className = "listing";
                div.innerHTML = `<b>${this.name}:</b> ${this.version}`;

                if (menu) {
                    let menuNode = document.getElementsByClassName("subsection")[0];
                    menuNode.childNodes[3].after(div);
                    //let generalNode = general.parentElement;
                    //generalNode.lastElementChild.after(div);
                }
            }
        }
    };
}

Game.registerMod(smoollUtilities.name, smoollUtilities);
