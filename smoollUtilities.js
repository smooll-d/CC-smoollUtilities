var menu = l("menu");

if (smoollUtilities === undefined) {
    var smoollUtilities = {
        // Mod variables
        info : this.readTextFileAsJSON("info.txt"),

        name: "smoollUtilities",

        version: info.ModVersion,

        // Helper functions
        checkMenu: function(sectionText) {
            let section = menu.classList.contains("section");

            for (var i = 0; i < section.length; i++) {
                if (section[i].innerHTML.indexOf(sectionText) > - 1) {
                    return true;
                }
            }

            return false;
        },

        readTextFileAsJSON: function(filepath) {
            const fs = require("fs");

            fs.readFile(filepath, "utf8", (err, data) => {
                if (err) throw err;

                try {
                    const jsonData = JSON.parse(data);
                    return jsonData;
                } catch (error) {
                    console.error(`${this.name} | Error parsing JSON: `, error);
                }
            });
        },

        // Mod functions
        optionsMenu: function() {
            let html = `<div class="block" style="padding:0px;margin:8px 4px;">
                                     <div class="subsection" style="padding:0px">
                                         <div class="title">
                                             ${smoollUtilities.name}
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

        statsMenu: function() {
            if (this.checkMenu("Statistics")) {
                let html = `<div class="subsection">
                                         <div class="title" style="position:relative;">
                                             <div class="listing">
                                                 <b>smoollUtilities: </b>
                                             </div>
                                         </div>
                                     </div>`;
            }
        }
    };
}

Game.registerMod(smoollUtilities.name, {
    init: function() {
        //Game.registerHook("check", this.optionsMenu);

        Game.Notify(smoollUtilities.name, "This \"smooll\" (get it? 'cause it's small) mod has been loaded!", [16, 5]);

        console.log(`${smoollUtilities.name} version ${smoollUtilities.ModVersion}`);

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
