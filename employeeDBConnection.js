const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

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
      connection.query(`SELECT  e.id, e.first_name, e.last_name, m.first_name as managers_first_name, m.last_name as managers_last_name, r.title, r.salary, d.dept_name
      FROM employeeDB.employee as e
      LEFT JOIN employeeDB.employee as m
      ON e.manager_id = m.id
      JOIN role as r
      ON e.role_id = r.id
      JOIN department as d ON r.department_id = d.id`, (err, allRes) => {
        if (err) throw err;
        console.table(allRes)
        init();


      })

};


const viewDept = () => {
    connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.dept_name FROM employee as e
    LEFT JOIN role as r
    ON e.role_id = r.id
    JOIN department as d ON r.department_id = d.id`, (err, deptRes) => {
        if (err) throw err;
        console.table(deptRes);
        init();

    })


}

// BONUS
const viewMan = () => {

    console.log("I'm sorry, that function is not available. Please choose something else.");
    init();

}

const addEmp = () => {
    
    let empArray = [];
    let roleArray = [];

    let manList = ['none'];
    let roleList = ['other'];

    connection.query(`SELECT id, last_name
    FROM employeeDB.employee
    WHERE manager_id IS NULL`, (err, empRes) => {
        if (err) throw err;
        empRes.forEach(e => {
            manList.unshift(e.last_name);
            empArray.push(e);
        })
       
         })


        connection.query('SELECT id, title FROM role', (err, roleRes) => {
            if (err) throw err;
            roleRes.forEach(e => {
                roleList.unshift(e.title);
                roleArray.push(e);

            });
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
        let manObj = empArray.find(emp => addRes.manager_name === emp.last_name);
        let roleObj = roleArray.find(role => addRes.role_name === role.title)

        connection.query(`INSERT INTO employee
        SET ?`, 
        {
            first_name: addRes.first_name,
            last_name: addRes.last_name,
            role_id: roleObj.id,
            manager_id: manObj.id
        }, (err => {
            if (err) throw err;
            console.log('Employee added successfully.')
            init();

        }))

    })
}

const remEmp = () => {
   // BONUS
    console.log("I'm sorry, this function is not available. Please try again.");
    init();


}


 const updateRole = () => {
    
    let empObjArray = [];
    let roleObjArray = [];
    let empArray = [];
    let roleArray = [];
    let empUpdateObj = {};

     connection.query('SELECT id, first_name, last_name, role_id FROM employee', (err, res) => {
        if(err) throw err;

        res.forEach(e => {
            empObjArray.push(e);
            empArray.push(`${e.last_name}`)
        })

        
        connection.query('SELECT id, title FROM role', (err, roleRes) => {
            if (err) throw err;
    
            roleRes.forEach(e => {
                roleObjArray.push(e);
                roleArray.push(`${e.title}`)
            })

            inquirer.prompt(
                {
                    type: 'list',
                    message: 'What employee would you like to update?',
                    choices: empArray,
                    name: 'employee'
                }
            ).then(empUpdateRes => {
                empUpdateObj = empUpdateRes;
                     inquirer.prompt(
                         {
                             type: 'list',
                             message: 'What role would you like to assign this employee?',
                             choices: roleArray,
                             name: 'new_role'
                         }
                     )
                     .then(newRoleRes => {
                        console.log('b4 loop', newRoleRes, empUpdateObj)
                        for (let i=0; i<roleObjArray.length; i++){
                            if (roleObjArray[i].title === newRoleRes.new_role){
                                for (let j=0; j<empObjArray.length; j++){
                                    if (empObjArray[j].last_name === empUpdateObj.employee){
                                        connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleObjArray[i].id, empObjArray[j].id], (err, updateRes) => {
                                            if (err) throw err;
                                            console.log('New employee role updated successfully!')
                                            init();
                                        })
                
                                    }
                                }
                            }
                        }
                    })

            })
            
        })//2nd query

    })//1st query

}

const updateMan = () => {
    // BONUS
    console.log("I'm sorry, this function is not available. Please try again.");
    init();

}


const viewRole = () => {
    connection.query(`SELECT e.id, e.first_name, e.last_name, e.role_id, r.id, r.title FROM employee as e
    LEFT JOIN role as r
    ON e.role_id = r.id`, (err, roleRes) => {
        if (err) throw err;
        console.table(roleRes);
        init();

    })

}

init();