import * as store from "./states.js";
import * as webRtcHandler from "./webRtcHandler.js";

let sr = new signalR.HubConnectionBuilder()
    .withUrl("/WebRTCHub")
    .withAutomaticReconnect()
    .build();

// -------------- SIGNALR EVENTS --------------
// toast error
sr.on("ToastError", (data) => {
    Toastify({
        text: data.message,
        duration: 3000,
        close: true,
        style: {
            background: "linear-gradient(108.4deg, rgb(253, 44, 56) 3.3%, rgb(176, 2, 12) 98.4%)"
        }
    }).showToast();
});

// PreOffer
sr.on("PreOffer", (data) => {
    webRtcHandler.handlePreOffer(data);
});



// -------------- API --------------
export function registerSignalREvents() {
    sr.start().then(() => {
        store.setUserId(sr.connectionId);
    });
};

export function sendPreOffer(toUserId, callType) {
    let userName = "";
    if (store.getState().userName == "") {
        userName = prompt("Please enter you name:");
        store.setUserName(userName)
    }

    let fromUserId = store.getState().fromUserId;
    sr.invoke(`PreOffer`, { userName, fromUserId, toUserId, callType });
}