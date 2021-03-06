import { task, series } from 'gulp'
import * as rimraf from 'rimraf'
import * as webpack from 'webpack'

import config from '../../../config'

const g = require('gulp-load-plugins')()
const { log, PluginError } = g.util

// ----------------------------------------
// Clean
// ----------------------------------------

task('clean:dll', cb => {
  rimraf(config.paths.base('dll'), cb)
})

// ----------------------------------------
// Build
// ----------------------------------------

task('build:dll', cb => {
  const webpackDLLConfig = require('../../webpack.config.dll').default
  const compiler = webpack(webpackDLLConfig)

  compiler.run((err, stats) => {
    const { errors, warnings } = stats.toJson()

    log(stats.toString(config.compiler_stats))

    if (err) {
      log('Webpack compiler encountered a fatal error.')
      throw new PluginError('webpack', err.toString())
    }
    if (errors.length > 0) {
      log('Webpack compiler encountered errors.')
      throw new PluginError('webpack', errors.toString())
    }
    if (warnings.length > 0) {
      throw new PluginError('webpack', warnings.toString())
    }

    cb(err)
  })
})

// ----------------------------------------
// Default
// ----------------------------------------

task('dll', series('clean:dll', 'build:dll'))
