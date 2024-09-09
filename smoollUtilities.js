if (smoollUtilities === undefined) {
    var smoollUtilities = {
        optionsMenu: function() {
            let str = "<div class=\"block\" style=\"padding:0px;margin:8px 4px;\">" +
                            "<div class=\"subsection\" style=\"padding:0px\">" +
                                "<div class=\"title\">" +
                                    "smoollUtilities" +
                                    "<div class=\"listing\">" +
                                        Game.WritePrefButton("neverCollapseUpgradeMenu", "ncumButton", "Never Collapse Upgrade Menu", "Never Collapse Upgrade Menu") +
                                        "<label>Open upgrade menu fully and never collapse it, even if cursor is not hovering over menu</label>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                      "<div/";

            return str;
        }
    };
}

Game.registerMod("smoollUtilities", {
    init: function() {
        Game.Notify("smoollUtilities", "This \"smooll\" (get it? 'cause it's small) mod has been loaded!", [16, 5]);

        l("menu").appendChild(smoollUtilities.optionsMenu());
    },

    save: function() {
        
    },

    load: function(str) {
        
    }
});
