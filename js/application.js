;(function(quadratic){
    var container = document.getElementById('equation');

    var equation = new quadratic.Equation(1, 5, 6);
    new quadratic.EquationView(equation, container);
})(quadratic);
