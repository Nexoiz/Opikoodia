function start() {
    console.log("----Method invocation pattern----");

    var person = {
        name:"Calvin",
        age:25,
        greet:function() {
            console.log("Hello, my name is",this.name);
        }
    }

    person.greet();
    
    console.log("----Function invocation pattern----");

    person.calculateAge = function(years) {
        function calculateYears() {
            return this.age + years;
        }
        console.log("I will be "+calculateYears()+" old in "+years+" years");
    }

    person.calculateAge(10);

    console.log("----Let's fix this----");

    person.calculateAge = function(years) {
        function calculateYears() {
            return this.age + years;
        }
        calculateYears = calculateYears.bind(this); //binds the this function inside calculateYeras correctly to the parent function
        console.log("I will be "+calculateYears()+" old in "+years+" years");
    }
    person.calculateAge(10);
}