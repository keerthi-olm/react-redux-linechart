
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