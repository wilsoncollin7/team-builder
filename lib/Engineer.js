//engineer class that creates the engineer object if the engineer role is selected

const Employee = require("./Employee");
const inquirer = require("inquirer");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        const role = "Engineer";
        return role;
    }

    // the questions that is asked based on the input role
    async roleBasedQuestions() {
        const question = {
            type: "input",
            name: "github",
            message: "What is the Engineers GitHud username?",
            validate: (value) => {
                if (value === "" || value === null) {
                    return "Username email cannot be empty."
                } else {
                    return true;
                }
            }
        };
        const inquire = await inquirer.prompt(question);
        this.github = inquire.github
    }
}

module.exports = Engineer;