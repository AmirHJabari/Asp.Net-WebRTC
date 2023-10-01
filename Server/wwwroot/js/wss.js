import * as store from "./states.js";
import * as webRtcHandler from "./webRtcHandler.js";

let sr = new signalR.HubConnectionBuilder()
    .withUrl("/WebRTCHub")
    .withAutomaticReconnect()
    .build();

// -------------- SIGNALR EVENTS --------------
// toast error
sr.on("ToastError", (data) => {
    store.showToastError(data.message);
});

// PreOffer
sr.on("PreOffer", (data) => {
    webRtcHandler.handlePreOffer(data);
});



// -------------- API --------------
export function registerSignalREvents() {
    sr.start().then(() => {
        store.setUserId(sr.connectionId);
        sr.invoke(`Rename`, { userName: store.getState().userName })
    });
};

export function sendPreOffer(toUserId, callType) {
    let state = store.getState();
    let userName = state.userName;
    
    let fromUserId = state.fromUserId;
    sr.invoke(`PreOffer`, { userName, fromUserId, toUserId, callType });
}

export function sendPreOfferAnswer(data) {
    let state = store.getState();
    let userName = state.userName;
    
    let fromUserId = state.fromUserId;
    sr.invoke(`PreOfferAnswer`, { userName, fromUserId, toUserId, callType });
}