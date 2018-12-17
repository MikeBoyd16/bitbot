/*
 *	Author: Michael Boyd
 *	Date: 12/12/18
 *	File: main.js
 */
var bits = 0;
var bots = 0;
var botCost = 10;

/* 
 * Saves the game data 
 */
function save() {
    var save = {
        bits: bits,
        bots: bots
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
        botCost = Math.floor(10 * Math.pow(1.1, bots));
        refreshDisplayedData();
    };
};

/* 
 * Resets all game data and removes the save, if it exists 
 */
function reset() {
    bits = 0;
    bots = 0;
    botCost = 10;
    localStorage.removeItem("save");
    refreshDisplayedData();
};

/*
 * Adds bits to the current bit amount based on the number of mined bits 
 */
function farmBits(number) {
    bits = bits + number;
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
        refreshDisplayedData();
    };
};

/*
 * Fills the farm display with black squares representing bits
 */
function populateFarmDisplay(farmID) {
    var farm = document.getElementById(farmID);
    farm.textContent = "" +
        "\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
        " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
        " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
        " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0";
};

/*
 * Replaces a full bit character with an empty bit character in a farm display
 */
function decrementFarmDisplayBit(farmID) {
    var farm = document.getElementById(farmID);
    farm.textContent = farm.textContent.replace("\u{25A0}", "\u{25A1}");
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

var pop = 0;
// Bots mine bits every second
window.setInterval(function() {
    if (pop == 0) {
        populateFarmDisplay("farm1");
        pop = 1;
    };
    farmBits(bots);
    decrementFarmDisplayBit("farm1");
}, 1000);