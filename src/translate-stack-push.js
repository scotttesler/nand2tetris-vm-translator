const {
  ASM,
  MEMORY_SEGMENTS,
  RAM_BASES,
  RAM_POINTERS,
} = require("./constants");

function main(asmCode, memorySegment, num, filename) {
  switch (memorySegment) {
    case MEMORY_SEGMENTS.ARGUMENT:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_POINTERS.ARGUMENT}
A=M+D;
D=M;

${ASM.SAVE_D_TO_STACK}`,
      ]);

      break;
    case MEMORY_SEGMENTS.CONSTANT:
      asmCode = asmCode.concat([
        `@${num}
D=A;

${ASM.SAVE_D_TO_STACK}`,
      ]);

      break;
    case MEMORY_SEGMENTS.LOCAL:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_POINTERS.LOCAL}
A=M+D;
D=M;

${ASM.SAVE_D_TO_STACK}`,
      ]);

      break;
    case MEMORY_SEGMENTS.POINTER:
      switch (num) {
        case "0":
          asmCode = asmCode.concat([
            `@${RAM_POINTERS.THIS}
D=M;

${ASM.SAVE_D_TO_STACK}`,
          ]);

          break;
        case "1":
          asmCode = asmCode.concat([
            `@${RAM_POINTERS.THAT}
D=M;

${ASM.SAVE_D_TO_STACK}`,
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
        `@${filename}.${num}
D=M;

${ASM.SAVE_D_TO_STACK}`,
      ]);

      break;
    case MEMORY_SEGMENTS.TEMP:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_BASES.TEMP}
A=A+D;
D=M;

${ASM.SAVE_D_TO_STACK}`,
      ]);

      break;
    case MEMORY_SEGMENTS.THAT:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_POINTERS.THAT}
A=M+D;
D=M;

${ASM.SAVE_D_TO_STACK}`,
      ]);

      break;
    case MEMORY_SEGMENTS.THIS:
      asmCode = asmCode.concat([
        `@${num}
D=A;

@${RAM_POINTERS.THIS}
A=M+D;
D=M;

${ASM.SAVE_D_TO_STACK}`,
      ]);

      break;
    default:
      console.error("Asm code successfully created so far:", asmCode);
      throw new Error(`Invalid memory segment: ${memorySegment}.`);
  }

  return asmCode.concat([""]);
}

module.exports = main;
