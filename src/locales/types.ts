import type {
  Direction,
  InstructionModifier,
  InstructionType,
} from '../common/types';

type TurnDirections = { [key in InstructionModifier]?: string | string[] };

type Directions = { [key in InstructionModifier | Direction]?: string };

export type Instructions = TurnDirections & {
  [key in InstructionType]?: string | string[];
};

interface UI {
  startPlaceholder: string;
  viaPlaceholder: string;
  endPlaceholder: string;
}

export interface Units {
  meters: string;
  kilometers: string;
  yards: string;
  miles: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export interface Locale {
  directions: Directions;
  instructions: Instructions;
  formatOrder: (n: number) => string;
  ui: UI;
  units?: Units;
}
