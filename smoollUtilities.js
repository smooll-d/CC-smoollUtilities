if (smoollUtilities === undefined) {
    var su = "smoollUtilities";

    var smoollUtilities = {
        collapsibleMenu: function(title) {
		    // Stolen wholesale from Cookie Monster
		    var span = document.createElement('span');
		    span.style.cursor = 'pointer';
		    span.style.display = 'inline-block';
		    span.style.height = '14px';
		    span.style.width = '14px';
		    span.style.borderRadius = '7px';
		    span.style.textAlign = 'center';
		    span.style.backgroundColor = '#C0C0C0';
		    span.style.color = 'black';
		    span.style.fontSize = '13px';
		    span.style.verticalAlign = 'middle';
		    span.textContent = (title ? '+' : '-');
        },

        optionsMenu: function() {
            let str = `<div class="block" style="padding:0px;margin:8px 4px;">
                            <div class="subsection" style="padding:0px">
                                "<div class="title">"
                                    ${this.collapsibleMenu(su)}
                                    <div class="listing\>
                                        ${Game.WritePrefButton("neverCollapseUpgradeMenu", "ncumButton", "Never Collapse Upgrade Menu", "Never Collapse Upgrade Menu")} +
                                        <label>Open upgrade menu fully and never collapse it, even if cursor is not hovering over menu</label>
                                    </div>
                                </div>
                            </div>
                      </div>`;

            //let str = `<div class="block" style="padding:0px;margin:8px 4px;">
            //               <div class="subsection" style="padding:0px">
            //                   ${this.collapsibleMenu("smoollUtilities", "Hello, test!")}
            //               </div>
            //           </div>`;

            return str;
        }
    };
}

Game.registerMod(su, {
    // Global variables
    init: function() {
        var menu = l("menu");

        Game.Notify(su, "This \"smooll\" (get it? 'cause it's small) mod has been loaded!", [16, 5]);

        let menuDiv = document.createElement("div");
        menuDiv.innerHTML = smoollUtilities.optionsMenu();

        //menu.insertAdjacentHTML("beforeend", smoollUtilities.optionsMenu());
        if (menu) {
            //menu.appendChild(menuDiv);
            menu.insertAdjacentHTML("afterend", smoollUtilities.optionsMenu());
        }
    },

    save: function() {
        
    },

    load: function(str) {
        
    }
});
