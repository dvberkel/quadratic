;(function(quadratic){
    var container = document.getElementById('equation');

    var equation = new quadratic.Equation(
        value.nonZero(value.inRange(-5, 5)),
        value.inRange(-10, 10),
        value.inRange(-100, 100),
        value.random(quadratic.relation)
    );

    new quadratic.EquationView(equation, document.getElementById('equation'));

    var solution = quadratic.solve(equation);
    var solutionSteps = document.getElementById('solution-steps');
    new quadratic.SolutionView(solution, solutionSteps);

    function showSolutionSteps(){
        solutionSteps.classList.add('show');
        solve.classList.add('hide');
    }

    var solve = document.getElementById('solve');
    solve.addEventListener('click', showSolutionSteps);
})(quadratic);
