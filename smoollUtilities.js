//TODO: add collapsible button
//TODO: add version history to "Info" menu (which I need the collapsible button for)
//TODO: add fixes for Steam version

var menu = document.getElementById("menu");

if (smoollUtilities === undefined) {
    var smoollUtilities = {
        // Mod metadata
        name: "smoollUtilities",
        version: "0.3",

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
            let prefs = JSON.stringify(Game.prefs.neverCollapseUpgradesMenu);
            return prefs;
        },

        load: function(str) {
            Game.prefs.neverCollapseUpgradesMenu = parseInt(str || 0);
            smoollUtilities.neverCollapseUpgradesMenu();
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
                let titleDiv = document.createElement("div");
                titleDiv.className = "title";
                titleDiv.textContent = `${this.name} `;

                let listingDiv = document.createElement("div");
                listingDiv.className = "listing";
                listingDiv.innerHTML = `${Game.WritePrefButton("neverCollapseUpgradesMenu", "ncumButton", "Never Collapse Upgrades Menu", "Never Collapse Upgrades Menu", "smoollUtilities.neverCollapseUpgradesMenu();")}
                                        <label>Keep upgrades menu as if it was always being hovered over</label>`;

                let subsectionDiv = document.createElement("div");
                subsectionDiv.innerHTML = `<div class="subsection" style="padding:0px;"></div>`;
                subsectionDiv.appendChild(titleDiv);
                subsectionDiv.appendChild(listingDiv);

                let optionsDiv = document.createElement("div");
                optionsDiv.className = "block";
                optionsDiv.style.padding = "0px";
                optionsDiv.style.margin = "8px 4px";
                optionsDiv.innerHTML = `<div class="subsection" style="padding:0px;"></div>`;
                optionsDiv.appendChild(subsectionDiv);

                if (menu) {
                    menu.childNodes[3].after(optionsDiv);
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
