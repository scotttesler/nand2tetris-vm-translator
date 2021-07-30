const { ARITHMETIC_OPERATIONS, RAM_POINTERS } = require("./constants");

const uuidv4 = require("uuid/v4");

function main(asmCode, operation) {
  const uuid = uuidv4();

  switch (operation) {
    case ARITHMETIC_OPERATIONS.ADD:
      asmCode = asmCode.concat([
        `@${RAM_POINTERS.STACK}
M=M-1;
A=M;
D=M;

A=A-1;
M=M+D;`,
      ]);

      break;
    case ARITHMETIC_OPERATIONS.AND:
      asmCode = asmCode.concat([
        `@${RAM_POINTERS.STACK}
M=M-1;
A=M;
D=M;

A=A-1;
M=M&D;`,
      ]);

      break;
    case ARITHMETIC_OPERATIONS.EQUIVALENT:
      asmCode = asmCode.concat([
        `@${RAM_POINTERS.STACK}
M=M-1;
A=M;
D=M;

A=A-1;
D=M-D;

@EQ_SET_TO_TRUE_${uuid}
D;JEQ

(EQ_SET_TO_FALSE_${uuid})
@${RAM_POINTERS.STACK}
A=M-1;
M=0;
@EQ_END_${uuid}
0;JMP

(EQ_SET_TO_TRUE_${uuid})
@${RAM_POINTERS.STACK}
A=M-1;
M=-1;
@EQ_END_${uuid}
0;JMP

(EQ_END_${uuid})`,
      ]);

      break;
    case ARITHMETIC_OPERATIONS.GREATER_THAN:
      asmCode = asmCode.concat([
        `@${RAM_POINTERS.STACK}
M=M-1;
A=M;
D=M;

A=A-1;
D=M-D;

@EQ_SET_TO_TRUE_${uuid}
D;JGT

(EQ_SET_TO_FALSE_${uuid})
@${RAM_POINTERS.STACK}
A=M-1;
M=0;
@EQ_END_${uuid}
0;JMP

(EQ_SET_TO_TRUE_${uuid})
@${RAM_POINTERS.STACK}
A=M-1;
M=-1;
@EQ_END_${uuid}
0;JMP

(EQ_END_${uuid})`,
      ]);

      break;
    case ARITHMETIC_OPERATIONS.LESS_THAN:
      asmCode = asmCode.concat([
        `@${RAM_POINTERS.STACK}
M=M-1;
A=M;
D=M;

A=A-1;
D=M-D;

@EQ_SET_TO_TRUE_${uuid}
D;JLT

(EQ_SET_TO_FALSE_${uuid})
@${RAM_POINTERS.STACK}
A=M-1;
M=0;
@EQ_END_${uuid}
0;JMP

(EQ_SET_TO_TRUE_${uuid})
@${RAM_POINTERS.STACK}
A=M-1;
M=-1;
@EQ_END_${uuid}
0;JMP

(EQ_END_${uuid})`,
      ]);

      break;
    case ARITHMETIC_OPERATIONS.NEGATE:
      asmCode = asmCode.concat([
        `@${RAM_POINTERS.STACK}
A=M-1;
M=-M;`,
      ]);

      break;
    case ARITHMETIC_OPERATIONS.NOT:
      asmCode = asmCode.concat([
        `@${RAM_POINTERS.STACK}
A=M-1;
M=!M;`,
      ]);

      break;
    case ARITHMETIC_OPERATIONS.OR:
      asmCode = asmCode.concat([
        `@${RAM_POINTERS.STACK}
M=M-1;
A=M;
D=M;

A=A-1;
M=M|D;`,
      ]);

      break;
    case ARITHMETIC_OPERATIONS.SUBTRACT:
      asmCode = asmCode.concat([
        `@${RAM_POINTERS.STACK}
M=M-1;
A=M;
D=M;

A=A-1;
M=M-D;`,
      ]);

      break;
    default:
      console.error("Asm code successfully created so far:", asmCode);
      throw new Error(`Invalid arithmetic operation: ${operation}.`);
  }

  return asmCode.concat([""]);
}

module.exports = main;
