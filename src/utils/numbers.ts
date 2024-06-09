import Big from 'big.js';

export function doRiskyBigOperation(callback: () => Big): Big {
    try {
        return callback();
    } catch (err) {
        return Big(0);
    }
}
