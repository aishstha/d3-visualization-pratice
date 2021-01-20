import color from 'color';

/**
 * Return an rgba string value for CSS
 * @param  {String} hex     Hexidecimal color value
 * @param  {Number} opacity Number value between 0 and 1
 * @return {String}         RGBA string
 */
function rgba(hex, opacity) {
    return color(hex)
        .alpha(opacity)
        .string();
}

function checkLuminosity(colorValue) {
    if (color(colorValue).luminosity() < 0.6) return 'dark';
    else return 'light';
}

/**
 * Replicate Sass's darken function
 * @param  {String} hex    Hexidecimal color value to modify
 * @param  {Number} amount Amount to lighten, between 1 and 100
 * @return {String}        New hexidecimal color value
 */
function darken(hex, amount) {
    return color(hex)
        .darken(amount / 100)
        .hexString();
}

export { rgba, checkLuminosity, darken };