/**
 * @example
 * '/abc/g' -> /abc/g
 * @param {String} str - stringified regexp
 * @return {RegExp} - real regexp
 */
const stringToRegexp = (str) => {
  const lastSlash = str.lastIndexOf('/');
  return new RegExp(
    str.slice(1, lastSlash),
    str.slice(lastSlash + 1),
  );
};

/**
 * Makes single-char regular express optional
 * @example
 * /\d/ -> /\d?/
 * @param {RegExp} charRegexp
 * @return {RegExp}
 */
export const makeRegexpOptional = (charRegexp) => (
  stringToRegexp(
    charRegexp.toString()
      .replace(
        /[^\/].*(\/)[gmiyus]{0,6}$/,
        (match) => match.replace(/^([^\^])/, '^$1').replace(/[^\$]$/, '$/').replace('\$/', '?$/'),
      ),
  )
);

/**
 * @param {String} char
 * @return {String}
 */
const escapeIfNeeded = (char) => (
  '[\\^$.|?*+()'.indexOf(char) > -1
    ? `\\${char}`
    : char
);

/**
 * Wraps static character to RegExp
 * @param {String} char
 * @return {RegExp}
 */
const charRegexp = (char) => new RegExp(`/[${escapeIfNeeded(char)}]/`);

/**
 * Determines if value is regular expression
 * @param {String|RegExp} entity
 * @return {boolean}
 */
const isRegexp = (entity) => entity instanceof RegExp;

/**
 * @param {String|RegExp} char
 * @return {RegExp}
 */
export const castToRegexp = (char) => (isRegexp(char) ? char : charRegexp(char));
