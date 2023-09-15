import * as wss from './wss.js';
import * as constants from './constants.js';
import * as store from './states.js';

let connectedUserDetails = {
    userId: null,
    callType: null,
    userName: null
};

export function sendPreOffer(toUserId, callType) {
    wss.sendPreOffer(toUserId, callType)
}

export function handlePreOffer(data) {
    connectedUserDetails = {
        userId: data.fromUserId,
        callType: data.callType,
        userName: data.userName
    };

    if (data.callType == constants.callType.DIRECT_CALL) {
        store.showIncomingCallDialog(data, acceptCallHandler, rejectCallHandler);
    }
}
function acceptCallHandler() {
    console.log("call accepted");
}
function rejectCallHandler() {
    console.log("call rejected!");
}