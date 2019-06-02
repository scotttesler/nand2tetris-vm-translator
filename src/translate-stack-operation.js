const { STACK_OPERATIONS } = require("./constants");

const translateStackPop = require("./translate-stack-pop");
const translateStackPush = require("./translate-stack-push");

function main(
  asmCode,
  operation,
  memorySegment,
  num,
  filename) {
  switch (operation) {
    case STACK_OPERATIONS.POP:
      asmCode = translateStackPop(
        asmCode,
        memorySegment,
        num,
        filename
      );

      break;
    case STACK_OPERATIONS.PUSH:
      asmCode = translateStackPush(
        asmCode,
        memorySegment,
        num,
        filename
      );

      break;
    default:
      console.error("Asm code successfully created so far:", asmCode);
      throw new Error(`Invalid stack operation: ${operation}.`);
  }

  return asmCode;
}

module.exports = main;
