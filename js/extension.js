;(function($){
    var Quadratic = $.Quadratic = function(a, b, D){
        this.a = a;
        this.b = b;
        this.D = D;
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
})(window.extension = window.extension || {});
