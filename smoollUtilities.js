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
        let html = "<div class=\"listing\">" +
                        CCSE.MenuHelper.ToggleButton("", "Never Collapse Upgrade Menu", "test", "Never Collapse Upgrade Menu", "Never Collapse Upgrade Menu", console.log("Never Collapse Upgrade Menu")) +
                        "<label>Open upgrade menu fully and never collapse it, even if cursor is not hovering over the menu</label>" +
                   "</div>";

        return html;
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
