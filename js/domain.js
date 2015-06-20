;(function($){
    var responses = {
        '<': [
            function(){ return 'no x'; },
            function(x){ return'no x'; },
            function(x0, x1){ return x0 + ' < x < ' + x1; }
        ],
        '=': [
            function(){ return 'no x'; },
            function(x){ return 'x = ' + x; },
            function(x0, x1){ return 'x = ' + x0 + ' or x = ' + x1; }
        ],
        '>': [
            function(){ return 'all x'; },
            function(x){ return 'all x except x = ' + x; },
            function(x0, x1){ return 'x < ' + x0 + ' or x > ' + x1; }
        ]
    }

    $.response = function(relation, solutions){
        return responses[relation.symbol][solutions.length].apply(null, solutions);
    };
})(window.domain = window.domain || {});
