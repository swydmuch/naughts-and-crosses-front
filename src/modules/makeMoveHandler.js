import {appConfig} from "../../app.config";
import data from "bootstrap/js/src/dom/data";

export const makeMoveHandler = (x, y, gameId, cbMarkMove, cbStopLoading) => {

    const requestInit = {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `x=${x}&y=${y}`
    }

    fetch(appConfig.apiDomain + `/games/${gameId}/humanMoves`, requestInit)
    .then(response => response.json())
    .then(() => {
        cbMarkMove(x,y,'X');
        return fetch(appConfig.apiDomain + `/games/${gameId}`)
    })
    .then(response => response.json())
    .then(data => checkStatusAfterMove(appConfig.apiDomain, gameId, data.status, true, cbStopLoading))
    .then(response => response.json())
    .then(data => {
        cbMarkMove(data.x,data.y, 'O');
        return fetch(appConfig.apiDomain + `/games/${gameId}`)
    })
    .then(response => response.json())
    .then(data => checkStatusAfterMove(appConfig.apiDomain, gameId, data.status, false, cbStopLoading))
    .catch(console.error);
}

function checkStatusAfterMove(apiDomain, gameId, status, getAIResponseAfterCheck, cbStopLoading) {

    if (status === 'victory') {
        cbStopLoading();
        alert('Zwycięstwo');
    } else if (status === 'draw') {
        cbStopLoading();
        alert('Remis');
    } else if(status === 'continues') {
        if (getAIResponseAfterCheck) {
            return fetch(apiDomain + `/games/${gameId}/AIMoves`, {
                method: 'POST'
            })
        } else {
            cbStopLoading();
        }
    }
}
