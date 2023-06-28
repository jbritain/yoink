const statusDisplay = document.getElementById("status");
const button = document.getElementById("yoinkButton");
const indicator = document.getElementById("indicator");
const favicon = document.getElementById("favicon");
let serverStatus = "Waiting for response...";
let awaitingOnline = false;

var wakeFailed;

function redirectAuth(){
    window.location.href = "/auth";
}

function yoink(){
    fetch(`${window.location.href}yoink`, {
        method: 'POST'
    })
    .then(res => {
        if(res.status === 200){
            awaitingOnline = true;
            statusDisplay.innerText = "Waiting for response...";
            indicator.style.backgroundColor = "orange";
            favicon.href = "/images/favicon_unknown.png"
            wakeFailed = setTimeout(() => {
                awaitingOnline = false;
                getStatus();
            }, onlineTimeout)
        } else if (res.status === 401){
            redirectAuth()
        }
    })
}

function getStatus(){ // check if target machine is online
    fetch(`${window.location.href}status`, {
        method: 'GET'
    })
    .then(res => {
        if (res.status == 401) {
            redirectAuth();
        }
        res.text()
    })
    .then(online => {

        if (awaitingOnline && serverOnline){
            clearTimeout(wakeFailed);
            awaitingOnline = false;
        }

        serverOnline = (online == "true");

        if (!awaitingOnline){
            statusDisplay.innerText = serverOnline ? "Online" : "Offline";
            favicon.href = `/images/favicon_${serverOnline ? 'awake' : 'sleep'}.png`
            indicator.style.backgroundColor = serverOnline ? "lawngreen" : "red";
            
        }


        button.disabled = (serverOnline || awaitingOnline);
        setTimeout(getStatus, statusInterval); // run function again after delay
    });
}

getStatus();
