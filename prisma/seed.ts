import { lstatSync, readdirSync } from 'fs'
import { resolve } from 'path'

import checkbox from '@inquirer/checkbox'

// eslint-disable-next-line @typescript-eslint/no-shadow
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function main () {
  const seeds = readdirSync(resolve('./prisma/seeds')).filter(file =>
    lstatSync(resolve('./prisma/seeds', file)).isDirectory()
  )

  const answer = await checkbox({
    message: 'Select a package manager',
    choices: seeds.map(seed => ({
      name: seed,
      value: seed
    }))
  })

  for (const seed of answer) {
    console.log(`Seeding ${seed}`)

    const seedPath = resolve('./prisma/seeds', seed, 'index.ts')
    const module = await import(seedPath)
    const fn = module.default
    await fn()
    await sleep(1000)

    console.log(`Seeded ${seed}`)
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
