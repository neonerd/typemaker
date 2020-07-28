import { CodeGenerator } from "./interfaces";

import consoleGenerator from './generators/consoleGenerator'

export default function (): CodeGenerator {
    return consoleGenerator
}