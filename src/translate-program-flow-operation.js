const { PROGRAM_FLOW_OPERATIONS, RAM_POINTERS } = require("./constants");

function main(asmCode, operation, label, filename) {
  const asmLabel = createAsmLabelName(filename, label);

  switch (operation) {
    case PROGRAM_FLOW_OPERATIONS.GOTO:
      asmCode = asmCode.concat([
        `@${asmLabel}
0;JMP`
      ]);

      break;
    case PROGRAM_FLOW_OPERATIONS.IF_GOTO:
      asmCode = asmCode.concat([
        `@${RAM_POINTERS.STACK}
M=M-1;
A=M;
D=M;
@${asmLabel}
D;JNE`
      ]);

      break;
    case PROGRAM_FLOW_OPERATIONS.LABEL:
      asmCode = asmCode.concat([`(${asmLabel})`]);

      break;
    default:
      console.error("Asm code successfully created so far:", asmCode);
      throw new Error(
        `Invalid program flow operation: ${operation}.`
      );
  }

  return asmCode.concat([""]);
}

function createAsmLabelName(filename, label) {
  return `${filename}$${label}`;
}

module.exports = main;
