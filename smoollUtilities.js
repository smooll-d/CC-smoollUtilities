var menu = l("menu");
var general = l("statsGeneral");

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

            setTimeout(function() { Game.ShowMenu("stats") }, 500);

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
            // var general = l('statsGeneral');
		    // var str = `<b>${this.name}:</b> ${this.version}`;
		    // var div = document.createElement('div');
		    // div.className = 'listing';
		    // div.innerHTML = str;
		
		    // if(general) general.parentNode.appendChild(div);

            // let html = `<div class="listing">
            //                  <b>${this.name}: </b>
            //                  ${this.version}
            //              </div>`;

            // if (general) {
            //     general.insertAdjacentHTML("beforeend", html);
            // }

            if (Game.onMenu == "stats") {
                let html = `<b>${this.name}:</b> ${this.version}`;
                
                let div = document.createElement("div");
                div.innerHTML = `<div class="listing">${html}</div>`;

                if (general) {
                    general.parentNode.appendChild(div);
                }
            }
        }
    };
}

Game.registerMod(smoollUtilities.name, smoollUtilities);
