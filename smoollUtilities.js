Game.registerMod("smoollUtilities", {
    init:function() {
        Game.Notify("smoollUtilities", "This \"smooll\" (get it? 'cause it's small) mod has been loaded!", [16, 5])
        Game.WritePrefButton("test1", "ncum", "testON", "testOFF");
    },

    save:function() {
        
    },

    load:function(str) {
        
    }

    // Custom functions
    //optionsMenu:function() {
    //    return 
    //}
});
