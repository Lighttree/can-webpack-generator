const Generator = require('yeoman-generator');
const path = require('path');
const validatePackageName = require('validate-npm-package-name');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        // Check if root already has existent package.json
        this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

        this.props = {
            name: this.pkg.name,
            description: this.pkg.description,
            version: this.pkg.version,
            repository: this.pkg.repository
        };
    }

    prompting() {
        let done = this.async();

        const prompts = [{
            name: 'name',
            message: 'Project name',
            when: !this.pkg.name,
            default: process.cwd().split(path.sep).pop()
        }, {
            name: 'version',
            message: 'Version',
            when: !this.pkg.version,
            default: '0.1.0'
        }, {
            name: 'description',
            message: 'Description',
            when: !this.pkg.description,
            default: 'An awesome CanJS app'
        }, {
            name: 'keywords',
            message: 'Application keywords',
            when: !this.pkg.keywords
        }, {
            name: 'repository',
            message: 'Repository',
            when: !this.pkg.repository
        }];

        this.prompt(prompts).then((props) => {
            let nameValidationResults;
            let isValidName;

            Object.assign(this.props, props);

            nameValidationResults = validatePackageName(this.props.name);
            isValidName = nameValidationResults.validForNewPackages;

            if (!isValidName) {
                let error = new Error(`Your project name ${this.props.name} is not valid. Please try another name. Reason ${nameValidationResults.errors[0]}`);
                done(error);
                return;
            }

            done();
        });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(),
            this.props
        );

        this.fs.copy(
            this.templatePath('.*'),
            this.destinationPath()
        );
    }
};
