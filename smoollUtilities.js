var menu = document.getElementById("menu");
var general = document.getElementById("statsGeneral");

if (smoollUtilities === undefined) {
    var smoollUtilities = {
        // Mod variables
        name: "smoollUtilities",
        version: "0.1",

        init: function() {
            const CCUpdateMenu = Game.UpdateMenu;

            Game.UpdateMenu = function() {
                CCUpdateMenu();

                Game.mods["smoollUtilities"].statsMenu();
            };

            Game.Notify(smoollUtilities.name, "This \"smooll\" (get it? 'cause it's small) mod has been loaded!", [16, 5]);
        },

        save: function() {

        },

        load: function(str) {

        },

        // Mod functions
        optionsMenu: function() {
            let html = `<div class="block" style="padding:0px;margin:8px 4px;">
                                     <div class="subsection" style="padding:0px">
                                         <div class="title">
                                             ${this.name}
                                             <div class="listing">
                                                 ${Game.WritePrefButton("neverCollapseUpgradeMenu", "ncumButton", "Never Collapse Upgrade Menu", "Never Collapse Upgrade Menu")}
                                                 <label>Open upgrade menu fully and never collapse it, even if cursor is not hovering over menu</label>
                                             </div>
                                         </div>
                                     </div>
                                 </div>`;

            if (menu) {
                menu.insertAdjacentHTML("beforeend", html);
            }

            Game.UpdateMenu();

            console.log("Hello, this is an options menu test");
        },

        statsMenu: function() {
            if (Game.onMenu == "stats") {
                let div = document.createElement("div");
                div.innerHTML = `<div class="listing">
                                     <b>${this.name}: </b>
                                     ${this.version}
                                 </div>`;

                if (menu && general) {
                    //let menuNode = document.getElementsByClassName("subsection")[0]
                    let generalNode = general.parentElement;
                    generalNode.lastElementChild.after(div);
                }
            }
        }
    };
}

Game.registerMod(smoollUtilities.name, smoollUtilities);
