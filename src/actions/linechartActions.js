
export function showtip(detail) {

    return {
        type: 'SHOW_TOOLTIP',
        payload:detail
    };

}
export function hidetip(detail) {

    return {
        type: 'HIDE_TOOLTIP',
        payload:detail
    };

}