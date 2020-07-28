// ===
// === BASE
// ===

export enum InterfaceDefinitionPropertyType {
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    any = 'any',
    date = 'Date'
}

export interface InterfaceDefinitionProperty {
    name: string
    type: InterfaceDefinitionPropertyType
}

export interface InterfaceDefinition {
    name: string
    properties: InterfaceDefinitionProperty[]
}

// ===
// === ADAPTER
// ===

export interface AdapterConfig {
    requiredVariables: string[]
}

interface GetInterfaceDefinitions {
    (config: any): Promise<InterfaceDefinition[]>
}

interface GetInterfaceDefinition {
    (resource: string, config: any): Promise<InterfaceDefinition>
}

export interface Adapter {
    getInterfaceDefinitions: GetInterfaceDefinitions
    getInterfaceDefinition: GetInterfaceDefinition
}

// ===
// === GENERATORS
// ===

interface ProcessInterfaceDefinitions {
    (interfaceDefinitions: InterfaceDefinition[]): Promise<any>
}

export interface CodeGenerator {
    processInterfaceDefinitions: ProcessInterfaceDefinitions
}