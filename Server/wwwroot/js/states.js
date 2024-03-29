﻿import * as webRtcHandler from "./webRtcHandler.js";
import * as constants from "./constants.js";

let state = {
    fromUserId: null,
    userName: "",
    localStream: null,
    remoteStream: null,
    allowConnectionsFromStrangers: false,
    callState: false
};
let incomingCallModalElm = document.getElementById('incoming-call-modal');
let callerNameElm = document.getElementById('caller-name');
let calleeNameElm = document.getElementById('callee-name');
let userIdElm = document.getElementById('userId');
let toUserIdElm = document.getElementById('to-user-id');


export const setUserId = (fromUserId) => {
    state = {
        ...state,
        fromUserId
    };

    userIdElm.innerHTML = fromUserId;
};

export function setUserName(userName) {
    state = {
        ...state,
        userName
    };
};

export const setLocalStream = (localStream) => {
    state = {
        ...state,
        localStream
    }
};

export const setRemoteStream = (remoteStream) => {
    state = {
        ...state,
        remoteStream
    }
};

export const setAllowConnectionsFromStrangers = (allowConnectionsFromStrangers) => {
    state = {
        ...state,
        allowConnectionsFromStrangers
    }
};

export const getState = () => state;

// -------------- UI EVENTS --------------
// Copy userId
document.getElementById('btn-copy-user-id').addEventListener('click', () => {
    navigator.clipboard.writeText(state.fromUserId);
});

// Call
document.getElementById('btn-call').addEventListener("click", () => {
    webRtcHandler.sendPreOffer(toUserIdElm.value, constants.callType.DIRECT_CALL);
});


// invokes
export function showIncomingCallDialog(data, acceptCallHandler, rejectCallHandler) {
    callerNameElm.innerText = data.userName;
    console.log(data);
    $('#incoming-call-modal').modal('show');
}

export function showCallingDialog(toUserId, cancelCallHandler) {
    calleeNameElm.innerText = toUserId;
    $('#calling-modal').modal('show');
}

export function showToastError(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        style: {
            background: "linear-gradient(108.4deg, rgb(253, 44, 56) 3.3%, rgb(176, 2, 12) 98.4%)"
        }
    }).showToast();
}