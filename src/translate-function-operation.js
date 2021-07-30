const { ASM, FUNCTION_OPERATIONS, RAM_POINTERS } = require("./constants");

const uuidv4 = require("uuid/v4");

const HEIGHT_OF_CALLER_STATE = "5";

function main(asmCode, operation, functionName, num, filename) {
  const uuid = uuidv4();

  switch (operation) {
    case FUNCTION_OPERATIONS.CALL:
      const retAddr = `${filename}$ret.${uuid}`;

      asmCode = asmCode.concat([
        `@${retAddr}
D=A;
${ASM.SAVE_D_TO_STACK}

  // Save caller's state.
@${RAM_POINTERS.LOCAL}
D=M;
${ASM.SAVE_D_TO_STACK}

@${RAM_POINTERS.ARGUMENT}
D=M;
${ASM.SAVE_D_TO_STACK}

@${RAM_POINTERS.THIS}
D=M;
${ASM.SAVE_D_TO_STACK}

@${RAM_POINTERS.THAT}
D=M;
${ASM.SAVE_D_TO_STACK}

  // Reposition ARG pointer for callee.
@${HEIGHT_OF_CALLER_STATE}
D=A;
@${RAM_POINTERS.STACK}
D=M-D;
@${num}
D=D-A;
@${RAM_POINTERS.ARGUMENT}
M=D;

  // Reposition LCL pointer for callee.
@${RAM_POINTERS.STACK}
D=M;
@${RAM_POINTERS.LOCAL}
M=D;

@${functionName}
0;JMP

(${retAddr})`,
      ]);

      break;
    case FUNCTION_OPERATIONS.FUNCTION:
      asmCode = asmCode.concat([
        `(${functionName})

@i
M=0;
@${num}
D=A;
@n
M=D;

(LOOP-${uuid})
@i
D=M;
@n
D=M-D;

@LOOP-${uuid}-END
D;JEQ

@i
D=M;
@${RAM_POINTERS.LOCAL}
A=M+D;
M=0;

@i
M=M+1;

@${RAM_POINTERS.STACK}
M=M+1;

@LOOP-${uuid}
0;JMP

(LOOP-${uuid}-END)`,
      ]);

      break;
    case FUNCTION_OPERATIONS.RETURN:
      asmCode = asmCode.concat([
        `  // RET = *(FRAME - 5)
@${RAM_POINTERS.LOCAL}
D=M;

@${HEIGHT_OF_CALLER_STATE}
A=D-A;
D=M;

@retAddr
M=D;

  // *ARG = pop()
@${RAM_POINTERS.STACK}
M=M-1;
A=M;
D=M;

@${RAM_POINTERS.ARGUMENT}
A=M;
M=D;

  // SP = ARG + 1
@${RAM_POINTERS.ARGUMENT}
D=M;
@${RAM_POINTERS.STACK}
M=D+1;

  // THAT = *(LCL - 1)
@${RAM_POINTERS.LOCAL}
D=M;

@1
A=D-A;
D=M;

@${RAM_POINTERS.THAT}
M=D;

  // THIS = *(LCL - 2)
@${RAM_POINTERS.LOCAL}
D=M;

@2
A=D-A;
D=M;

@${RAM_POINTERS.THIS}
M=D;

  // ARG = *(LCL - 3)
@${RAM_POINTERS.LOCAL}
D=M;

@3
A=D-A;
D=M;

@${RAM_POINTERS.ARGUMENT}
M=D;

  // LCL = *(LCL - 4)
@${RAM_POINTERS.LOCAL}
D=M;

@4
A=D-A;
D=M;

@${RAM_POINTERS.LOCAL}
M=D;

  // goto RET
@retAddr
A=M;
0;JMP`,
      ]);

      break;
    default:
      console.error("Asm code successfully created so far:", asmCode);
      throw new Error(`Invalid function operation: ${operation}.`);
  }

  return asmCode.concat([""]);
}

module.exports = main;
