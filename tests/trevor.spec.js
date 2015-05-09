var trevor = require('../trevor');
var testData = require('./data');

var grouped = trevor.object.group(testData, ['a', 'b']);

var reduced = trevor.object.reduce(grouped, {
    a: function(vals) {
        return parseFloat(trevor.array.average(vals).toFixed(2));
    },
    b: function(vals) {
        return trevor.array.highest(vals);
    }
});

describe('Test trevor.js', function() {
    it('should group the object properies into a single array', function() {
        expect(grouped.b).toEqual([2, 0, 1]);
    });

    it('it should add array values', function() {
        expect(trevor.array.add(grouped.b)).toEqual(3);
    });

    it('it should return a mean value', function() {
        expect(reduced.a).toEqual(24.6);
    });

     it('it should return the highest value of the array', function() {
        expect(reduced.b).toEqual(2);
    });
});
