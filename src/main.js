/*
 *	Author: Michael Boyd
 *	Date: 12/12/18
 *	File: main.js
 */
var current_bits = 0;
var bits_collected = 0;
var bots = 1;
var botOutput = 1;
var botOutputModifier = 1;
var botCost = 11;
var bits_per_second = 1;
var nodes = {   "node1": { "unlocked": true, "cost": 0 }, 
                "node2": { "unlocked": false, "cost": 100000 }, 
                "node3": { "unlocked": false, "cost": 10000000 }, 
                "node4": { "unlocked": false, "cost": 999999999 }};
var nodeOutputModifier = 1;

/* 
 * Saves the game data 
 */
function save() {
    var save = {
        current_bits: current_bits,
        bits_collected: bits_collected,
        bots: bots,
        botOutputModifier: botOutputModifier,
        bits_per_second: bits_per_second,
        nodes: nodes,
        nodeOutputModifier: nodeOutputModifier
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
        if (typeof save.current_bits !== "undefined") current_bits = save.current_bits;
        if (typeof save.bits_collected !== "undefined") bits_collected = save.bits_collected;
        if (typeof save.bots !== "undefined") bots = save.bots;
        if (typeof save.botOutputModifier !== "undefined") botOutputModifier = save.botOutputModifier;
        if (typeof save.bits_per_second !== "undefined") bits_per_second = save.bits_per_second;
        if (typeof save.nodes !== "undefined") nodes = save.nodes;
        if (typeof save.nodeOutputModifier !== "undefined") nodeOutputModifier = save.nodeOutputModifier;
    };

    refreshDisplayedData();
};

/* 
 * Resets all game data and removes the save, if it exists 
 */
function reset() {
    current_bits = 0;
    bits_collected = 0;
    bots = 1;
    botCost = 11;
    botOutputModifier = 1;
    bits_per_second = 1;
    nodeOutputModifier = 1;
    localStorage.removeItem("save");
    refreshDisplayedData();
};

/*
 * Adds bits to the current bit amount based on the number of bits 
 * that can be mined per second
 */
function mineBits() {
    current_bits += bits_per_second;
    bits_collected += bits_per_second;
    refreshDisplayedData();
};

/* 
 * Adds a bot to the current bot amount and subtracts its cost from the current bit amount 
 */
function buyBot() {
    if (current_bits >= botCost) {
        current_bits = current_bits - botCost;
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
    bits_per_second = (bots * botOutputModifier) * nodeOutputModifier;
}

/*
 * Loads content for nodes based on whether they are unlocked or not
 */
function loadNodes() {
    for (const node of Object.keys(nodes)) {
        var nodeElement = document.getElementById(node);
        nodeElement.textContent = "" +
            "\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
            " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
            " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
            " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0";
        if (nodes[node]["unlocked"] === false) {
            nodeElement.style.opacity = "0.3";
        };
    };
};

/*
 * Replaces a full bit character with an empty bit character 
 * When there are only empty bit characters remaining,
 * the display is reset with full bit characters
 */
function manageNodeDisplay() {
    for (const node of Object.keys(nodes)) {
        if (nodes[node]["unlocked"] === true) {
            var nodeElement = document.getElementById(node);
            if (!nodeElement.textContent.includes("\u25A0")) {
                nodeElement.textContent = "" +
                    "\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
                    " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
                    " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0" +
                    " \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u0020\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0";
            } else {
                nodeElement.textContent = nodeElement.textContent.replace("\u{25A0}", "\u{25A1}");
            };
        };
    };
};

/*
 * Unlocks a bit node, increasing bit output by 100%
 */
function unlockNode(nodeID) {
    if (current_bits >= nodes[nodeID]["cost"]) {
        // Remove the bit cost from the bit total
        current_bits -= nodes[nodeID]["cost"];

        // Set the node to 'unlocked'
        nodes[nodeID]["unlocked"] = true;

        // Reset the opacity
        document.getElementById(nodeID).style.opacity = "1";

        // Increase bit output by 100%
        nodeOutputModifier += 1;
        calculateBitsPerSecond();
    };
};

/*
 * Refreshes the displayed game data
 */
function refreshDisplayedData() {
    document.getElementById('bits').innerHTML = current_bits;
    document.getElementById('bots').innerHTML = bots;
    document.getElementById('botCost').innerHTML = botCost;
};

/*
 * Code to run as soon as the window is loaded
 */
window.onload = function start() {
    // Load the save, if it exists
    loadSave();

    // Set the placeholder content for locked nodes
    loadNodes();
};

/*
 * Code to run every second
 */
window.setInterval(function() {
    mineBits();
    manageNodeDisplay();
}, 1000);