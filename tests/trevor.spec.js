var trevor = require('../trevor');
var testData = require('./data');
var fs = require('fs');
var moment = require('moment');

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

    describe('Test more complex behaviour', function() {
        var textObj = {
            a: {
                b: 1
            },
            b: {
                c: {
                    d: [1, 2, 3]
                }
            }
        };

        var data = [];

        data.push(textObj);
        data.push(textObj);

        it('it should get the nested value', function() {
            var subGroup = trevor.object.group(data, 'a.b');

            expect(subGroup['a.b'][0]).toEqual(1);
        });
    });

    describe('Test data reduction', function() {
        var data = JSON.parse(fs.readFileSync(__dirname + '/data.json'));
        var formatted = trevor.object.reduceAll(data, {
            distance: function(d) {
                return (d / 1000).toFixed(2) + 'km';
            }
        });

        expect(formatted[0].distance).toBe('25.15km');
    });

    describe('Test Grouping', function() {
        var data = [
            {
                date: '2015-01-31'
            },
            {
                date: '2015-03-03'
            },
            {
                date: '2014-01-31'
            }
        ];

        var formattedData = trevor.array.groupByValue(data, {
            date: function(d) {
                console.log(d);
                return moment(d).format('YYYY');
            }
        });

        it('it should group the dates by year', function() {
            expect(formattedData['2014']).toMatch(data[2]);
            expect(formattedData['2015'].length).toBe(2);
        });
    });
});
