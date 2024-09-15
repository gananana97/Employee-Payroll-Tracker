// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

//prompts for name and iterates through both first and last name and uses custom 
//verifyConditions function to rePrompt the user if conditions arent met
function promptForName(newEmployee) {
      newEmployee.firstName = prompt('First Name: ');
      while (!verifyConditions(newEmployee.firstName)) {
        newEmployee.firstName = prompt('Please enter valid first name. (only letters of the alphabet and atleast 1 chararcter)');
      }  
      newEmployee.lastName = prompt('Last Name: ');
      while (!verifyConditions(newEmployee.lastName)) {
        newEmployee.lastName = prompt('Please enter valid last name. (only letters of the alphabet and atleast 1 chararcter)');
      } 
  }

  function verifyConditions (currentEl) {
      let areConditionsMet = false;
      if (currentEl.length < 1) {
        return areConditionsMet;
      }
      for (let i = 0; i < currentEl.length; i++) {
        const asciiValue = currentEl[i].charCodeAt();
        if(!(asciiValue >= 97 && asciiValue <= 122 || asciiValue >= 60 && asciiValue <= 95))
          {
            return areConditionsMet;
          } 
      }
      areConditionsMet = true;
      return areConditionsMet; 
  }
    
const employeesArray = [];
// Collect employee data
const collectEmployees = function() {
  
  // TODO: Get user input to create and return an array of employee objects
   while(true) {
    const newEmployee = {
      firstName: '',
      lastName: '',
      salary: 0
    };

    // rePrompt user if any of the data doesnt fit these criterias 
    // 1- Names can ONLY contain letters of the alphabet (no special characters)
    // 2- Salary can ONLY have numbers
    promptForName(newEmployee);

    newEmployee.salary = Number(prompt('Salary: '));
    while(isNaN(newEmployee.salary))
      {
        newEmployee.salary = Number(prompt('Please enter valid number'));
      }
    // push newEmployee to array
    employeesArray.push(newEmployee);

    const keepGoing = confirm('Press continue to add more employees. Press cancel to finish adding employees.');

    if(!keepGoing) {
      return employeesArray;
    }
  }

}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // TODO: Calculate and display the average salary
  let total = 0;
  for (let i = 0; i < employeesArray.length; i++) {
    total = total + employeesArray[i].salary;
  } 
  console.log(`The average employee salary between our ${employeesArray.length} employee(s) is $${(total/employeesArray.length).toFixed(2)}`)
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // TODO: Select and display a random employee
  let randomEmployee = Math.floor(Math.random(0, employeesArray.length));
  console.log(`Congratulations to ${employeesArray[randomEmployee].firstName} ${employeesArray[randomEmployee].lastName}, our random drawing winner!`);
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency\
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);