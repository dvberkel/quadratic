;(function(quadratic){
    var container = document.getElementById('equation');

    var equation = new quadratic.Equation(
        value.nonZero(value.inRange(-5, 5)),
        value.inRange(-10, 10),
        value.inRange(-100, 100),
        value.random(quadratic.relation)
    );
    new quadratic.EquationView(equation, container);
})(quadratic);
