module.exports = async function validateDependencies (exec, console, { dependencyList = [] }) {
  if (!dependencyList.length) { return }

  console.warn('Making sure that dependencies are updated...')

  const { dependencies, devDependencies } = require(`${process.cwd()}/package.json`)
  const installedDependencies = { ...devDependencies, ...dependencies }

  for (const dependency of dependencyList) {
    if (!(dependency in installedDependencies)) {
      throw new Error(`Dependency "${dependency}" is not installed.`)
    }

    const latestVersion = (await exec(`npm show ${dependency} version`)).trim()
    const installedVersion = installedDependencies[dependency]

    if (latestVersion !== installedVersion) {
      throw new Error(`Expected "${dependency}" to be v${latestVersion} but found v${installedVersion}.`)
    }
  }
}
