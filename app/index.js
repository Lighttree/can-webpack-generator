const Generator = require('yeoman-generator');
const path = require('path');
const validatePackageName = require('validate-npm-package-name');
const dependencies = require('./dependencies');

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
            name: 'authorName',
            message: 'Author\'s Name',
            when: !this.pkg.author,
            default: this.git ? this.git.name() : ''
        }, {
            name: 'authorEmail',
            message: 'Author\'s Email',
            when: !this.pkg.author,
            default: this.git ? this.git.email() : ''
        }, {
            name: 'keywords',
            message: 'Application keywords',
            when: !this.pkg.keywords
        }, {
            name: 'repository',
            message: 'Repository',
            when: !this.pkg.repository,
            default: `git@git1.corp.globoforce.com:${process.cwd().split(path.sep).pop()}.git`
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
            this.templatePath('./.*'),
            this.destinationRoot()
        );
    }

    // install() {
    //     this.npmInstall(dependencies.dependencies);
    //     this.npmInstall(dependencies.devDependencies, {'save-dev': true });
    // }

    end() {
        console.log('Done !');
    }
};
