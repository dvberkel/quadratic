;(function($){
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
                return {'name': name, 'container': this.container.querySelector('#' + name) };
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
})(window.quadratic = window.quadratic || {});
