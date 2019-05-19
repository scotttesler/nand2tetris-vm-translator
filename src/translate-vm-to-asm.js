const STACK_OPERATION_POP = "pop";
const STACK_OPERATION_PUSH = "push";

const translateArithmeticOperation = require("./translate-arithmetic-operation");
const translateStackPop = require("./translate-stack-pop");
const translateStackPush = require("./translate-stack-push");

function main(vmCode = [], filenameWithoutExtension = "") {
  let asmCode = [];
  let line;

  for (let iVmCode = 0; iVmCode < vmCode.length; iVmCode++) {
    line = vmCode[iVmCode].split(" ");
    const [operation, memorySegment, num] = line;

    asmCode.push(`// ${line.join(" ")}`);

    if (line.length === 1) {
      asmCode = translateArithmeticOperation(asmCode, operation);
    } else if (line.length === 3) {
      asmCode = translateStackOperation(
        asmCode,
        operation,
        memorySegment,
        num,
        filenameWithoutExtension
      );
    }
  }

  asmCode = asmCode.concat([
    `(END)
@END
0;JMP
`
  ]);

  return asmCode;
}

function translateStackOperation(
  asmCode,
  operation,
  memorySegment,
  num,
  filenameWithoutExtension
) {
  switch (operation) {
    case STACK_OPERATION_POP:
      asmCode = translateStackPop(
        asmCode,
        memorySegment,
        num,
        filenameWithoutExtension
      );

      break;
    case STACK_OPERATION_PUSH:
      asmCode = translateStackPush(
        asmCode,
        memorySegment,
        num,
        filenameWithoutExtension
      );

      break;
    default:
      console.error("Asm code successfully created so far:", asmCode);
      throw new Error(`Invalid stack operation: ${operation}.`);
  }

  return asmCode;
}

module.exports = main;
