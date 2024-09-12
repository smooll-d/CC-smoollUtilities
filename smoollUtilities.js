//TODO: add collapsible button
//TODO: add fixes for Steam version
//TODO: add version history to "Info" menu (which I need the collapsible button for)

var menu = document.getElementById("menu");

if (smoollUtilities === undefined) {
    var smoollUtilities = {
        // Mod metadata
        name: "smoollUtilities",
        version: "0.3",
        collapseMenu: {},

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
            let ncum = JSON.stringify(Game.prefs.sUNeverCollapseUpgradesMenu);

            return ncum;
        },

        load: function(str) {
            Game.prefs.sUNeverCollapseUpgradesMenu = parseInt(str || 0);

            smoollUtilities.neverCollapseUpgradesMenu();
        },

        // Mod functions
        neverCollapseUpgradesMenu: function() {
            let upgrades = document.querySelector("#upgrades.storeSection.upgradeBox");

            if (Game.prefs.sUNeverCollapseUpgradesMenu === 1) {
                upgrades.style.height = "auto";
            } else if (Game.prefs.sUNeverCollapseUpgradesMenu === 0) {
                upgrades.removeAttribute("style");
            }
        },

        toggleCollapsibleButton: function() {
            if (this.collapseMenu[this.name] === 0) {
                this.collapseMenu[this.name]++;
            } else if (this.collapseMenu[this.name] === 1) {
                this.collapseMenu[this.name]--;
            }
        },

        optionsMenu: function() {
            if (Game.onMenu === "prefs") {
                if (this.collapseMenu[this.name] === undefined) {
                    this.collapseMenu[this.name] = 0;
                }

                // Stolen wholesale from CCSE, which in turn stole it wholesale from Cookie Monster
                let span = document.createElement("span");
                span.style.cursor = "pointer";
                span.style.display = "inline-block";
                span.style.height = "14px";
                span.style.width = "14px";
                span.style.borderRadius = "7px";
                span.style.textAlign = "center";
                span.style.backgroundColor = "#C0C0C0";
                span.style.color = "black";
                span.style.fontSize = "13px";
                span.style.verticalAlign = "middle";
                span.textContent = this.collapseMenu[this.name] ? "+" : "-";
                span.addEventListener("click", function() {
                    smoollUtilities.toggleCollapsibleButton();
                    Game.UpdateMenu();
                });

                let titleDiv = document.createElement("div");
                titleDiv.className = "title";
                titleDiv.textContent = `${this.name} `;
                titleDiv.appendChild(span);

                let listingDiv = document.createElement("div");
                listingDiv.className = "listing";
                listingDiv.innerHTML = `${Game.WritePrefButton("sUNeverCollapseUpgradesMenu", "ncumButton", "Never Collapse Upgrades Menu", "Never Collapse Upgrades Menu", "smoollUtilities.neverCollapseUpgradesMenu();")}
                                        <label>Keep upgrades menu as if it was always being hovered over</label>`;

                let subsectionDiv = document.createElement("div");
                subsectionDiv.className = "subsection";
                subsectionDiv.id = "sUOptionsMenu";
                subsectionDiv.style.padding = "0px";
                subsectionDiv.appendChild(titleDiv);
                if (!this.collapseMenu[this.name]) {
                    subsectionDiv.appendChild(listingDiv);
                }

                let optionsDiv = document.createElement("div");
                optionsDiv.className = "block";
                optionsDiv.style.padding = "0px";
                optionsDiv.style.margin = "8px 4px";
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
