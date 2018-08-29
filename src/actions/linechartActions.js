
export function showtip(toolTip) {

    return {
        type: 'SHOW_TOOLTIP',
        payload:toolTip
    };

}
export function hidetip(toolTip) {

    return {
        type: 'HIDE_TOOLTIP',
        payload:toolTip
    };

}
export function getMapData(payload) {

    return {
        type: 'GET_MAPDATA',
        payload:payload
    };

}

export function resize(payload) {

    return {
        type: 'RESIZE',
        payload:payload
    };

}
