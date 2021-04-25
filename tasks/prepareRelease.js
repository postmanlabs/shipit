const yankee = require('@postman/yankee')

module.exports = async function prepareRelease (exec, console, { preReleaseSuffix }) {
  console.warn('Preparing for release...')

  const { name } = require(`${process.cwd()}/package.json`)
  const { newVersion } = yankee()

  if (!preReleaseSuffix) {
    this.releaseVersion = newVersion
    await exec('git branch --show-current')
    console.warn(`Updated changelog for v${newVersion}...`)
    return
  }

  console.warn(`Reverting changelog update for "${preReleaseSuffix}" release...`)
  await exec('git reset --hard')

  const lastPreRelease = (await exec(`npm show ${name}@${preReleaseSuffix} version`)).trim()
  const [prevVersion, preCount = 0] = lastPreRelease.split(`-${preReleaseSuffix}.`)

  this.releaseVersion = prevVersion === newVersion
    ? `${newVersion}-${preReleaseSuffix}.${parseInt(preCount) + 1}`
    : `${newVersion}-${preReleaseSuffix}.1`
}
