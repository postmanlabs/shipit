const VALID_VERSION = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.[0-9]+)?$/

module.exports = async function createRelease (exec, console, { pushToOrigin = false, preReleaseSuffix, mainBranch }) {
  const { releaseVersion } = this

  if (!VALID_VERSION.test(releaseVersion)) {
    throw new Error(`Invalid release version v${releaseVersion}`)
  }

  console.warn(`Creating v${releaseVersion} release...`)

  if (preReleaseSuffix) {
    await exec(`npm version ${releaseVersion}`)
    pushToOrigin && await exec(`git push origin v${releaseVersion}`)
    return
  }

  await exec(`git checkout -b release/${releaseVersion}`)
  await exec(`npm version ${releaseVersion} --no-git-tag-version`)
  await exec('git add CHANGELOG.yaml package.json package-lock.json')
  await exec(`git commit -m "Release v${releaseVersion}"`)

  await exec(`git checkout ${mainBranch} && git merge --no-edit --no-ff release/${releaseVersion}`)
  await exec(`git tag v${releaseVersion} -m "Release v${releaseVersion}"`)
  await exec(`git checkout develop && git merge --no-edit --no-ff release/${releaseVersion}`)

  if (pushToOrigin) {
    await exec(`git checkout ${mainBranch} && git push origin ${mainBranch} --follow-tags`)
    await exec('git checkout develop && git push origin develop')
  }

  await exec(`git branch -d release/${releaseVersion}`)
}
