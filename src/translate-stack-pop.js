const MEMORY_SEGMENT_ARGUMENT = "argument";
const MEMORY_SEGMENT_LOCAL = "local";
const MEMORY_SEGMENT_POINTER = "pointer";
const MEMORY_SEGMENT_STATIC = "static";
const MEMORY_SEGMENT_TEMP = "temp";
const MEMORY_SEGMENT_THAT = "that";
const MEMORY_SEGMENT_THIS = "this";

const RAM_STACK_PTR = "R0";
const RAM_LCL_PTR = "R1";
const RAM_ARG_PTR = "R2";
const RAM_THIS_PTR = "R3";
const RAM_THAT_PTR = "R4";

const RAM_TEMP_BASE = "5";

function main(asmCode, memorySegment, num, filenameWithoutExtension) {
  asmCode = asmCode.concat([`@${RAM_STACK_PTR}`, "M=M-1;"]);

  switch (memorySegment) {
    case MEMORY_SEGMENT_ARGUMENT:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_ARG_PTR}
D=M+D;
@tempPtr
M=D;

@${RAM_STACK_PTR}
A=M;
D=M;

@tempPtr
A=M;
M=D;
`
      ]);

      break;
    case MEMORY_SEGMENT_LOCAL:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_LCL_PTR}
D=M+D;
@tempPtr
M=D;

@${RAM_STACK_PTR}
A=M;
D=M;

@tempPtr
A=M;
M=D;
`
      ]);

      break;
    case MEMORY_SEGMENT_POINTER:
      switch (num) {
        case "0":
          asmCode = asmCode.concat([
            `@${RAM_STACK_PTR}
A=M
D=M;

@${RAM_THIS_PTR}
M=D;`
          ]);

          break;
        case "1":
          asmCode = asmCode.concat([
            `@${RAM_STACK_PTR}
A=M
D=M;

@${RAM_THAT_PTR}
M=D;`
          ]);

          break;
        default:
          console.error("Asm code successfully created so far:", asmCode);
          throw new Error(
            `Invalid value for memory segment 'pointer': ${num}.`
          );
      }

      break;
    case MEMORY_SEGMENT_STATIC:
      asmCode = asmCode.concat([
        `@${RAM_STACK_PTR}
A=M;
D=M;

@${filenameWithoutExtension}.${num}
M=D;`
      ]);

      break;
    case MEMORY_SEGMENT_TEMP:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_TEMP_BASE}
D=A+D;
@tempPtr
M=D;

@${RAM_STACK_PTR}
A=M;
D=M;

@tempPtr
A=M;
M=D;
`
      ]);

      break;
    case MEMORY_SEGMENT_THAT:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_THAT_PTR}
D=M+D;
@tempPtr
M=D;

@${RAM_STACK_PTR}
A=M;
D=M;

@tempPtr
A=M;
M=D;
`
      ]);

      break;
    case MEMORY_SEGMENT_THIS:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_THIS_PTR}
D=M+D;
@tempPtr
M=D;

@${RAM_STACK_PTR}
A=M;
D=M;

@tempPtr
A=M;
M=D;
`
      ]);

      break;
    default:
      console.error("Asm code successfully created so far:", asmCode);
      throw new Error(`Invalid memory segment: ${memorySegment}.`);
  }

  return asmCode.concat([""]);
}

module.exports = main;
