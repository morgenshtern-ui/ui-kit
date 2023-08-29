import { buildRef } from './build-ref'
import { buildSys } from './build-sys'

function run() {
  console.log('Building theme...')
  buildRef()
  buildSys()
}

run()
