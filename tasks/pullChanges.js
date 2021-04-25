async function updateBranch (exec, targetBranch) {
  await exec(`git fetch origin ${targetBranch}`)
  await exec(`git checkout ${targetBranch}`)
  await exec(`git pull origin ${targetBranch} --rebase=false`)
}

module.exports = async function pullChanges (exec, console, { preReleaseSuffix, mainBranch }) {
  if (preReleaseSuffix) { return }

  console.warn('Making sure that branch is up to date...')

  await updateBranch(exec, mainBranch)
  await updateBranch(exec, 'develop')
}
