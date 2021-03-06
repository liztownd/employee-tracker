const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
//const EmployeeByManager = require('byManager');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'lizmysql2021',
    database: 'employeeDB',
});

const init = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do today?',
            choices: ['View All Employees', 'View All Employees by Department', 'View All Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'Exit'],
            name: 'activity'
        }
    ).then(res => {
        switch (res.activity) {
            case 'View All Employees':
                viewAll();
                break;
            case 'View All Employees by Department':
                viewDept();
                break;
            // BONUS
            case 'View All Employees by Manager':
                viewMan();
                break;
            case 'Add Employee':
                addEmp();
                break;
            // BONUS
            case 'Remove Employee':
                remEmp();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            // BONUS
            case 'Update Employee Manager':
                updateMan();
                break;
            case 'View All Roles':
                viewRole();
                break;
            default:
                process.exit();
        }
    })
};

const viewAll = () => {
    // JOIN all 3 ugh
    //  connection.query('SELECT * FROM ')
    // SUB QUERY INSIDE THE QUERY?
    console.log("I'm sorry, this function is not available. Please try again.");
    init();
};


const viewDept = () => {
    // JOIN departments & employees
    // connection.query('SELECT ')
    console.log("I'm sorry, this function is not available. Please try again.");
    init();

}

// BONUS
const viewMan = () => {

    console.log("I'm sorry, that function is not available. Please choose something else.");
    init();

    //     connection.query('SELECT * FROM employee', (err, res) => {
    //         if (err) throw err;

    //         console.log(res);

    //         if (res.manager_id != null) {
    //             for (let i=0; i<res.length; i++) {
    //                 if (res.manager_id === id){
    //                     return `${res.first_name} ${res.last_name}`
    //                 }
    //             }
    //         }
    //        //  const employee = new EmployeeByManager 

    //     })
}

const addEmp = () => {

    let manList = ['none'];
    let roleList = ['other'];

    connection.query('SELECT * FROM employee', (err, empRes) => {
        if (err) throw err;
        // if (empRes.manager_id != null) {
        for (let i = 0; i < empRes.length; i++) {
            if (empRes[i].id === empRes.manager_id) {
                manList.unshift(`${empRes[i].last_name}`);

            }
        }
        //  }


        connection.query('SELECT title FROM role', (err, roleRes) => {
            if (err) throw err;
            roleRes.forEach(e => {
                roleList.unshift(e.title);
            });
        })
    })


    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the employee you would like to add?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is the last name of the employee you would like to add?',
            name: 'last_name'
        },
        {
            type: 'list',
            message: 'Which manager would you like to assign to this employee?',
            choices: manList,
            name: 'manager_name'
        },
        {
            type: 'list',
            message: 'What role would you like to assign your employee to?',
            choices: roleList,
            name: 'role_name'
        }

    ]).then(addRes => {
        console.table(addRes);
        init();
    })
}

const remEmp = () => {
   // BONUS
    console.log("I'm sorry, this function is not available. Please try again.");
    init();


}

const updateRole = () => {
    
    console.log("I'm sorry, this function is not available. Please try again.");
    init();

}

const updateMan = () => {
    // BONUS
    console.log("I'm sorry, this function is not available. Please try again.");
    init();

}


const viewRole = () => {

    console.log("I'm sorry, this function is not available. Please try again.");
    init();


}

init();