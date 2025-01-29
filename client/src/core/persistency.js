const StorageKey = 'battlegrounds';

/**
 * @public
 * @param {*} payload to be JSON.stringify-ed
 */
function save (payload) {
    try {
        payload = JSON.stringify(payload);

        localStorage.setItem(StorageKey, payload);
    } catch (err) {
        console.error(err);
    }
}

/**
 * @public
 * @returns {Object}
 */
function load () {
    try {
        return JSON.parse(
            localStorage.getItem(StorageKey) || '{}'
        );
    } catch (err) {
        console.error(err);
    }
}

export {
    load, save
};