import { InterfaceDefinition } from "../interfaces";

export function generateInterfaceCode (interfaceDefinition: InterfaceDefinition): string {
    const ret = []

    ret.push(`interface ${interfaceDefinition.name} {`)
    interfaceDefinition.properties.map(p => {
        ret.push(`\t${p.name}: ${p.type}`)
    })
    
    ret.push(`}`)

    return ret.join('\n')
}