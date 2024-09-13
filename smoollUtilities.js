//TODO: add version history to "Info" menu (which I need the collapsible button for)

var menu = document.getElementById("menu");

if (smoollUtilities === undefined) {
    var smoollUtilities = {
        // Mod metadata
        name: "smoollUtilities",
        version: "0.4",
        collapseMenu: {},
        localSUCollapseMenu: "sUCollapseMenu",

        // Functions required for this (and every other) mod to work
        init: function() {
            const CCUpdateMenu = Game.UpdateMenu;

            Game.UpdateMenu = function() {
                CCUpdateMenu();

                smoollUtilities.optionsMenu();
                smoollUtilities.statsMenu();
                smoollUtilities.infoMenu();
            };

            Game.Notify(this.name, "This \"smooll\" (get it? 'cause it's small) mod has been loaded!", [16, 5], 3);
        },

        save: function() {
            if (!smoollUtilities.collapseMenu) {
                return
            }

            let ncum = JSON.stringify(Game.prefs.sUNeverCollapseUpgradesMenu);
            let collapseMenu = JSON.stringify(smoollUtilities.collapseMenu);

            window.localStorage.setItem(smoollUtilities.localSUCollapseMenu, collapseMenu);

            return ncum;
        },

        load: function(str) {
            Game.prefs.sUNeverCollapseUpgradesMenu = parseInt(str || 0);

            const collapseMenuData = window.localStorage.getItem(smoollUtilities.localSUCollapseMenu);
            if (collapseMenuData) {
                smoollUtilities.collapseMenu = JSON.parse(collapseMenuData);
            } else {
                smoollUtilities.collapseMenu = {};
            }

            smoollUtilities.toggleNeverCollapseUpgradesMenu();
        },

        // Mod functions
        toggleNeverCollapseUpgradesMenu: function() {
            let upgrades = document.querySelector("#upgrades.storeSection.upgradeBox");

            if (Game.prefs.sUNeverCollapseUpgradesMenu === 1) {
                upgrades.style.height = "auto";
            } else if (Game.prefs.sUNeverCollapseUpgradesMenu === 0) {
                upgrades.removeAttribute("style");
            }
        },

        toggleCollapsibleButton: function(title) {
            if (this.collapseMenu[title] === 0) {
                this.collapseMenu[title]++;
            } else if (this.collapseMenu[title] === 1) {
                this.collapseMenu[title]--;
            }
        },

        createCollapsibleButton: function(title) {
            if (this.collapseMenu[title] === undefined) {
                this.collapseMenu[title] = 0;
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
            span.textContent = this.collapseMenu[title] ? "+" : "-";
            span.addEventListener("click", function() {
                smoollUtilities.toggleCollapsibleButton(smoollUtilities.name);
                Game.UpdateMenu();
            });

            return span;
        },

        optionsMenu: function() {
            if (Game.onMenu === "prefs") {
                let span = this.createCollapsibleButton(this.name);

                let titleDiv = document.createElement("div");
                titleDiv.className = "title";
                titleDiv.textContent = `${this.name} `;
                titleDiv.appendChild(span);

                let listingDiv = document.createElement("div");
                listingDiv.className = "listing";
                listingDiv.innerHTML = `${Game.WritePrefButton("sUNeverCollapseUpgradesMenu", "ncumButton", "Never Collapse Upgrades Menu", "Never Collapse Upgrades Menu", "smoollUtilities.toggleNeverCollapseUpgradesMenu();")}
                                        <label>Keep upgrades menu as if it was always being hovered over</label>`;

                let subsectionDiv = document.createElement("div");
                subsectionDiv.className = "subsection";
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
                    if (App) {
                        menu.childNodes[4].after(optionsDiv);
                    } else {
                        menu.childNodes[3].after(optionsDiv);
                    }
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
        },

        infoMenu: function() {
            if (Game.onMenu === "log") {
                if (this.collapseMenu[this.name] === undefined) {
                    this.collapseMenu[this.name] = 0;
                }

                let span = this.createCollapsibleButton(this.name);

                let titleDiv = document.createElement("div");
                titleDiv.className = "title";
                titleDiv.textContent = `${this.name} `;
                titleDiv.appendChild(span);

                let subsectionDiv = document.createElement("div");
                subsectionDiv.className = "subsection";
                subsectionDiv.appendChild(titleDiv);
                if (!this.collapseMenu[this.name]) {
                    subsectionDiv.innerHTML += `<div class="subsection">
                                                    <div class="listing">
                                                        smoollUtilities is a mod with lots of (not quite right now) simple tools intended to make the game easier.
                                                    </div>
                                                    <div class="listing">
                                                        smoollUtilities is written and maintained by smooll (
                                                        <a href="https://github.com/smooll-d/CC-smoollUtilities" target="_blank">GitHub</a>
                                                        )
                                                    </div>
                                                    <div class="listing">
                                                        If you've encountered a bug, create an 
                                                        <a href="https://github.com/smooll-d/CC-smoollUtilities/issues">issue.</a>
                                                    </div>
                                                </div>
                                                <div class="subsection">
                                                    <div class="title">
                                                        smoollUtilities Version History
                                                    </div>
                                                </div>
                                                <div class="subsection update">
                                                    <div class="title">
                                                        13/09/2024 - Initial Release
                                                    </div>
                                                    <div class="listing">
                                                        • Added "Never Collapse Upgrades Menu" button which does what it says it does.
                                                    </div>
                                                </div>`;
                }

                if (menu) {
                    let selectableDiv = menu.getElementsByClassName("selectable")[0];
                    selectableDiv.childNodes[0].after(subsectionDiv);
                }
            }
        }
    };
}

Game.registerMod(smoollUtilities.name, smoollUtilities);
