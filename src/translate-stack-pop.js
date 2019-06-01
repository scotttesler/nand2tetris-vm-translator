const { ASM, MEMORY_SEGMENTS, RAM_BASES, RAM_POINTERS } = require("./constants");

function main(asmCode, memorySegment, num, filename) {
  asmCode = asmCode.concat([`@${RAM_POINTERS.STACK}`, "M=M-1;"]);

  switch (memorySegment) {
    case MEMORY_SEGMENTS.ARGUMENT:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_POINTERS.ARGUMENT}
D=M+D;
@tempPtr
M=D;

@${RAM_POINTERS.STACK}
A=M;
D=M;

@tempPtr
A=M;
M=D;`
      ]);

      break;
    case MEMORY_SEGMENTS.LOCAL:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_POINTERS.LOCAL}
D=M+D;
@tempPtr
M=D;

@${RAM_POINTERS.STACK}
A=M;
D=M;

@tempPtr
A=M;
M=D;`
      ]);

      break;
    case MEMORY_SEGMENTS.POINTER:
      switch (num) {
        case "0":
          asmCode = asmCode.concat([
            `@${RAM_POINTERS.STACK}
A=M
D=M;

@${RAM_POINTERS.THIS}
M=D;`
          ]);

          break;
        case "1":
          asmCode = asmCode.concat([
            `@${RAM_POINTERS.STACK}
A=M
D=M;

@${RAM_POINTERS.THAT}
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
    case MEMORY_SEGMENTS.STATIC:
      asmCode = asmCode.concat([
        `@${RAM_POINTERS.STACK}
A=M;
D=M;

@${filename}.${num}
M=D;`
      ]);

      break;
    case MEMORY_SEGMENTS.TEMP:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_BASES.TEMP}
D=A+D;
@tempPtr
M=D;

@${RAM_POINTERS.STACK}
A=M;
D=M;

@tempPtr
A=M;
M=D;`
      ]);

      break;
    case MEMORY_SEGMENTS.THAT:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_POINTERS.THAT}
D=M+D;
@tempPtr
M=D;

@${RAM_POINTERS.STACK}
A=M;
D=M;

@tempPtr
A=M;
M=D;`
      ]);

      break;
    case MEMORY_SEGMENTS.THIS:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_POINTERS.THIS}
D=M+D;
@tempPtr
M=D;

@${RAM_POINTERS.STACK}
A=M;
D=M;

@tempPtr
A=M;
M=D;`
      ]);

      break;
    default:
      console.error("Asm code successfully created so far:", asmCode);
      throw new Error(`Invalid memory segment: ${memorySegment}.`);
  }

  return asmCode.concat([""]);
}

module.exports = main;
