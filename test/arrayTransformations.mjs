import assert from 'node:assert';
import test from 'node:test';

import {
    adjustArrayLength,
    resizeArray,
    safeSplice,
    removeItem,
    removeMultipleItems,
    scaleToRange,
    scaleToSum,
    pick,
    pickN,
    low2HighSort,
    high2LowSort,
    takeN,
    takeTo,
    loopTo,
    zip,
    buildZip,
    shuffle,
    gatherBySubstring,
    flipBooleans,
} from '../arrayTransformations.js';

test('adjustArrayLength', async (t) => {
    await t.test('same length', () => {
        const result = adjustArrayLength(3, [1, 2, 3]);
        assert.equal(result.length, 3);
        assert.deepStrictEqual(result, [1, 2, 3]);
    });

    await t.test('smaller length', () => {
        const result = adjustArrayLength(3, [1, 2]);
        assert.equal(result.length, 3);
        assert.deepStrictEqual(result, [1, 2, 1]);
    });

    await t.test('larger length', () => {
        const result = adjustArrayLength(3, [1, 2, 3, 4]);
        assert.equal(result.length, 3);
        assert.deepStrictEqual(result, [1, 2, 3]);
    });

    // TODO: Error type shold be considered.
    await t.test('array is empty (TODO: Error type shold be considered)', () => {
        assert.throws(() => adjustArrayLength(3, []), {
            name: 'RangeError',
            message: 'Invalid array length',
        });
    });

    // TODO: Error type shold be considered.
    await t.test('array is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => adjustArrayLength(3, null), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'length')",
        });
    });
});

// Note: It looks that the result of `resizeArray` is same as `adjustArrayLength`.
test('resizeArray', async (t) => {
    await t.test('same size', () => {
        const result = resizeArray(3, [1, 2, 3]);
        assert.equal(result.length, 3);
        assert.deepStrictEqual(result, [1, 2, 3]);
    });

    await t.test('smaller size', () => {
        const result = resizeArray(3, [1, 2]);
        assert.equal(result.length, 3);
        assert.deepStrictEqual(result, [1, 2, 1]);
    });

    await t.test('larger size', () => {
        const result = resizeArray(3, [1, 2, 3, 4]);
        assert.equal(result.length, 3);
        assert.deepStrictEqual(result, [1, 2, 3]);
    });

    // TODO: Error type shold be considered.
    await t.test('array is empty (TODO: Error type shold be considered)', () => {
        assert.throws(() => resizeArray(3, []), {
            name: 'RangeError',
            message: 'Invalid array length',
        });
    });

    // TODO: Error type shold be considered.
    await t.test('array is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => resizeArray(3, null), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'length')",
        });
    });
});

test('safeSplice', async (t) => {
    await t.test('splice without replaceWith', () => {
        const result = safeSplice([1, 2, 3, 4, 5, 6, 7], 2, 3);
        assert.deepStrictEqual(result, [1, 2, 3, 6, 7]);
    });

    await t.test('splice with replaceWith', () => {
        const result = safeSplice([1, 2, 3, 4, 5, 6, 7], 2, 3, 99);
        assert.deepStrictEqual(result, [1, 2, 3, 99, 6, 7]);
    });

    await t.test('splice with replaceWith array', () => {
        const result = safeSplice([1, 2, 3, 4, 5, 6, 7], 2, 3, [100, 200, 300]);
        assert.deepStrictEqual(result, [1, 2, 3, [100, 200, 300], 6, 7]);
    });

    await t.test('amount is larger than array length', () => {
        const result = safeSplice([1, 2, 3, 4, 5, 6, 7], 20, 3);
        assert.deepStrictEqual(result, [1, 2, 3]);
    });

    await t.test('index is larger than array length', () => {
        const result = safeSplice([1, 2, 3, 4, 5, 6, 7], 2, 9);
        assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6, 7]);
    });

    await t.test('array is empty without replaceWith', () => {
        const result = safeSplice([], 2, 3);
        assert.deepStrictEqual(result, []);
    });

    await t.test('array is empty with replaceWith', () => {
        const result = safeSplice([], 2, 3, 100);
        assert.deepStrictEqual(result, [100]);
    });

    // TODO: Error type shold be considered.
    await t.test('array is null without replaceWith (TODO: Error type shold be considered)', () => {
        assert.throws(() => safeSplice(null, 2, 3), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'slice')",
        });
    });

    // TODO: Error type shold be considered.
    await t.test('array is null with replaceWith (TODO: Error type shold be considered)', () => {
        assert.throws(() => safeSplice(null, 2, 3, 99), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'slice')",
        });
    });
});

test('removeItem', async (t) => {
    await t.test('remove item', () => {
        const result = removeItem([1, 2, 3], 2);
        assert.deepStrictEqual(result, [1, 3]);
    });

    await t.test('remove multiple items', () => {
        const result = removeItem([1, 2, 3, 4, 2, 5, 2, 6, 2], 2);
        assert.deepStrictEqual(result, [1, 3, 4, 5, 6]);
    });

    await t.test('remove nothing', () => {
        const result = removeItem([1, 2, 3, 4, 5, 6], 7);
        assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6]);
    });

    await t.test('array is empty', () => {
        const result = removeItem([], 2);
        assert.deepStrictEqual(result, []);
    });

    // TODO: Error type shold be considered.
    await t.test('array is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => removeItem(null, 2), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'filter')",
        });
    });
});

test('removeMultipleItems', async (t) => {
    await t.test('remove items', () => {
        const result = removeMultipleItems([1, 2, 3, 4, 5, 6], [3, 5]);
        assert.deepStrictEqual(result, [1, 2, 4, 6]);
    });

    await t.test("items aren't available", () => {
        const result = removeMultipleItems([1, 2, 3, 4, 5, 6], [7, 8, 9]);
        assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6]);
    });

    await t.test('items is empty', () => {
        const result = removeMultipleItems([1, 2, 3, 4, 5, 6], []);
        assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6]);
    });

    // TODO: Error type shold be considered.
    await t.test("items isn't array (TODO: Error type shold be considered)", () => {
        assert.throws(() => removeMultipleItems([1, 2, 3, 4, 5, 6], 3), {
            name: 'TypeError',
            message: 'itemsToRemove.includes is not a function',
        });
    });

    // TODO: Error type shold be considered.
    await t.test('items is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => removeMultipleItems([1, 2, 3, 4, 5], null), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'includes')",
        });
    });

    await t.test('array is empty', () => {
        const result = removeMultipleItems([], [4, 6]);
        assert.deepStrictEqual(result, []);
    });

    // TODO: Error type shold be considered.
    await t.test('array is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => removeMultipleItems(null, [1, 2, 3]), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'filter')",
        });
    });
});

test('scaleToRange', async (t) => {
    await t.test('1 to 10 -> 10 to 100', () => {
        const result = scaleToRange([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, 10, 10, 100);
        assert.deepStrictEqual(result, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    });

    await t.test('1 to 10 -> 10 to 1', () => {
        const result = scaleToRange([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, 10, 10, 1);
        assert.deepStrictEqual(result, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });

    // TODO: TODO: should consider for Floating Point Arithmetic (IEEE 754 https://en.wikipedia.org/wiki/IEEE_754  await t.test(
    await t.test(
        '0 to 1 -> 0 to 127 (like MIDI value) (TODO: should consider for Floating Point Arithmetic (IEEE 754 https://en.wikipedia.org/wiki/IEEE_754))',
        () => {
            const result = scaleToRange([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], 0, 1, 0, 127);
            assert.deepStrictEqual(
                result,
                [
                    0, 12.700000000000001, 25.400000000000002, 38.1, 50.800000000000004, 63.5, 76.2, 88.89999999999999,
                    101.60000000000001, 114.3, 127,
                ]
            );
        }
    );
});
test('scaleToSum', async (t) => {
    await t.test('10 times / sum 6', () => {
        const result = scaleToSum(10, [1, 2, 3]);
        assert.deepStrictEqual(result, [10 / 6, 20 / 6, 30 / 6]);
    });

    await t.test('array is null', () => {
        assert.throws(() => scaleToSum(10, null), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'reduce')",
        });
    });
});

test('pick', async (t) => {
    // Override Math.random to return 0.5 for testing.
    const tmpFn = Math.random;
    Math.random = () => 0.5;
    await t.test('pick center value in odd array', () => {
        const result = pick([1, 2, 3, 4, 5]);
        assert.equal(result, 3);
    });

    await t.test('pick upper index in even array', () => {
        const result = pick([1, 2, 3, 4, 5, 6]);
        assert.equal(result, 4);
    });

    await t.test('array is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => pick(null), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'length')",
        });
    });
    // Revert Math.random
    Math.random = tmpFn;
});

test('pickN', async (t) => {
    // Override Math.random to return 0.5 for testing.
    const tmpFn = Math.random;
    Math.random = () => 0.5;
    await t.test('pick center value in odd array', () => {
        const result = pickN(5, [1, 2, 3, 4, 5]);
        assert.deepStrictEqual(result, [3, 3, 3, 3, 3]);
    });

    await t.test('pick upper index in even array', () => {
        const result = pickN(5, [1, 2, 3, 4, 5, 6]);
        assert.deepStrictEqual(result, [4, 4, 4, 4, 4]);
    });

    await t.test('pick 0 length', () => {
        const result = pickN(0, [1, 2, 3, 4, 5, 6]);
        assert.deepStrictEqual(result, []);
    });

    await t.test('pick -1 length', () => {
        const result = pickN(-1, [1, 2, 3, 4, 5, 6]);
        assert.deepStrictEqual(result, []);
    });

    await t.test('array is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => pickN(3, null), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'length')",
        });
    });

    // Revert Math.random
    Math.random = tmpFn;
});

test('low2HighSort', async (t) => {
    await t.test('low to high', () => {
        const result = low2HighSort([8, 2, 4, 9, 6, 7, 1, 3, 5]);
        assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    await t.test('array is empty', () => {
        const result = low2HighSort([]);
        assert.deepStrictEqual(result, []);
    });

    await t.test('array is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => low2HighSort(null), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'sort')",
        });
    });
});

test('high2LowSort', async (t) => {
    await t.test('high to low', () => {
        const result = high2LowSort([8, 2, 4, 9, 6, 7, 1, 3, 5]);
        assert.deepStrictEqual(result, [9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });

    await t.test('array is empty', () => {
        const result = high2LowSort([]);
        assert.deepStrictEqual(result, []);
    });

    // TODO
    await t.test('array is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => high2LowSort(null), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'sort')",
        });
    });
});

test('takeN', async (t) => {
    await t.test('n is smaller than length', () => {
        const result = takeN([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
        assert.deepStrictEqual(result, [1, 2, 3]);
    });

    await t.test('n is bigger than length', () => {
        const result = takeN([1, 2, 3], 5);
        assert.deepStrictEqual(result, [1, 2, 3, 1, 2]);
    });

    await t.test('n is 0', () => {
        const result = takeN([1, 2, 3], 0);
        assert.deepStrictEqual(result, []);
    });

    await t.test('n is -1', () => {
        const result = takeN([1, 2, 3], -1);
        assert.deepStrictEqual(result, []);
    });

    // TODO: Maybe filled by undefined is not unexpected behavior
    await t.test('array is empty (TODO: Maybe filled by "undefined" is not unexpected behavior)', () => {
        const result = takeN([], 3);
        assert.deepStrictEqual(result, [undefined, undefined, undefined]);
    });

    // TODO
    await t.test('array is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => takeN(null, 3), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'length')",
        });
    });
});

test('takeTo', async (t) => {
    await t.test('n is less than sum', () => {
        const result = takeTo(3, [1, 2, 3]);
        assert.deepStrictEqual(result, [1, 2]);
    });

    await t.test('n is bigger than sum', () => {
        const result = takeTo(15, [1, 2, 3]);
        assert.deepStrictEqual(result, [1, 2, 3, 1, 2, 3, 1, 2]);
    });

    await t.test('n is 0', () => {
        const result = takeTo(0, [1, 2, 3]);
        assert.deepStrictEqual(result, []);
    });

    // FIXME: return '[ '-1': NaN ]' when -1 is given.
    await t.test('n is -1', () => {
        const result = takeTo(-1, [1, 2, 3]);
        assert.deepStrictEqual(result, []);
    });

    // TODO
    await t.test('array is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => takeTo(3, null), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'length')",
        });
    });
});

test('loopTo', async (t) => {
    await t.test('loop 2 times', () => {
        const actual = loopTo(30, [1, 2, 3, 4, 5]);
        assert.deepStrictEqual(actual, [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
    });

    await t.test('stop at targetLength', () => {
        const actual = loopTo(3, [1, 2, 3, 4, 5]);
        assert.deepStrictEqual(actual, [1, 2]);
    });

    await t.test('targetLength is 0', () => {
        const actual = loopTo(0, [1, 2, 3, 4, 5]);
        assert.deepStrictEqual(actual, []);
    });

    // FIXME: return '[ '-1': NaN ]' when -1 is given.
    await t.test('targetLength is -1', () => {
        const actual = loopTo(-1, [1, 2, 3, 4, 5]);
        assert.deepStrictEqual(actual, []);
    });

    // FIXME: Maybe it should return empty array.
    await t.test('array is empty', () => {
        const actual = loopTo(3, []);
        assert.deepStrictEqual(actual, []);
    });

    // TODO
    await t.test('array is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => loopTo(3, null), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'reduce')",
        });
    });
});

test('zip', async (t) => {
    await test('same length', () => {
        const actual = zip([1, 2, 3], [10, 20, 30]);
        assert.deepStrictEqual(actual, [
            [1, 10],
            [2, 20],
            [3, 30],
        ]);
    });

    await test('left is bigger', () => {
        const actual = zip([1, 2, 3], [10, 20]);
        assert.deepStrictEqual(actual, [
            [1, 10],
            [2, 20],
        ]);
    });

    await test('right is bigger', () => {
        const actual = zip([1, 2], [10, 20, 30]);
        assert.deepStrictEqual(actual, [
            [1, 10],
            [2, 20],
        ]);
    });
});

test('buildZip', async (t) => {
    await t.test('zip 3 x 3', () => {
        const actual = buildZip(
            [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ],
            [
                [10, 20, 30],
                [40, 50, 60],
                [70, 80, 90],
            ]
        );
        assert.deepStrictEqual(actual, [
            [1, 2, 3, 10, 20, 30],
            [4, 5, 6, 40, 50, 60],
            [7, 8, 9, 70, 80, 90],
        ]);
    });
});

test('shuffle', async (t) => {
    await t.test('include all values', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const actual = shuffle(input);

        input.forEach((x) => {
            assert.equal(actual.includes(x), true);
        });
    });

    await t.test('array is empty', () => {
        const actual = shuffle([]);
        assert.deepStrictEqual(actual, []);
    });
});

test('gatherBySubstring', async (t) => {
    await t.test('include some values', () => {
        const actual = gatherBySubstring(['abc', 'def', 'ghi'], ['b', 'i']);
        assert.deepStrictEqual(actual, ['abc', 'ghi']);
    });

    await t.test('include nothing', () => {
        const actual = gatherBySubstring(['abc', 'def', 'ghi'], ['x', 'y', 'z']);
        assert.deepStrictEqual(actual, []);
    });

    await t.test('input is empty', () => {
        const actual = gatherBySubstring([], ['x', 'y', 'z']);
        assert.deepStrictEqual(actual, []);
    });

    await t.test('substring is empty', () => {
        const actual = gatherBySubstring(['abc', 'def', 'ghi'], []);
        assert.deepStrictEqual(actual, []);
    });

    // TODO
    await t.test('input is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => gatherBySubstring(null, ['x', 'y', 'z']), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'filter')",
        });
    });

    // TODO
    await t.test('substring is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => gatherBySubstring(['abc', 'def', 'ghi'], null), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'some')",
        });
    });
});

test('flipBooleans', async (t) => {
    await t.test('flip', () => {
        const actual = flipBooleans([true, false, false, true, true]);
        assert.deepStrictEqual(actual, [false, true, true, false, false]);
    });

    await t.test('integer', () => {
        const actual = flipBooleans([0, 1, 2, 3]);
        assert.deepStrictEqual(actual, [true, false, false, false]);
    });

    await t.test('array is empty', () => {
        const actual = flipBooleans([]);
        assert.deepStrictEqual(actual, []);
    });

    // TODO
    await t.test('array is null (TODO: Error type shold be considered)', () => {
        assert.throws(() => flipBooleans(null), {
            name: 'TypeError',
            message: "Cannot read properties of null (reading 'map')",
        });
    });
});
