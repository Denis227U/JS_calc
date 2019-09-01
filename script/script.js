'use strict';

const start = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],

    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-items').querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-items').querySelector('.expenses-title'),
    
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),

    
    periodAmount = document.querySelector('.period-amount'),
    cancel = document.getElementById('cancel'),

    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');    


function AppClass(budget, budgetDay, budgetMonth, income, incomeMonth, addIncome, expenses, addExpenses, expensesMonth, deposit, percentDeposit, moneyDeposit){
    this.budget = budget;
    this.budgetDay = budgetDay;
    this.budgetMonth = budgetMonth;
    this.income = income;
    this.incomeMonth = incomeMonth;
    this.addIncome = addIncome;
    this.expenses = expenses;
    this.addExpenses = addExpenses;
    this.expensesMonth = expensesMonth;
    this.deposit = deposit;
    this.percentDeposit = percentDeposit;
    this.moneyDeposit = moneyDeposit;
}

AppClass.prototype.start = function(){
    if (salaryAmount.value === '') {
        start.disabled = true;
        return;
    }           

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddBlock('getAddExpenses');
    this.getAddBlock('getAddIncome');
    this.getInfoDeposit();              
    this.getBudget();
    this.showResult();

    start.style.display = 'none';
    cancel.style.display = 'block';

    const inputText = document.querySelector('.data').querySelectorAll('input[type=text]');

    inputText.forEach((item) => {
        item = item.setAttribute('disabled', '');
    });
};
AppClass.prototype.showResult = function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    
    incomePeriodValue.value = this.calcSavedMoney();
    
    periodSelect.addEventListener('change', this.periodShow());
};
AppClass.prototype.addBlock = function(e, itemsSelec){ 
    let items = document.querySelectorAll(`.${itemsSelec}`);
    const cloneItems = items[0].cloneNode(true);
    items[0].parentNode.insertBefore(cloneItems, e.target);
    items = document.querySelectorAll(`.${itemsSelec}`);
    if (items.length === 3) {
        console.log(items.length);
        e.target.style.display = 'none';
    }
};
AppClass.prototype.getExpenses = function(){
    expensesItems.forEach((item) => {
        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }            
    });
};
AppClass.prototype.getIncome = function(){
    incomeItems.forEach((item) => {
        const itemIncome = item.querySelector('.income-title').value;
        const cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
        }
    });
};
AppClass.prototype.getAddBlock = function(getAddItem){   
    if (getAddItem === 'getAddExpenses') {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    } else {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    }
};
AppClass.prototype.getInfoDeposit = function(){
    if(this.deposit){
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }
};
AppClass.prototype.getExpensesMonth = function(){
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
AppClass.prototype.getBudget = function(){
    this.budgetMonth = parseInt(this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit)/12);
    this.budgetDay = Math.ceil(this.budgetMonth / 30); 
};
AppClass.prototype.getTargetMonth = function(){
    return targetAmount.value / this.budgetMonth;
};
AppClass.prototype.getStatusIncome = function(){
    if (this.budgetDay >= 800) {
        return ('Высокий уровень дохода');
    } else if (this.budgetDay >= 300) {
        return ('Средний уровень дохода');
    } else if (this.budgetDay > 0) {
        return ('Низкий уровень дохода');
    } else if (this.budgetDay <= 0) {
        return ('Что то пошло не так');
    }
};
AppClass.prototype.calcSavedMoney = function(){
    return this.budgetMonth * periodSelect.value;
};
AppClass.prototype.periodShow = function(){
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = appData.calcSavedMoney();
};
AppClass.prototype.moneyCheck = function(){
    if (salaryAmount.value === '') {
        start.disabled = true;
    } else if(start.disabled = true){
        start.disabled = false;
    }
};
AppClass.prototype.reset = function(){
    const inputTextAll = document.querySelectorAll('input[type=text]');

    inputTextAll.forEach((item) => {
        item = item.removeAttribute('disabled');
    });

    inputTextAll.forEach((item) => {
        item.value = '';
    });


    periodSelect.value = '1';
    periodAmount.textContent = periodSelect.value;
    

    const incomeChilds = document.querySelector('.income');
    incomeItems = document.querySelectorAll('.income-items');
    expensesItems = document.querySelectorAll('.expenses-items');
    if (incomeItems.length === 3) {
        incomeChilds.removeChild(incomeItems[2]);
        incomeChilds.removeChild(incomeItems[1]);
        incomePlus.style.display = 'block';
    } else if(incomeItems.length === 2) {
        incomeChilds.removeChild(incomeItems[1]);
    }

    const expensesChilds = document.querySelector('.expenses');
    if (expensesItems.length === 3) {
        expensesChilds.removeChild(expensesItems[2]);
        expensesChilds.removeChild(expensesItems[1]);
        expensesPlus.style.display = 'block';
    } else if(expensesItems.length === 2) {
        expensesChilds.removeChild(expensesItems[1]);
    }


    if (depositCheck.checked) {
        depositCheck.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        appData.deposit = 'false';
    }


    
    this.budget = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;

    cancel.style.display = 'none';
    start.style.display = 'block';
};
AppClass.prototype.eventsListeners = function(){
    // expensesPlus.addEventListener('click', appData.addBlock);
    expensesPlus.addEventListener('click', function(e) {
        appData.addBlock(e, 'expenses-items');
    });
    // incomePlus.addEventListener('click', appData.addBlock);
    incomePlus.addEventListener('click', function(e) {
        appData.addBlock(e, 'income-items');
    });
    periodSelect.addEventListener('change', appData.periodShow);
    salaryAmount.addEventListener('change', appData.moneyCheck);
    
    depositCheck.addEventListener('change', () => {
        if(depositCheck.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            appData.deposit = 'true';
            depositBank.addEventListener('change', function(){
                let selectIndex = this.options[this.selectedIndex].value;
                if (selectIndex === 'other') {
                    depositPercent.style.display = 'inline-block';
                    depositPercent.value = '';
                    depositPercent.removeAttribute('disabled');
                }else {
                    depositPercent.style.display = 'none';
                    depositPercent.value = selectIndex;
                }
            });
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositAmount.value = '';
            appData.deposit = 'false';
        }
    });
    
    
    
    start.addEventListener('click', appData.start.bind(appData));
    cancel.addEventListener('click', appData.reset.bind(appData));
};

const appData = new AppClass(0, 0, 0, {}, 0, [], {}, [], 0, false, 0 , 0);

appData.eventsListeners();
