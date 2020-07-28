import { Client } from 'pg'
import { Adapter, InterfaceDefinition, AdapterConfig, InterfaceDefinitionPropertyType } from '../interfaces'

const adapterConfig: AdapterConfig = {
    requiredVariables: [
        'PG_CONNECTION_STRING'
    ]
}

export {adapterConfig}

const typeMap = {
    'integer': InterfaceDefinitionPropertyType.number,
    'uuid': InterfaceDefinitionPropertyType.string,
    'text': InterfaceDefinitionPropertyType.string,
    'boolean': InterfaceDefinitionPropertyType.boolean,
    'json': InterfaceDefinitionPropertyType.any,

    'USER-DEFINED': InterfaceDefinitionPropertyType.any,

    'timestamp with time zone': InterfaceDefinitionPropertyType.date,
    'timestamp': InterfaceDefinitionPropertyType.date
}

const mapPgTypeToInterfaceType = (pgType: string): InterfaceDefinitionPropertyType => {
    return typeMap[pgType]
}

interface TableColumn {
    columnName: string
    dataType: string
}
const getTableColumns = async (tableName: string, client: Client): Promise<TableColumn[]> => {
    const res = await client.query(`select column_name, data_type 
    from information_schema.columns 
    where table_name = '${tableName}';`)

    return res.rows.map(r => {
        return {
            columnName: r.column_name,
            dataType: r.data_type
        }
    })
}

const getTableNames = async (schema: string, client: Client): Promise<string[]> => {
    const res = await client.query(`SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='${schema}'
    AND table_type='BASE TABLE';`)

    return res.rows.map(r => r.table_name)
}

const getClient = async (connectionString: string): Promise<Client> => {
    const client = new Client({
        connectionString: connectionString
    })
    await client.connect()

    return client
}

const adapter: Adapter = {
    async getInterfaceDefinitions (config: any) {
        const definitions: InterfaceDefinition[] = []

        // Create a client
        const client = await getClient(config.PG_CONNECTION_STRING)

        // Get all table names
        const tableNames = await getTableNames(config.PG_SCHEMA, client)
        
        // Get columns for each table


        await client.end()
        return definitions
    },
    async getInterfaceDefinition (resource: string, config: any) {
        // Create a client
        const client = await getClient(config.PG_CONNECTION_STRING)

        const def: InterfaceDefinition = {
            name: resource,
            properties: []
        }

        // Get table columns
        const tableColumns = await getTableColumns(resource, client)

        // Add them to the definition
        for (const tc of tableColumns) {
            def.properties.push({
                name: tc.columnName,
                type: mapPgTypeToInterfaceType(tc.dataType)
            })
        }

        await client.end()
        return def
    }
}

export default adapter