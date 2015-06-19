;(function($){
    function first(n){
        var result = [];
        for (var index = 0; index < n; index++){
            result.push(index);
        }
        return result;
    }

    function pick(max){
        return Math.floor(Math.random() * (max + 1));
    }

    function shuffle(elements){
        var copy = elements.slice();
        for (var index = copy.length - 1; index > 0; index--) { // Fischer-Yates
            var swapIndex = pick(index);
            var swapElement = copy[swapIndex];
            copy[swapIndex] = copy[index];
            copy[index] = swapElement;
        }
        return copy;
    }

    function random(elements){
        var shuffled = shuffle(elements);
        return shuffled[0];
    }

    $.inRange = function(low, high){
        var candidates = first(high - low + 1)
            .map(function(element){ return low + element;});
        return function(){
            return random(candidates);
        }
    };

    $.nonZero = function(generator) {
        return function(){
            var result = generator();
            while (result === 0) {
                result = generator();
            }
            return result;
        }
    }

    $.random = function(elements){
        return function(){
            return random(elements);
        }
    }
})(window.value = window.value || {});
