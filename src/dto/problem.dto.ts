import { ProgrammingLanguage, OptimizationLevel } from '../enum/compile-and-run.enum';

export type CreateProblemDto = {
  title: string;
  description: string;
  input: string;
  output: string;
  hint: string;
  hintCost: number;
  testcases?: Testcase[];
  exampleTestcases: Testcase[];
  starterCode: string;
  solution: string;
  solutionLanguage?: ProgrammingLanguage;
  allowedHeaders?: string[];
  bannedFunctions?: string[];
  timeLimit?: number;
  memoryLimit?: number;
  difficulty?: number;
  score?: number;
  optimizationLevel?: OptimizationLevel;
  attachments?: string[];
  tags?: string[];
  credits?: string;
}

export type UpdateProblemDto = Partial<CreateProblemDto> & {
    publicationStatus?: string;
    unlockHint?: boolean;
    reviewComment?: string;
}

export type Testcase = {
    input: string;
    output: string;
}