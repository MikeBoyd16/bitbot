var bits = 0;
function bitClick(number) {
    bits = bits + number;
    document.getElementById("bits").innerHTML = bits;
};

var bots = 0;
function buyBot() {
    var botCost = Math.floor(10 * Math.pow(1.1, bots));
    if(bits >= botCost){
        bots = bots + 1;
    	bits = bits - botCost;
        document.getElementById('bots').innerHTML = bots;
        document.getElementById('bits').innerHTML = bits;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1, bots));
    document.getElementById('botCost').innerHTML = nextCost;
};

window.setInterval(function() {
	bitClick(bots);
}, 1000);