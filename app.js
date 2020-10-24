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



/**********************************BUDGET CONTROLLER********************************/
var budgetController = (function() {
    
    /*IMP
     It's best to define multiple data values into objects using function constructor
     and store them into arrays   
    */

    //private variables and functions
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {

    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
        /*
         For example,
         sum = 0
         [200, 300, 400]
         1. sum = 0 + 200 = 200
         2. sum = 200 + 300 = 500
         3. sum = 500 + 400 = 900
         final sum value = 900
        */
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //push the new item to the array based in the type
            data.allItems[type].push(newItem);

            //return new item
            return newItem;
        },
        
        calculateBudget: function() {
            //Sum of all income and expenses
            calculateTotal('inc');
            calculateTotal('exp');
            
            //Calculate income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            //Calculate the percentage of income that we spent
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
            /*
                For Example, Expense = 100 and Income = 300, 
                spent = 33.333% = 100/300 = 0.3333 * 100
            */
        },
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testData: function() {
            console.log(data);
        }
    };
})();



/*******************************************USER INTERFACE CONTROLLER****************************************************/
var uiController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        budgetIncLabel: '.budget__income--value',
        budgetExpLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
    };


    //public variables and functions
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either income or expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },

        getDOMstrings: function() {
            return DOMstrings;
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;

            //create HTML string with placeholder text
            if(type==='inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type==='exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
        
            //Replace the placeholder string with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            newHtml = newHtml.replace('%percentage%', obj.percentage);

            //Insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function() {
            var fields, fieldsArr;

            //querySelectorAll returns a list, not an array
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            //trick to convert lists into arrays
            fieldsArr = Array.prototype.slice.call(fields);
            //forEach method acts like a for loop
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            //using focus to put the cursor in the input line, even after pushing 
            //new value to the array
            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.budgetIncLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.budgetExpLabel).textContent = obj.totalExp;

            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
            
        },
    }

})();


/***************************************GLOBAL CONTROLLER************************************************/
var controller = (function(budgetCtrl, uiCtrl){

    //PRIVATE VARIABLES AND FUNCTIONS
    var setupEventListeners = function() {
        var DOM = uiCtrl.getDOMstrings();

        //add__btn event
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        //enter key press event
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
                console.log('Item has been added!.');
            }
        });
        //event delegate
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    }

    var updateBudget = function() {
        //!. Calculate the budget
        budgetCtrl.calculateBudget();
        
        //2. return the budget
        var budget = budgetCtrl.getBudget();
        
        //3. Display the budget on the UI
        uiCtrl.displayBudget(budget);
    };

    var ctrlAddItem = function() {
        var input, newItem;

        //1. Get the filled input data
        input = uiCtrl.getInput();
    
        //Only happens if there is any data
        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add new items to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add new items to the UI
            uiCtrl.addListItem(newItem, input.type);

            //4. Clear the fields
            uiCtrl.clearFields();   
        
            //5. Calculate and update budget
            updateBudget();
        } 
    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID;

        //accessing the parent nodes using reversing/traversing
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        //split the string using hyphen as the center to two
        splitID = itemID.split('-');
        type = spltiID[0];
        ID = splitID[1];

        //1. Delete the item from the data structure

        //2. Delete the item from the UI

        //3. Update and show the new budget
        
    };

    //PUBLIC VARIABLES AND FUNCTIONS
    return {
        init: function() {
            console.log('Application has started!');
            uiCtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }
})(budgetController, uiController);

//call the init function to activate all the event listeners
controller.init();



/********************************NOTES**************************************/

/*
    EVENT DELEGATIONS
    1. Event Bubbling
        When you call an event, for example like a button click, it triggers all the
        parent elements and upto to the html element, which is the root.
    2. Event Target
        In this case, the button will be the event target, since it is the root for
        triggering all the other elements of the HTML DOM.
    3. Event Delegates
        So while triggering an event like this, we can setup and trigger other functions/events
        in any parts of the document, since it triggers the entire document.
    4. Use cases of EVENT DELEGATIONS
        a) When we have an element with lots of child elements that we are interested in.
        b) When we want an event handler attached to an element that is not yet in the DOM
            when our page is loaded.
*/