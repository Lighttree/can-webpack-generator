const Generator = require('yeoman-generator');
const path = require('path');
const chalk = require('chalk');
const yosay = require('yosay');
const validatePackageName = require('validate-npm-package-name');
const dependencies = require('./dependencies');
const utils = require('../../lib/utils');

module.exports = class extends Generator {
    initializing() {
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
        this.log(yosay(`Welcome to the swell ${chalk.red('generator-can-webpack')} generator!`));

        const prompts = [{
            name: 'name',
            message: 'Project name',
            when: !this.pkg.name,
            default: process.cwd().split(path.sep).pop()
        }, {
            name: 'version',
            message: 'Version',
            when: !this.pkg.version,
            default: '0.0.0'
        }, {
            name: 'description',
            message: 'Description',
            when: !this.pkg.description,
            default: 'An awesome CanJS app'
        }, {
            name: 'authorName',
            message: 'Author\'s Name',
            when: !this.pkg.author,
            default: this.user.git.name()
        }, {
            name: 'authorEmail',
            message: 'Author\'s Email',
            when: !this.pkg.author,
            default: this.user.git.email()
        }, {
            name: 'keywords',
            message: 'Application keywords',
            when: !this.pkg.keywords,
            default: `${process.cwd().split(path.sep).pop()}, javascript, canjs, node, sass, jest`
        }, {
            name: 'repository',
            message: 'Repository',
            when: !this.pkg.repository,
            default: utils.getRepoUrl()
        }];

        return this.prompt(prompts).then((props) => {
            const nameValidationResults = validatePackageName(props.name);
            const isValidName = nameValidationResults.validForNewPackages;

            if (!isValidName) {
                Error(`Your project name ${props.name} is not valid. Please try another name. Reason ${nameValidationResults.errors[0]}`);
            }

            // To access props later use this.props.someAnswer;
            Object.assign(this.props, props);
        });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(),
            this.props
        );

        this.fs.copy(
            this.templatePath('./.*'),
            this.destinationRoot()
        );

        // Adds list of keywords.
        this.fs.extendJSON(`${this.destinationRoot()}/package.json`, { keywords: utils.getKeywords(this.props.keywords) }, undefined, 4);
    }

    install() {
        if (!this.options.skipInstall) {
            this.npmInstall(dependencies.dependencies);
            this.npmInstall(dependencies.devDependencies, { 'save-dev': true });
        }
    }

    end() {
        this.log(yosay(chalk.red('Done !')));
    }
};
