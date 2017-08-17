## Cloud CLI [![Build Status](https://travis-ci.org/cklwblove/cloud-cli.svg?branch=master)](https://travis-ci.org/cklwblove/cloud-cli)

A simple CLI for scaffolding Cloud Broker front-end project.

This CLI based on the [vue-cli](https://github.com/vuejs/vue-cli/).

### Installation

Prerequisites: [Node.js](https://nodejs.org/en/) (>=4.x, 6.x preferred) and [Git](https://git-scm.com/).

``` bash
$ npm install -g cloud-cli
```

### Usage

``` bash
$ cloud init <template-name> <project-name>
```

Example:

``` bash
$ cloud init vue-template my-project

$ cloud init ng-template my-project

$ cloud init jQuery-template my-project
```

The above command pulls the template from [cloud-templates](https://github.com/cloud-templates), prompts for some information, and generates the project at `./my-project/`.

### Templates

 All official project templates are repos in the [cloud-templates organization](https://github.com/cloud-templates). When a new template is added to the organization, you will be able to run `cloud init <template-name> <project-name>` to use that template. You can also run `cloud list` to see all available official templates.
 
 Current available templates include:
 
 - [vue-template](https://github.com/cloud-templates/vue-template) - For the mobile terminal project.
 
 - [ng-template](https://github.com/cloud-templates/ng-template) - For the pc terminal project.
 
  - [jQuery-template](https://github.com/cloud-templates/jQuery-template) - For the pc terminal project.This is a multipage seed for web application built by jQuery,bootstrap and webpack.

 
### License

[MIT](http://opensource.org/licenses/MIT)
