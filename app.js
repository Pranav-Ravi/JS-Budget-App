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
    
    /*IMP
     It's best to define multiple data values into objects using function constructor
     and store them into arrays   
    */

    //private variables and functions
    var Expenses = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var allExpenses = [];
    var allIncomes = [];

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    //public varibles and functions
    return {
        //function to add new items to their respective array
        addItem: function(type, des, val) {
            var newItem, ID;

            //create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length-1].id+1;
            } else {
                ID = 0;
            }
            

            //create new item based on whether its a 'exp' or 'inc'
            if(type === 'exp') {
                newItem = new Expenses(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //push the new item to the array based in the type
            data.allItems[type].push(newItem);

            //return new item
            return newItem;
        },

        testData: function() {
            console.log(data);
        }
    };
})();

//USER INTERFACE CONTROLLER
var uiController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };


    //public variables and functions
    return {
        getInputValues: function() {
            return {
                inputType: document.querySelector(DOMstrings.inputType).value, //will be either income or expense
                inputDescription: document.querySelector(DOMstrings.inputDescription).value,
                inputValue: document.querySelector(DOMstrings.inputValue).value
            }
        },

        getDOMstrings: function() {
            return DOMstrings;
        },

        addItemUI: function(obj, type) {
            var html, newHtml, element;

            //create HTML string with placeholder text
            if(type==='inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-0">%id%<div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type==='exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-0">%id%<div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
        
            //Replace the placeholder string with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //Insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
    }

})();


//GLOBAL CONTROLLER
var controller = (function(budgetCtrl, uiCtrl){
    //PRIVATE VARIABLES AND FUNCTIONS
    var setupEventListeners = function() {
        var DOM = uiCtrl.getDOMstrings();

        //add__btn event
        document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);
        //enter key press event
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function() {
        var inputData, newItem;

        //1. Get the filled input data
        inputData = uiCtrl.getInputValues();

        //2. Add new items to the budget controller
        newItem = budgetCtrl.addItem(inputData.inputType, inputData.inputDescription, inputData.inputValue);

        //3. Add new items to the UI
        uiCtrl.addItemUI(newItem, inputData.type);

        //4. Calculate the budget

        //5. Display the new budget in the UI
    };

    //PUBLIC VARIABLES AND FUNCTIONS
    return {
        init: function() {
            setupEventListeners();
        }
    }
})(budgetController, uiController);

//call the init function to activate all the event listeners
controller.init();