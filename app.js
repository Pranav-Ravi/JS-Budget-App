/*
    TO-DO LIST
    1. Add Event Listener
    2. Get input values
    3. Add the new items to the data structure
    4. Display the new items in the UI
    5. Calculate the revised budget
    6. Display the new Budget in the UI

    STRUCTURING YOUR CODE WITH MODULES
    MODULES
    1. Important aspect of any robust application's architecture.
    2. Keep the units of code for a project both cleanly seperated and organized.
    3. Encapsulate some data into privacy and expose other data publicly.

    SEPERATING OUR TO-DO LIST INTO MODULES
    A. UI MODULE
        1. Display the new items in the UI
        2. Display the new budget in the UI
        3. Get input values
    B. DATA MODULE
        1. Add new items to the data structure
        2. Calculate the revised budget
    C. CONTROLLER MODULE
        1. Add Event Listener

//EXAMPLE CODE
var BudgetController = (function() {
    //private variables and functions
    var x = 18;
    var add = function(y) {
        return x+y;
    }

    //public variables and functions
    return {
        testFunction: function(a) {
            return add(a);
        }
    }
})();

var UIController = (function() {
    //some code
})();

var controller = (function(BudgetCtrl, UICtrl){
    //private variables and functions
    var z = BudgetCtrl.testFunction(9);

    //public variables and functions
    return {
        ctrlTestFunction: function() {
            console.log(z);
        }
    }
})(BudgetController, UIController);
*/



//BUDGET CONTROLLER
var budgetController = (function() {

})();

//USER INTERFACE CONTROLLER
var uiController = (function() {

})();


//GLOBAL CONTROLLER
var controller = (function(budgetCtrl, uiCtrl){

    var ctrlAddItem = function() {

        //1. Get the filled input data

        //2. Add new items to the budget controller

        //3. Add new items to the UI

        //4. Calculate the budget

        //5. Display the new budget in the UI
        console.log('Item has been added!');
    };

    //add__btn event
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
    //enter key press event
    document.addEventListener('keypress', function(event) {
        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, uiController);,