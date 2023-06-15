const statusDisplay = document.getElementById("status");
const button = document.getElementById("yoinkButton");
const indicator = document.getElementById("indicator");
let serverStatus = "Waiting for response...";
let awaitingOnline = false;
const onlineTimeout = 20000; // time in ms to wait before deciding wol ping didn't work

var wakeFailed;

function yoink(){
    fetch(`${window.location.href}yoink`, {
        method: 'POST'
    })
    .then(res => {
        if(res.status === 200){
            awaitingOnline = true;
            statusDisplay.innerText = "Waiting for response...";
            indicator.style.backgroundColor = "orange";
            wakeFailed = setTimeout(() => {
                awaitingOnline = false;
                getStatus();
            }, onlineTimeout)
        }
    })
}

function getStatus(){ // check if target machine is online
    fetch(`${window.location.href}status`, {
        method: 'GET'
    })
    .then(res => res.text())
    .then(online => {

        if (awaitingOnline && serverOnline){
            clearTimeout(wakeFailed);
            awaitingOnline = false;
        }

        serverOnline = (online == "true");

        if (!awaitingOnline){
            statusDisplay.innerText = serverOnline ? "Online" : "Offline";
            indicator.style.backgroundColor = serverOnline ? "lawngreen" : "red";
            
        }


        button.disabled = (serverOnline || awaitingOnline);
    });
}

getStatus();
setInterval(getStatus, 1000);