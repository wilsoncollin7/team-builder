//intern class that creates the intern object if the intern role is selected

const Employee = require("./Employee");
const inquirer = require("inquirer");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        const role = "Intern";
        return role;
    }

    // the questions that is asked based on the input role
    async roleBasedQuestions() {
        const question = {
            type: "input",
            name: "school",
            message: "What is the Interns School?",
            validate: (value) => {
                if (value === "" || value === null) {
                    return "School email cannot be empty."
                } else {
                    return true;
                }
            }
        };
        const inquire = await inquirer.prompt(question);
        this.school = inquire.school
    }
}

module.exports = Intern;