import { CodeGenerator } from "../interfaces";
import { generateInterfaceCode } from "./base";

const generator: CodeGenerator = {
    processInterfaceDefinitions: async (interfaceDefinitions) => {
        const ret: string[] = []

        interfaceDefinitions.map(id => {
            ret.push(generateInterfaceCode(id))
        })

        console.log('Typemaker Console Generator\n--------\n')
        console.log(ret.join('\n\n'))
    }
}

export default generator