;(function($){
    function gcd(a, b) {
        if (b === 0){
            return Math.abs(a);
        } else {
            return gcd(b, a % b);
        }
    }

    var Fraction = $.Fraction = function(numerator, denominator){
        if (denominator === 0){
            throw new Error('denominator can not be zero');
        }
        numerator *= Math.sign(denominator);
        denominator = Math.abs(denominator);
        var d = gcd(numerator, denominator);
        this.numerator = numerator/d;
        this.denominator = denominator/d;
    };
    Fraction.prototype.plus = function(that) {
        return new Fraction(
            this.numerator * that.denominator + that.numerator * this.denominator,
            this.denominator * that.denominator
        );
    };
    Fraction.prototype.minus = function(that) {
        return new Fraction(
            this.numerator * that.denominator - that.numerator * this.denominator,
            this.denominator * that.denominator
        );
    };
    Fraction.prototype.times = function(that) {
        return new Fraction(
            this.numerator * that.numerator,
            this.denominator * that.denominator
        );
    };
    Fraction.prototype.dividedBy = function(that) {
        return new Fraction(
            this.numerator * that.denominator,
            this.denominator * that.numerator
        );
    };
    Fraction.prototype.inverse = function(){
        return new Fraction(this.denominator, this.numerator);
    };
    Fraction.prototype.isZero = function(){
        return this.numerator === 0;
    }
    Fraction.prototype.isNegative = function(){
        return this.numerator < 0;
    }
    Fraction.prototype.toString = function(){
        if (this.denominator === 1) {
            return this.numerator.toString();
        } else {
            return this.numerator.toString() + "/" + this.denominator.toString();
        }
    };
})(window.fractions = window.fractions || {});
