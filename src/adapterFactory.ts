import { Adapter } from "./interfaces";

import pqsql from './adapters/pgsql'

export default function (): Adapter {
    return pqsql
}