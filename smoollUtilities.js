//TODO: prevent upgrade menu from collapsing when "Never Collapse Upgrade Menu" is set
//TODO: save and load state of "Never Collapse Upgrade Menu"
//TODO: add collapsible button
//TODO: add version history to "Info" menu (which I need the collapsible button for)

var menu = document.getElementById("menu");

if (smoollUtilities === undefined) {
    var smoollUtilities = {
        // Mod variables
        name: "smoollUtilities",
        version: "0.1",

        // Functions required for this (and every other) mod to work
        init: function() {
            const CCUpdateMenu = Game.UpdateMenu;

            Game.UpdateMenu = function() {
                CCUpdateMenu();

                smoollUtilities.optionsMenu();
                smoollUtilities.statsMenu();
            };

            Game.Notify(this.name, "This \"smooll\" (get it? 'cause it's small) mod has been loaded!", [16, 5], 3);
        },

        save: function() {
            // look at all this code!
        },

        load: function(str) {
            // and here's even more of it!
        },

        // Mod functions
        neverCollapseUpgradeMenu: function() {
            console.log("The upgrade menu is not collapsing.");
        },

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
                                         ${Game.WritePrefButton("neverCollapseUpgradeMenu", "ncumButton", "Never Collapse Upgrade Menu", "Never Collapse Upgrade Menu", this.neverCollapseUpgradeMenu)}
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
                }
            }
        }
    };
}

Game.registerMod(smoollUtilities.name, smoollUtilities);
