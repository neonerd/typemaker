import { Command } from 'commander'

import adapterFactory from "./src/adapterFactory";
import generatorFactory from "./src/generatorFactory";

async function generate (source: string, resources: string[]) {
    const adapter = adapterFactory()
    const generator = generatorFactory()

    const config = {
        PG_CONNECTION_STRING: source,
        PG_SCHEMA: 'kkd_public'
    }

    const definitions = []

    for (const r of resources) {
        const id = await adapter.getInterfaceDefinition(r, config)
        definitions.push(id)
    }    
    
    generator.processInterfaceDefinitions(definitions)
}

const program = new Command()

program
    .command('generate <source> [resources...]')
    .action((source, resources) => {
        generate(source, resources)
    })

program.parse(process.argv)