const BOOTSTRAP_FILENAME = "Sys";

const RAM_BASES = { STACK: "256", TEMP: "5" };

const RAM_POINTERS = {
  ARGUMENT: "R2",
  LOCAL: "R1",
  STACK: "R0",
  THIS: "R3",
  THAT: "R4"
};

const ASM = {
  BOOTSTRAP: `@${RAM_BASES.STACK}
D=A;
@${RAM_POINTERS.STACK}
M=D;`,
  END: `(END)
@END
0;JMP
`,
  SAVE_D_TO_STACK: `@${RAM_POINTERS.STACK}
A=M;
M=D;
@${RAM_POINTERS.STACK}
M=M+1;`
};

const ARITHMETIC_OPERATIONS = {
  ADD: "add",
  AND: "and",
  EQUIVALENT: "eq",
  GREATER_THAN: "gt",
  LESS_THAN: "lt",
  NEGATE: "neg",
  NOT: "not",
  OR: "or",
  SUBTRACT: "sub"
};

const FUNCTION_OPERATIONS = {
  CALL: "call",
  FUNCTION: "function",
  RETURN: "return"
};

const MEMORY_SEGMENTS = {
  ARGUMENT: "argument",
  CONSTANT: "constant",
  LOCAL: "local",
  POINTER: "pointer",
  STATIC: "static",
  TEMP: "temp",
  THAT: "that",
  THIS: "this"
};

const PROGRAM_FLOW_OPERATIONS = {
  GOTO: "goto",
  IF_GOTO: "if-goto",
  LABEL: "label"
};

const STACK_OPERATIONS = { POP: "pop", PUSH: "push" };

const VM_FILE_EXTENSION = ".vm";

exports.ASM = ASM;
exports.ARITHMETIC_OPERATIONS = ARITHMETIC_OPERATIONS;
exports.BOOTSTRAP_FILENAME = BOOTSTRAP_FILENAME;
exports.FUNCTION_OPERATIONS = FUNCTION_OPERATIONS;
exports.MEMORY_SEGMENTS = MEMORY_SEGMENTS;
exports.PROGRAM_FLOW_OPERATIONS = PROGRAM_FLOW_OPERATIONS;
exports.RAM_BASES = RAM_BASES;
exports.RAM_POINTERS = RAM_POINTERS;
exports.STACK_OPERATIONS = STACK_OPERATIONS;
exports.VM_FILE_EXTENSION = VM_FILE_EXTENSION;
