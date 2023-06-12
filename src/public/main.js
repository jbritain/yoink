const statusDisplay = document.getElementById("status");
const button = document.getElementById("yoinkButton");
let serverStatus = "unknown";
let awaitingOnline = false;
const onlineTimeout = 10000; // time in ms to wait before deciding wol ping didn't work

var wakeFailed;

function yoink(){
    fetch(`${window.location.href}yoink`, {
        method: 'POST'
    })
    .then(res => {
        if(res.status === 200){
            awaitingOnline = true;
            statusDisplay.innerText = "Waiting for server to start..."
            wakeFailed = setTimeout(() => {
                awaitingOnline = false;
                getStatus();
            }, onlineTimeout)
        }
    })
}

function getStatus(){
    fetch(`${window.location.href}status`, {
        method: 'GET'
    })
    .then(res => res.text())
    .then(status => {

        if (awaitingOnline && serverStatus == "online"){
            clearTimeout(wakeFailed);
            awaitingOnline = false;
        }

        if (!awaitingOnline){
            statusDisplay.innerText = status;
        }

        serverStatus = status;

        button.disabled = (status === "online" || awaitingOnline);
    });
}

getStatus();
setInterval(getStatus, 1000)