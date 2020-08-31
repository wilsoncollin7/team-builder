const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// empty array waiting for the team to be pushed
const team = [];

// the questions for the user
const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
        validate: (value) => {
            if (value === "" || value === null) {
                return "Employee name cannot be empty."
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's ID nubmer?",
        validate: (value) => {
            if (value === "" || value === null) {
                return "Employee ID cannot be empty."
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is the Employee's email?",
        validate: (value) => {
            if (value === "" || value === null) {
                return "Employee email cannot be empty."
            } else {
                return true;
            }
        }
    },
    {
        type: "list",
        name: "role",
        message: "What is the Employee's role?",
        choices: ["manager", "engineer", "intern"]
    }
];

// the function the filters the employee based on the role, sent to classes
employeeFunc = (name, id, email, role) => {
    if(role === "manager") {
        return new Manager(name, id, email, "");
    } else if (role === "engineer") {
        return new Engineer(name, id, email, "");
    } else {
        return new Intern(name, id, email, "");
    }
};

// write to file function that creates the file
writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, (err) => {
        console.log(err);
    })
    console.log("Team made successfully!")
}

// the main team making function that askes the questions and then pushes the output to the team array
makeTeam = async() => {
    let addEmployee = true
    console.log("Team builder running! Answer following questions:");
    while(addEmployee){
        await inquirer.prompt(employeeQuestions).then(async answers => {
            let employee = employeeFunc(answers.name, answers.id, answers.email, answers.role);
            await employee.roleBasedQuestions();
            team.push(employee);
        });

        await inquirer.prompt(
            {
                type: "confirm",
                name: "addEmployee",
                message: "Would you like to add another employee?"
            }
        ).then(answers => {
            addEmployee = answers.addEmployee;
        });
    }

    const output = render(team);
    writeToFile(outputPath, output);
}

//initiate the main function of the app
makeTeam();

