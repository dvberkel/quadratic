;(function($){
    var Equation = quadratic.Equation = function(a, b, c){
        this.a = (typeof a === 'function') ? a(): a;
        this.b = (typeof b === 'function') ? b(): b;
        this.c = (typeof c === 'function') ? c(): c;
    };

    var CoefficientView = function(equation, coefficient, container){
        this.equation = equation;
        this.coefficient = coefficient;
        this.container = container;
        this.update();
    };
    CoefficientView.prototype.update = function(){
        this.container.innerHTML = this.equation[this.coefficient];
    }

    var EquationView = $.EquationView = function(equation, container){
        this.equation = equation;
        this.container = container;
        this.coefficientViews = [];
        this.initialize();
        this.update();
    };
    EquationView.prototype.initialize = function(){
        this.coefficientViews = ['a', 'b', 'c']
            .map(function(name){
                return {'name': name, 'container': this.container.querySelector('#' + name) };
            }.bind(this))
            .map(function(data){
                return new CoefficientView(this.equation, data.name, data.container);
            }.bind(this));
    }
    EquationView.prototype.update = function(){
        this.coefficientViews.forEach(function(view){
            view.update();
        });
    };
})(window.quadratic = window.quadratic || {});
