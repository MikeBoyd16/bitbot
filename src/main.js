/*
 *	Author: Michael Boyd
 *	Date: 12/12/18
 *	File: main.js
 */
var bits = 0;
var bots = 1;
var botCost = 10;
var bits_per_second = 0;
var farms = { "farm1": true, "farm2": false, "farm3": false, "farm4": false }

/* 
 * Saves the game data 
 */
function save() {
    var save = {
        bits: bits,
        bots: bots,
        bits_per_second: bits_per_second
    };
    localStorage.setItem("save", JSON.stringify(save));
};

/* 
 * Loads an existing save into the current game 
 */
function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));

    // Local storage returns null if the item doesn't exist
    if (savegame !== null) {
        if (typeof savegame.bits !== "undefined") bits = savegame.bits;
        if (typeof savegame.bots !== "undefined") bots = savegame.bots;
    };
    
    botCost = Math.floor(10 * Math.pow(1.1, bots));
    bits_per_second = bots;
    refreshDisplayedData();
};

/* 
 * Resets all game data and removes the save, if it exists 
 */
function reset() {
    bits = 0;
    bots = 0;
    botCost = 10;
    bits_per_second = 0;
    localStorage.removeItem("save");
    refreshDisplayedData();
};

/*
 * Adds bits to the current bit amount based on the number of bits 
 * that can be farmed per second
 */
function farmBits() {
    bits += bits_per_second;
    refreshDisplayedData();
};

/* 
 * Adds a bot to the current bot amount and subtracts its cost from the current bit amount 
 */
function buyBot() {
    if (bits >= botCost) {
        bits = bits - botCost;
        bots++;
        botCost = Math.floor(10 * Math.pow(1.1, bots));
        bits_per_second += 1;
        refreshDisplayedData();
    };
};

/*
 * Replaces a full bit character with an empty bit character 
 * When there are only empty bit characters remaining,
 * the display is reset with full bit characters
 */
function manageFarmDisplay() {
    Object.entries(farms).forEach(([farm, unlocked]) => {
        if (unlocked == true) {
            var farmElement = document.getElementById(farm);
            if (!farmElement.textContent.includes("\u25A0")) {
                farmElement.textContent = "" +
                    "\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
                    " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
                    " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
                    " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0";
            } else {
                farmElement.textContent = farmElement.textContent.replace("\u{25A0}", "\u{25A1}");
            };
        };
    });
};

/*
 * Refreshes the displayed game data
 */
function refreshDisplayedData() {
    document.getElementById('bits').innerHTML = bits;
    document.getElementById('bots').innerHTML = bots;
    document.getElementById('botCost').innerHTML = botCost;
};

// Load the save, if it exists
load();

// Bots mine bits every second
window.setInterval(function() {
    farmBits();
    manageFarmDisplay();
}, 1000);