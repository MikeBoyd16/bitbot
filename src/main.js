/*
 *	Author: Michael Boyd
 *	Date: 12/12/18
 *	File: main.js
 */
var bits = 0;
var bots = 1;
var botOutput = 1;
var botOutputModifier = 1;
var botCost = 11;
var bits_per_second = 1;
var farms = { "farm1": true, "farm2": false, "farm3": false, "farm4": false };
var farmOutputModifier = 1;

/* 
 * Saves the game data 
 */
function save() {
    var save = {
        bits: bits,
        bots: bots,
        botOutputModifier: botOutputModifier,
        bits_per_second: bits_per_second,
        farms: farms,
        farmOutputModifier: farmOutputModifier
    };
    localStorage.setItem("save", JSON.stringify(save));
};

/* 
 * Loads an existing save into the current game 
 */
function loadSave() {
    var save = JSON.parse(localStorage.getItem("save"));

    // Local storage returns null if the item doesn't exist
    if (save !== null) {
        if (typeof save.bits !== "undefined") bits = save.bits;
        if (typeof save.bots !== "undefined") bots = save.bots;
        if (typeof save.botOutputModifier !== "undefined") botOutputModifier = save.botOutputModifier;
        if (typeof save.bits_per_second !== "undefined") bits_per_second = save.bits_per_second;
        if (typeof save.farms !== "undefined") farms = save.farms;
        if (typeof save.farmOutputModifier !== "undefined") farmOutputModifier = save.farmOutputModifier;
    };

    refreshDisplayedData();
};

/* 
 * Resets all game data and removes the save, if it exists 
 */
function reset() {
    bits = 0;
    bots = 1;
    botCost = 11;
    botOutputModifier = 1;
    bits_per_second = 1;
    farmOutputModifier = 1;
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
        calculateBitsPerSecond();
        refreshDisplayedData();
    };
};

/*
 * Calculates bits per second
 */
function calculateBitsPerSecond() {
    bits_per_second = (bots * botOutputModifier) * farmOutputModifier;
}

/*
 * Loads content for farms based on whether they are unlocked or not
 */
function loadFarms() {
    Object.entries(farms).forEach(([farm, unlocked]) => {
        var farmElement = document.getElementById(farm);
        farmElement.textContent = "" +
            "\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
            " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
            " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
            " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0";
        if (unlocked == false) {
            farmElement.style.opacity = "0.3";
        };
    });
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
 * Unlocks a bit farm, increasing bit output by 100%
 */
function unlockFarm(farmID) {
    // Set the farm to 'unlocked'
    farms[farmID] = true;

    // Reset the opacity
    document.getElementById(farmID).style.opacity = "1";

    // Increase bit output by 100%
    farmOutputModifier += 1;
    calculateBitsPerSecond();
}

/*
 * Refreshes the displayed game data
 */
function refreshDisplayedData() {
    document.getElementById('bits').innerHTML = bits;
    document.getElementById('bots').innerHTML = bots;
    document.getElementById('botCost').innerHTML = botCost;
};

/*
 * Code to run as soon as the window is loaded
 */
window.onload = function start() {
    // Load the save, if it exists
    loadSave();

    // Set the placeholder content for locked farms
    loadFarms();
};

/*
 * Code to run every second
 */
window.setInterval(function() {
    farmBits();
    manageFarmDisplay();
}, 1000);