const StorageStrategy = Object.freeze({
    Cache: 'cache'
});

const StorageKey = 'battlegrounds';

/**
 * @public
 * @async
 */
async function init () {}

/**
 * @public
 * @param {*} payload to be JSON.stringify-ed
 * @param {SaveStrategy} type default strategy is to save to cache
 */
function save (payload, type=StorageStrategy.Cache) {
    try {
        if(Object.values(StorageStrategy).includes(type) === false) {
            throw new Error();
        }

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

        // dev: if the data are corrupted; just clear the saved (cached) data
        // ... not sure if it should be like that in prod.
        localStorage.clear();
    }
}

export {
    init,
    StorageStrategy, load, save
};