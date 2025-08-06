import chalk from 'chalk'
import { Plugin } from 'graphql-yoga'

export const loggingPlugin: Plugin = {
  onExecute ({ args }) {
    const start = Date.now()
    return {
      onExecuteDone ({ result }) {
        const operationName = args.operationName || 'Unnamed Query'

        if ((result as any).errors) {
          console.error(chalk.red(`❌ Query: ${operationName}, Errors: ${(result as any).errors.map((error: any) => error.message).join(', ')}`))
          return
        }

        const duration = Date.now() - start

        console.log(chalk.blue(`⏱️  Query: ${operationName}, Duration: ${duration}ms`))
      }
    }
  }
}
