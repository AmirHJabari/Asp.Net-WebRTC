import * as wss from './wss.js';
import * as constants from './constants.js';
import * as store from './states.js';

let connectedUserDetails = {
    userId: null,
    callType: null,
    userName: null
};

export function sendPreOffer(toUserId, callType) {
    //wss.sendPreOffer(toUserId, callType);
    let state = store.getState();
    let fromUserId = state.fromUserId;

    fetch("api/Calling/Call", {
        method: "POST",
        body: JSON.stringify({
            fromUserId,
            toUserId,
            callType
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => {
        if (res.status >= 400) {
            res.json().then(val => {
                store.showToastError(val.message);
            })
        }
        if (res.status == 200) {

            res.json().then(val => {
                store.showCallingDialog(val.userName, cancelCallHandler);
            })
        }
    });
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

// Dialog Handler
function acceptCallHandler() {
    console.log("call accepted");
    sendPreOfferAnswer(constants.preOfferAnswerType.ACCEPTED);
}
function rejectCallHandler() {
    console.log("call rejected!");
    sendPreOfferAnswer(constants.preOfferAnswerType.REJECTED);
}

function cancelCallHandler() {
    console.log("call rejected!");
}

// Calling Answers
function sendPreOfferAnswer(type) {
    const data = {
        toUserId: connectedUserDetails.userId,
        type
    }

    wss.sendPreOfferAnswer(data);
}