//TODO: add scaling (steam version only)

var menu = document.getElementById("menu");

if (smoollUtilities === undefined) {
    var smoollUtilities = {
        // Mod metadata
        name: "smoollUtilities",
        version: "1.0",

        // States
        collapseMenu: {},

        // "collapseMenu" state names
        cMPrefs: "prefs",
        cMLog: "log",

        // localStorage
        localSUCollapseMenu: "sUCollapseMenu",

        scale: window.devicePixelRatio * 100,

        // Functions required for this (and every other) mod to work
        init: function() {
            const CCUpdateMenu = Game.UpdateMenu;

            Game.UpdateMenu = function() {
                CCUpdateMenu();

                smoollUtilities.optionsMenu();
                smoollUtilities.statsMenu();
                smoollUtilities.infoMenu();
            };

            Game.Notify(this.name, "This \"smooll\" (get it? 'cause it's small) mod has been loaded!", [16, 5, "https://smooll-d.github.io/CC-smoollUtilities/icon.png"], 3);
        },

        save: function() {
            if (!this.collapseMenu) {
                return
            }

            let ncum = JSON.stringify(Game.prefs.sUNeverCollapseUpgradesMenu);
            let collapseMenu = JSON.stringify(this.collapseMenu);

            window.localStorage.setItem(this.localSUCollapseMenu, collapseMenu);

            return ncum;
        },

        load: function(str) {
            Game.prefs.sUNeverCollapseUpgradesMenu = parseInt(str || 0);

            const collapseMenuData = window.localStorage.getItem(this.localSUCollapseMenu);
            if (collapseMenuData) {
                this.collapseMenu = JSON.parse(collapseMenuData);
            } else {
                this.collapseMenu = {};
            }

            this.toggleNeverCollapseUpgradesMenu();
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
                smoollUtilities.toggleCollapsibleButton(title);
                Game.UpdateMenu();
            });

            return span;
        },

        changeScale: function() {
            let scalingValue = Math.round(l("sUScaling").value);
            let scalingFactor = scalingValue / 100;

            l("sUScalingRightText").innerHTML = `${scalingValue}%`;

            document.body.style.zoom = scalingFactor;

            this.scale = scalingValue;
        },

        optionsMenu: function() {
            if (Game.onMenu === "prefs") {
                let span = this.createCollapsibleButton(this.cMPrefs);

                let titleDiv = document.createElement("div");
                titleDiv.className = "title";
                titleDiv.textContent = `${this.name} `;
                titleDiv.appendChild(span);

                let neverCollapseUpgradesMenuDiv = document.createElement("div");
                neverCollapseUpgradesMenuDiv.className = "listing";
                neverCollapseUpgradesMenuDiv.innerHTML = `${Game.WritePrefButton("sUNeverCollapseUpgradesMenu", "ncumButton", "Never Collapse Upgrades Menu", "Never Collapse Upgrades Menu", "smoollUtilities.toggleNeverCollapseUpgradesMenu();")}
                                                          <label>Keep upgrades menu as if it was always being hovered over</label>`;

                let scalingSliderDiv = document.createElement("div");
                scalingSliderDiv.className = "listing";
                scalingSliderDiv.innerHTML = `${Game.WriteSlider("sUScaling", "Scale", `[$]%`, function() { return this.scale}, "smoollUtilities.changeScale();")}
                                              <label>Change scale of window</label>`;

                let scaling = scalingSliderDiv.querySelector("#sUScaling");

                scaling.setAttribute("min", 25);
                scaling.setAttribute("max", 500);

                let subsectionDiv = document.createElement("div");
                subsectionDiv.className = "subsection";
                subsectionDiv.style.padding = "0px";
                subsectionDiv.appendChild(titleDiv);
                if (!this.collapseMenu[this.cMPrefs]) {
                    subsectionDiv.appendChild(neverCollapseUpgradesMenuDiv);
                    subsectionDiv.appendChild(scalingSliderDiv);
                    //if (App) {
                    //    subsectionDiv.appendChild(scalingSliderDiv);
                    //}
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
                let span = this.createCollapsibleButton(this.cMLog);

                let titleDiv = document.createElement("div");
                titleDiv.className = "title";
                titleDiv.textContent = `${this.name} `;
                titleDiv.appendChild(span);

                let subsectionDiv = document.createElement("div");
                subsectionDiv.className = "subsection";
                subsectionDiv.appendChild(titleDiv);

                let updateLog = document.createElement("div");
                updateLog.innerHTML += `<div class="subsection">
                                            <div class="listing">
                                                smoollUtilities is a mod with lots (not quite right now) of QoL (Quality of Life) changes. All of which are toggleable and are not forced upon you.
                                            </div>
                                            <div class="listing">
                                                It supports both the web and Steam versions of Cookie Clicker.
                                            </div>
                                            <div class="listing">
                                                smoollUtilities is written and maintained by 
                                                <a href="https://github.com/smooll-d" target="_blank">smooll</a>.
                                            </div>
                                            <div class="listing">
                                                If you've encountered a bug, create an 
                                                <a href="https://github.com/smooll-d/CC-smoollUtilities/issues" target="_blank">issue</a>.
                                            </div>
                                            <div class="listing warning">
                                                Warning: Even though smoollUtilities does not use the CCSE framework, if you want to use it, please be sure to enable it after CCSE. Something in CCSE <small>(that I don't yet understand)</small> is blocking smoollUtilities from injecting it's own HTML into the UpdateMenu() function. In simpler terms, if smoollUtilities is loaded before CCSE, CCSE will break smoollUtilities and you won't be able to play Cookie Clicker. I will try and fix this but for now, we'll have to live with CCSE superiority.
                                            </div>
                                        </div>
                                        <div class="subsection">
                                            <div class="title">
                                                smoollUtilities Version History
                                            </div>
                                        </div>
                                        <div class="subsection update">
                                            <div class="title">
                                                13/09/2024 | Initial Release - v1.0
                                            </div>
                                            <div class="listing">
                                                • Added "Never Collapse Upgrades Menu" button which does what it says it does.
                                            </div>
                                        </div>`;

                if (!this.collapseMenu[this.cMLog]) {
                    subsectionDiv.appendChild(updateLog);
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
