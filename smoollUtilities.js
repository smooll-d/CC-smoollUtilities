let su = "smoollUtilities";

// Wait until CCSE loads to start loading the mod
if (smoollUtilities === undefined) {
    var smoollUtilities = {};
}

// Load CCSE
if (typeof CCSE == "undefined") {
    Game.LoadMod("https://klattmose.github.io/CookieClicker/" + (0 ? "Beta/" : '') + "CCSE.js");
}

// Set metadata of the mod
smoollUtilities.name = su;
smoollUtilities.version = "0.1";
smoollUtilities.GameVersion = "2.052";

// Main function of the mod
smoollUtilities.launch = function() {
    // Custom optionsMenu function to show custom options for the mod in the options menu, I think that's simple to understand
    // It's literally in the name of the function.
    smoollUtilities.optionsMenu = function() {
        return "<div class=\"listing\">" +
                   // I don't know what test1 and 2 mean. test3 is id of the button, ncum on and off is what is displayed
                   // on the button when toggled and console.log("ncum") is the callback but it doesn't happen on click
                   // it happens every so often, I think every 1-3 seconds.
                   // TODO: make it work somehow
                   CCSE.MenuHelper.ToggleButton("test1", "test2", "test3", "Never Collapse Upgrade Menu ON", "Never Collapse Upgrade Menu OFF", console.log("Never Collapse Upgrade Menu")) +
                   "<label>Open upgrade menu fully and never collapse it, even if cursor is not hovering over menu</label>" +
               "</div>";
    };

    smoollUtilities.init = function() {
        // Add a version string to the stats menu
        Game.customStatsMenu.push(function() {
            CCSE.AppendStatsVersionNumber(smoollUtilities.name, smoollUtilities.version);
        });

        // Add custom menu options
        Game.customOptionsMenu.push(function() {
            CCSE.AppendCollapsibleOptionsMenu(smoollUtilities.name, smoollUtilities.optionsMenu());
        });
    };

    // If Game version is correct register and load the mod
    if (CCSE.ConfirmGameVersion(smoollUtilities.name, smoollUtilities.version, smoollUtilities.GameVersion)) {
        Game.registerMod(smoollUtilities.name, smoollUtilities);
    }
};

// Check if the mod is loaded
if (!smoollUtilities.isLoaded) {
    // if CCSE is loaded the start the mod
    if (CCSE && CCSE.isLoaded) {
        smoollUtilities.launch();
    } else {
        if (!CCSE) {
            var CCSE = {};
        }

        if (!CCSE.postLoadHooks) {
            CCSE.postLoadHooks = {};
        }

        CCSE.postLoadHooks.push(smoollUtilities.launch);
    }
}
