;(function($, fractions){
    function div(a, b){
        return Math.floor(a/b);
    };

    function factorisation(n){
        var result = [];
        var d = 2;
        while (d <= n) {
            while (n % d === 0) {
                result.push(d);
                n = div(n, d);
            }
            d += 1;
        }
        return result;
    };

    $.factors = function factors(n) {
        var ps = factorisation(n);
        if (ps.length > 0) {
            var pns = [[ps[0], 1]];
            var index = 1; var factorIndex = 0;
            while (index < ps.length) {
                if (ps[index] === pns[factorIndex][0]) {
                    pns[factorIndex][1]++;
                } else {
                    pns.push([ps[index], 1]);
                    factorIndex++;
                }
                index++;
            }
            return pns;
        }
        return [[1, 1]];
    };

    function decomposition(n){
        return $.factors(n)
            .map(function(ps){
                var u = ps[1] % 2;
                return [[ps[0], ps[1]-u], [ps[0], u]];
            })
            .map(function(pps){
                return [Math.pow(pps[0][0], pps[0][1]), Math.pow(pps[1][0], pps[1][1])];
            })
            .reduce(function(xs, accumulator){
                return [xs[0] * accumulator[0], xs[1] * accumulator[1]];
            }, [1, 1]);
    };

    function fractionalDecomposition(f){
        var numerators = decomposition(f.numerator);
        var denominators = decomposition(f.denominator);
        return [
            new fractions.Fraction(numerators[0], denominators[0]),
            new fractions.Fraction(numerators[1], denominators[1])
        ];
    };

    var Quadratic = $.Quadratic = function(a, b, D){
        var f = fractionalDecomposition(D);
        this.a = a;
        this.b = b.times(f[0].sqrt());
        this.D = f[1];
    };
    Quadratic.prototype.toString = function(){
        if (this.a.isZero() && this.b.isZero()) {
            return "0";
        }
        if (this.a.isZero()) {
            return this.b.toString() + "&times;&radic;" + this.D.toString() ;
        }
        if (this.b.isZero()) {
            return this.a.toString()
        }
        return this.a.toString() + "+" + this.b.toString() + "&times;&radic;" + this.D.toString();
    };
})(window.extension = window.extension || {}, fractions);
