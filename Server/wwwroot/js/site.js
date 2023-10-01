import * as store from './states.js';
import * as wss from './wss.js';

while (true) {
    let userName = prompt("Please enter you name:");
    userName = (userName ?? "").trim();
    if (userName.length > 1) {
        store.setUserName(userName);
        break;
    }
}

wss.registerSignalREvents();
