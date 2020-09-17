const _exec = require('child_process').exec
const console = require('./logger')

const exec = (command) => {
  console.info('❯ ' + command)
  return new Promise((resolve, reject) => {
    const process = _exec(command, (err, stdout) => {
      if (err) {
        return reject(err)
      }

      resolve(stdout)
    })

    process.stdout.on('data', console.log)
    process.stderr.on('data', console.error)
  })
}

const pullChanges = require('./tasks/pullChanges').bind(this, exec, console)
const createRelease = require('./tasks/createRelease').bind(this, exec, console)
const prepareRelease = require('./tasks/prepareRelease').bind(this, exec, console)
const cleanDirectory = require('./tasks/cleanDirectory').bind(this, exec, console)
const validateDependencies = require('./tasks/validateDependencies').bind(this, exec, console)

module.exports = async (options = {}) => {
  if (options.preReleaseSuffix) {
    options.preReleaseSuffix = options.preReleaseSuffix.toLowerCase()
  }

  await cleanDirectory(options)
  await pullChanges(options)
  await validateDependencies(options)
  await prepareRelease(options)
  await createRelease(options)

  console.info('🚢 SHIP IT!')
  return this.releaseVersion
}
