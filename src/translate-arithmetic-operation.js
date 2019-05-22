const ARITHMETIC_OPERATION_ADD = "add";
const ARITHMETIC_OPERATION_AND = "and";
const ARITHMETIC_OPERATION_EQUIVALENT = "eq";
const ARITHMETIC_OPERATION_GREATER_THAN = "gt";
const ARITHMETIC_OPERATION_LESS_THAN = "lt";
const ARITHMETIC_OPERATION_NEGATE = "neg";
const ARITHMETIC_OPERATION_NOT = "not";
const ARITHMETIC_OPERATION_OR = "or";
const ARITHMETIC_OPERATION_SUBTRACT = "sub";

const RAM_STACK_PTR = "R0";

const uuidv4 = require("uuid/v4");

function main(asmCode, operation) {
  const uuid = uuidv4();

  switch (operation) {
    case ARITHMETIC_OPERATION_ADD:
      asmCode = asmCode.concat([
        `@${RAM_STACK_PTR}
M=M-1;
A=M;
D=M;

A=A-1;
M=M+D;`
      ]);

      break;
    case ARITHMETIC_OPERATION_AND:
      asmCode = asmCode.concat([
        `@${RAM_STACK_PTR}
M=M-1;
A=M;
D=M;

A=A-1;
M=M&D;`
      ]);

      break;
    case ARITHMETIC_OPERATION_EQUIVALENT:
      asmCode = asmCode.concat([
        `@${RAM_STACK_PTR}
M=M-1;
A=M;
D=M;

A=A-1;
D=M-D;

@EQ_SET_TO_TRUE_${uuid}
D;JEQ

(EQ_SET_TO_FALSE_${uuid})
@${RAM_STACK_PTR}
A=M-1;
M=0;
@EQ_END_${uuid}
0;JMP

(EQ_SET_TO_TRUE_${uuid})
@${RAM_STACK_PTR}
A=M-1;
M=-1;
@EQ_END_${uuid}
0;JMP

(EQ_END_${uuid})`
      ]);

      break;
    case ARITHMETIC_OPERATION_GREATER_THAN:
      asmCode = asmCode.concat([
        `@${RAM_STACK_PTR}
M=M-1;
A=M;
D=M;

A=A-1;
D=M-D;

@EQ_SET_TO_TRUE_${uuid}
D;JGT

(EQ_SET_TO_FALSE_${uuid})
@${RAM_STACK_PTR}
A=M-1;
M=0;
@EQ_END_${uuid}
0;JMP

(EQ_SET_TO_TRUE_${uuid})
@${RAM_STACK_PTR}
A=M-1;
M=-1;
@EQ_END_${uuid}
0;JMP

(EQ_END_${uuid})`
      ]);

      break;
    case ARITHMETIC_OPERATION_LESS_THAN:
      asmCode = asmCode.concat([
        `@${RAM_STACK_PTR}
M=M-1;
A=M;
D=M;

A=A-1;
D=M-D;

@EQ_SET_TO_TRUE_${uuid}
D;JLT

(EQ_SET_TO_FALSE_${uuid})
@${RAM_STACK_PTR}
A=M-1;
M=0;
@EQ_END_${uuid}
0;JMP

(EQ_SET_TO_TRUE_${uuid})
@${RAM_STACK_PTR}
A=M-1;
M=-1;
@EQ_END_${uuid}
0;JMP

(EQ_END_${uuid})`
      ]);

      break;
    case ARITHMETIC_OPERATION_NEGATE:
      asmCode = asmCode.concat([
        `@${RAM_STACK_PTR}
A=M-1;
M=-M;`
      ]);

      break;
    case ARITHMETIC_OPERATION_NOT:
      asmCode = asmCode.concat([
        `@${RAM_STACK_PTR}
A=M-1;
M=!M;`
      ]);

      break;
    case ARITHMETIC_OPERATION_OR:
      asmCode = asmCode.concat([
        `@${RAM_STACK_PTR}
M=M-1;
A=M;
D=M;

A=A-1;
M=M|D;`
      ]);

      break;
    case ARITHMETIC_OPERATION_SUBTRACT:
      asmCode = asmCode.concat([
        `@${RAM_STACK_PTR}
M=M-1;
A=M;
D=M;

A=A-1;
M=M-D;`
      ]);

      break;
    default:
      console.error("Asm code successfully created so far:", asmCode);
      throw new Error(`Invalid arithmetic operation: ${operation}.`);
  }

  return asmCode.concat([""]);
}

module.exports = main;
