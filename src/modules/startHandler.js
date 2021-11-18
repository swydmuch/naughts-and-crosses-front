import {appConfig} from "../../app.config";
export const startHandler = (callback) => {
    const boardSize = appConfig.boardSize;
    const lineSize = appConfig.lineSize;
    const startingPlayer = appConfig.startingPlayer;
    const requestInit = {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `boardSize=${boardSize}&lineSize=${lineSize}&startingPlayer=${startingPlayer}`,
    }
    fetch(appConfig.apiDomain + '/games', requestInit)
    .then(response => response.json())
    .then(data => {
        callback( data.id);
    })
    .catch(console.error);
}

