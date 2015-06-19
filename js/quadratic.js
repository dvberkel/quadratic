;(function($, fractions, extension){
    var Relation = function(symbol){
        this.symbol = symbol;
    };
    Relation.prototype.setOpposite = function(opposite){
        this.opposite = opposite;
    };

    var Equation = quadratic.Equation = function(a, b, c, relation){
        this.a = (typeof a === 'function') ? a(): a;
        this.b = (typeof b === 'function') ? b(): b;
        this.c = (typeof c === 'function') ? c(): c;
        this.relation = (typeof relation == 'function') ? relation(): relation;
    };
    Equation.prototype.normalize = function(){
        var d = this.a;
        return new Equation(
            this.a.dividedBy(d),
            this.b.dividedBy(d),
            this.c.dividedBy(d),
            this.a.isNegative() ? this.relation.opposite: this.relation
        );
    };

    quadratic.solve = function(equation){
        var minus1 = new fractions.Fraction(-1, 1);
        var halve = new fractions.Fraction(1, 2);
        var two = new fractions.Fraction(2, 1);
        var four = new fractions.Fraction(4, 1);
        var normalized = equation.normalize();
        var top = normalized.b.dividedBy(two).times(minus1);
        var D = normalized.b.times(normalized.b).minus(four.times(normalized.c));
        var result = {
            'normalized' : normalized,
            'top': top,
            'D': D
        };
        if (!D.isNegative()) {
            if (D.isZero()) {
                result.solutions = [top];
            } else {
                result.solitions = [
                    new extension.Quadratic(top, halve.times(minus1), D),
                    new extension.Quadratic(top, halve, D)
                ];
            }
        }
        return result;
    }

    var CoefficientView = function(equation, coefficient, container){
        this.equation = equation;
        this.coefficient = coefficient;
        this.container = container;
        this.update();
    };
    CoefficientView.prototype.update = function(){
        this.container.innerHTML = this.equation[this.coefficient];
    }

    var RelationView = function(equation, container){
        this.equation = equation;
        this.container = container;
        this.update();
    };
    RelationView.prototype.update = function(){
        this.container.innerHTML = this.equation.relation.symbol;
    }

    var EquationView = $.EquationView = function(equation, container){
        this.equation = equation;
        this.container = container;
        this.views = [];
        this.initialize();
        this.update();
    };
    EquationView.prototype.initialize = function(){
        this.views = ['a', 'b', 'c']
            .map(function(name){
                return {'name': name, 'container': this.container.querySelector('.coefficient.' + name) };
            }.bind(this))
            .map(function(data){
                return new CoefficientView(this.equation, data.name, data.container);
            }.bind(this));
        this.views.push(new RelationView(this.equation, this.container.querySelector('#relation')));
    }
    EquationView.prototype.update = function(){
        this.views.forEach(function(view){
            view.update();
        });
    };

    var relation = $.relation = (function(){
        var less = new Relation('<');
        var equal = new Relation('=');
        var more = new Relation('>');
        less.setOpposite(more);
        equal.setOpposite(equal);
        more.setOpposite(less);
        return [less, equal, more];
    })();
})(window.quadratic = window.quadratic || {}, fractions, extension);
