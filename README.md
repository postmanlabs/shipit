# 🚢 JUST SHIP IT!
Automate versioning and changelog generation using GitFlow.

## Usage
```js
const shipit = require('@postman/shipit')

shipit({
  mainBranch: 'main',
  pushToOrigin: false,
  preReleaseSuffix: 'beta',
  dependencyList: ['postman-collection']
}).then((version) => {
  console.info('🚀', version)
}).catch((err) => {
  console.error('🔥', err)
})
```
