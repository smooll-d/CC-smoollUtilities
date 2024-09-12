//TODO: save and load state of "Never Collapse Upgrades Menu"
//TODO: add collapsible button
//TODO: add version history to "Info" menu (which I need the collapsible button for)

var menu = document.getElementById("menu");

if (smoollUtilities === undefined) {
    var smoollUtilities = {
        // Mod variables
        name: "smoollUtilities",
        version: "0.2",

        // Functions required for this (and every other) mod to work
        init: function() {
            Game.prefs.neverCollapseUpgradesMenu = 0;

            const CCUpdateMenu = Game.UpdateMenu;

            Game.UpdateMenu = function() {
                CCUpdateMenu();

                smoollUtilities.optionsMenu();
                smoollUtilities.statsMenu();
            };

            Game.Notify(this.name, "This \"smooll\" (get it? 'cause it's small) mod has been loaded!", [16, 5], 3);
        },

        save: function() {
            let prefs = JSON.stringify(Game.prefs.neverCollapseUpgradesMenu);
            return prefs;
        },

        load: function(str) {
            Game.prefs.neverCollapseUpgradesMenu = parseInt(str || 0);
        },

        // Mod functions
        neverCollapseUpgradesMenu: function() {
            let upgrades = document.querySelector("#upgrades.storeSection.upgradeBox");

            if (Game.prefs.neverCollapseUpgradesMenu === 1) {
                upgrades.style.height = "auto";
            } else if (Game.prefs.neverCollapseUpgradesMenu === 0) {
                upgrades.removeAttribute("style");
            }
        },

        optionsMenu: function() {
            if (Game.onMenu === "prefs") {
                let div = document.createElement("div");
                div.className = "block";
                div.style.padding = "0px";
                div.style.margin = "8px 4px";
                div.innerHTML = `<div class="subsection" style="padding:0px;">
                                     <div class="title">
                                         ${this.name}
                                     </div>
                                     <div class="listing">
                                         ${Game.WritePrefButton("neverCollapseUpgradesMenu", "ncumButton", "Never Collapse Upgrades Menu", "Never Collapse Upgrades Menu", "smoollUtilities.neverCollapseUpgradesMenu();")}
                                         <label>Keep upgrades menu as if it was always being hovered over</label>
                                     </div>
                                </div>`;

                if (menu) {
                    menu.childNodes[3].after(div);
                }
            }
        },

        statsMenu: function() {
            if (Game.onMenu === "stats") {
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
