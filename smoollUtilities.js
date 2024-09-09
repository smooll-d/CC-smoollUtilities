Game.registerMod("smoollUtilities", {
    init:function() {
        Game.Notify("smoollUtilities", "This \"smooll\" (get it? 'cause it's small) mod has been loaded!", [16, 5]);
        optionsMenu();
    },

    save:function() {
        
    },

    load:function(str) {
        
    },

    // Custom functions
    optionsMenu:function() {
        return "<div class=\"block\" style=\"padding:0px;margin:8px 4px;\">" +
                    "<div class=\"subsection\" style=\"padding:0px\">" +
                        "<div class=\"title\">" +
                            "smoollUtilities" +
                            "<div class=\"listing\">" +
                                Game.WritePrefButton("test1", "ncum", "testON", "testOFF") +
                                "<label>Open upgrade menu fully and never collapse it, even if cursor is not hovering over menu</label>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
               "<div/";
    }
});
