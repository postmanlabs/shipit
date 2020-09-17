const COLORS = {
  CYAN: '\x1b[36m%s\x1b[0m',
  GRAY: '\x1b[90m%s\x1b[0m',
  RED: '\x1b[31m%s\x1b[0m',
  YELLOW: '\x1b[33m%s\x1b[0m'
}

module.exports = {
  log: (...args) => {
    console.log.apply(null, [COLORS.GRAY, ...args])
  },

  info: (...args) => {
    console.info.apply(null, [COLORS.CYAN, ...args])
  },

  warn: (...args) => {
    console.warn.apply(null, [COLORS.YELLOW, ...args])
  },

  error: (...args) => {
    console.error.apply(null, [COLORS.RED, ...args])
  }
}
