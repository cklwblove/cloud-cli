#!/usr/bin/env node

var download = require('download-git-repo')
var program = require('commander')
var exists = require('fs').existsSync
var path = require('path')
var ora = require('ora')
var home = require('user-home')
var tildify = require('tildify')
var chalk = require('chalk')
var inquirer = require('inquirer')
var logger = require('../lib/logger')
var generate = require('../lib/generate')
var checkVersion = require('../lib/check-version')
var warnings = require('../lib/warnings')

/**
 * Usage.
 */

program
  .usage('<template-name> [project-name]')
  .option('-c, --clone', 'use git clone')
  .option('--offline', 'use cached template')

/**
 * Help.
 */

program.on('--help', function () {
  console.log('  Examples:')
  console.log()
  console.log(chalk.gray('    # create a new project with a vue template. for the mobile terminal project'))
  console.log('    $ cloud init vue-template my-project')
  console.log()
  console.log(chalk.gray('    #create a new project with an angular template. for the pc terminal project'))
  console.log('    $ cloud init ng-template my-project')
  console.log()
  console.log(chalk.gray('    #create a new project with a jQuery template. for the pc terminal project'))
  console.log('    $ cloud init jQuery-template my-project')
  console.log()
  console.log(chalk.gray('    #create a new plugin with vuejs.'))
  console.log('    $ cloud init vue-plugin-template vue-plugin-demo')
  console.log()
})

/**
 * Help.
 */

function help () {
  program.parse(process.argv)
  if (program.args.length < 1) return program.help()
}
help()

/**
 * Settings.
 */

var template = program.args[0]
var hasSlash = template.indexOf('/') > -1
var rawName = program.args[1]
var inPlace = !rawName || rawName === '.'
var name = inPlace ? path.relative('../', process.cwd()) : rawName
var to = path.resolve(rawName || '.')
var clone = program.clone || false

var tmp = path.join(home, '.cloud-templates', template.replace(/\//g, '-'))
if (program.offline) {
  console.log(`> Use cached template at ${chalk.yellow(tildify(tmp))}`)
  template = tmp
}

/**
 * Padding.
 */

console.log()
process.on('exit', function () {
  console.log()
})

if (exists(to)) {
  inquirer.prompt([{
    type: 'confirm',
    message: inPlace
      ? 'Generate project in current directory?'
      : 'Target directory exists. Continue?',
    name: 'ok'
  }], function (answers) {
    if (answers.ok) {
      run()
    }
  })
} else {
  run()
}

/**
 * Check, download and generate the project.
 */

function run () {
  // check if template is local
  if (/^[./]|(\w:)/.test(template)) {
    var templatePath = template.charAt(0) === '/' || /^\w:/.test(template)
      ? template
      : path.normalize(path.join(process.cwd(), template))
    if (exists(templatePath)) {
      generate(name, templatePath, to, function (err) {
        if (err) logger.fatal(err)
        console.log()
        logger.success('Generated "%s".', name)
      })
    } else {
      logger.fatal('Local template "%s" not found.', template)
    }
  } else {
    checkVersion(function () {
      if (!hasSlash) {
        // use official templates
        var officialTemplate = 'cloud-templates/' + template
        downloadAndGenerate(officialTemplate)
      } else {
        downloadAndGenerate(template)
      }
    })
  }
}

/**
 * Download a generate from a template repo.
 *
 * @param {String} template
 */

function downloadAndGenerate (template) {
  var spinner = ora('downloading template')
  spinner.start()
  download(template, tmp, { clone: clone }, function (err) {
    spinner.stop()
    if (err) logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim())
    generate(name, tmp, to, function (err) {
      if (err) logger.fatal(err)
      console.log()
      logger.success('Generated "%s".', name)
    })
  })
}
