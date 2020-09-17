module.exports = async function cleanDirectory (exec, console) {
  console.warn('Making sure that working directory is clean...')

  if (await exec('git status --porcelain') !== '') {
    throw new Error('Git working directory not clean.')
  }
}
