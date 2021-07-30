const {
  ARITHMETIC_OPERATIONS,
  ASM,
  FUNCTION_OPERATIONS,
  PROGRAM_FLOW_OPERATIONS,
  STACK_OPERATIONS,
} = require("./constants");

const _forEach = require("lodash/forEach");
const _values = require("lodash/values");
const translateArithmeticOperation = require("./translate-arithmetic-operation");
const translateFunctionOperation = require("./translate-function-operation");
const translateProgramFlowOperation = require("./translate-program-flow-operation");
const translateStackOperation = require("./translate-stack-operation");

function main(vmCodeArr, filename) {
  const arithmeticOperations = new Set(_values(ARITHMETIC_OPERATIONS));
  const functionOperations = new Set(_values(FUNCTION_OPERATIONS));
  const programFlowOperations = new Set(_values(PROGRAM_FLOW_OPERATIONS));
  const stackOperations = new Set(_values(STACK_OPERATIONS));
  let asmCode = [];
  let lineParts;
  let operation;

  _forEach(vmCodeArr, (line) => {
    lineParts = line.split(" ");
    operation = lineParts[0];

    asmCode = asmCode.concat([`// ${line}`, ""]);

    if (arithmeticOperations.has(operation)) {
      asmCode = translateArithmeticOperation(asmCode, operation);
    } else if (functionOperations.has(operation)) {
      asmCode = translateFunctionOperation(
        asmCode,
        operation,
        lineParts[1],
        lineParts[2],
        filename
      );
    } else if (stackOperations.has(operation)) {
      asmCode = translateStackOperation(
        asmCode,
        operation,
        lineParts[1],
        lineParts[2],
        filename
      );
    } else if (programFlowOperations.has(operation)) {
      asmCode = translateProgramFlowOperation(
        asmCode,
        operation,
        lineParts[1],
        filename
      );
    } else {
      console.error("Asm code successfully created so far:", asmCode);
      throw new Error(`Invalid operation: ${operation}.`);
    }
  });

  return asmCode.concat([ASM.END]);
}

module.exports = main;
