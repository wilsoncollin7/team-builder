//manager class that creates the manager object if the manager role is selected

const Employee = require("./Employee");
const inquirer = require("inquirer");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email)
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber
    }

    getRole() {
        const role = "Manager";
        return role;
    }

    // the questions that is asked based on the input role
    async roleBasedQuestions() {
        const question = {
            type: "input",
            name: "officeNumber",
            message: "What is the Managers office number?",
            validate: (value) => {
                if (value === "" || value === null) {
                    return "Office number cannot be empty."
                } else {
                    return true;
                }
            }
        };
        const inquire = await inquirer.prompt(question);
        this.officeNumber = inquire.officeNumber
    }
}

module.exports = Manager;