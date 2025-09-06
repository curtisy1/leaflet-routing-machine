import L from 'leaflet';
import type { Locale, Units } from './locales/types';
import {
  type IInstruction,
  type ITextInstruction,
  type IDirectionInstruction,
  InstructionType,
  InstructionModifier,
} from './common/types';
import { en as enLocale } from './locales';
import defaultUnits from './locales/units';

export interface FormatterOptions {
  /**
   * Units to use
   * @default 'metric'
   */
  units?: 'imperial' | 'metric';
  /**
   * Hash of unit names to use
   * @default { meters: 'm', kilometers: 'km', yards: 'yd', miles: 'mi', hours: 'h', minutes: 'mín', seconds: 's' }
   */
  unitNames?: Units | null;
  /**
   * Locale to use to convert instructions to text. Either use a provided one or bring your own
   * @default English
   */
  locale?: Locale;
  /**
   * How much rounding should be applied to distances: positive values use smart rounding, where higher means more accurate, lower less accurate; negative values means fixed precision, where the number of decimals is -roundingSensitivity
   * @default 1
   */
  roundingSensitivity?: number;
  /**
   * String template to use for formatting distances as a string; passed properties value and unit
   * @default '{value} {unit}'
   */
  distanceTemplate?: string;
}

function isTextInstruction(
  instruction: ITextInstruction | IDirectionInstruction,
): instruction is ITextInstruction {
  return (instruction as ITextInstruction).text !== undefined;
}

function isDirectionInstruction(
  instruction: ITextInstruction | IDirectionInstruction,
): instruction is IDirectionInstruction {
  return (instruction as IDirectionInstruction).type !== undefined;
}

/**
 * Implements functions to convert distances and times to strings, as well as converting an {@link IInstruction} to a string. Override or implement your own if you need to customize formatting.
 */
export default class Formatter extends L.Class {
  private readonly defaultOptions = {
    units: 'metric',
    unitNames: defaultUnits,
    roundingSensitivity: 1,
    distanceTemplate: '{value} {unit}',
  };

  options: FormatterOptions;

  constructor(options?: FormatterOptions) {
    super();

    this.options = {
      ...(this.defaultOptions as FormatterOptions),
      ...options,
    };
  }

  /**
   * Formats a distance given in meters to a string with the given (or suitable if not provided) precision and unit
   */
  formatDistance(distance: number, sensitivity = 0) {
    const { distanceTemplate = this.defaultOptions.distanceTemplate } =
      this.options;
    const unitNames =
      this.options.unitNames ||
      ((this.options.locale ?? enLocale).units ?? defaultUnits);
    const simpleRounding = sensitivity <= 0;
    let value: number;
    let yards: number;
    let data: {
      value: number;
      unit: string;
    };

    if (this.options.units === 'imperial') {
      yards = distance / 0.9144;
      if (yards >= 1000) {
        data = {
          value: this.round(distance / 1609.344, sensitivity),
          unit: unitNames.miles,
        };
      } else {
        data = {
          value: this.round(yards, sensitivity),
          unit: unitNames.yards,
        };
      }
    } else {
      value = this.round(distance, sensitivity);
      data = {
        value: value >= 1000 ? value / 1000 : value,
        unit: value >= 1000 ? unitNames.kilometers : unitNames.meters,
      };
    }

    if (simpleRounding) {
      data.value = parseFloat(data.value.toFixed(-sensitivity));
    }

    return L.Util.template(distanceTemplate, data);
  }

  round(distance: number, sensitivity?: number) {
    const { roundingSensitivity = this.defaultOptions.roundingSensitivity } =
      this.options;
    const s = sensitivity || roundingSensitivity;
    const pow10 = 10 ** (`${Math.floor(distance / s)}`.length - 1);
    const r = Math.floor(distance / pow10);
    const p = r > 5 ? pow10 : pow10 / 2;

    return Math.round(distance / p) * p;
  }

  /**
   * Formats a time duration, given in seconds, to a string with suitable precision and unit
   */
  formatTime(time: number) {
    const unitNames =
      this.options.unitNames ||
      ((this.options.locale ?? enLocale).units ?? defaultUnits);
    // More than 30 seconds precision looks ridiculous
    const t = Math.round(time / 30) * 30;

    if (t > 86400) {
      return `${Math.round(t / 3600)} ${unitNames.hours}`;
    } else if (t > 3600) {
      return `${Math.round(t / 3600)} ${unitNames.hours} ${Math.round((t % 3600) / 60)} ${unitNames.minutes}`;
    } else if (t > 300) {
      return `${Math.round(t / 60)} ${unitNames.minutes}`;
    } else if (t >= 60) {
      const seconds = t % 60 !== 0 ? `${t % 60} ${unitNames.seconds}` : '';
      return `${Math.round(t / 60)} ${unitNames.minutes}${seconds}`;
    } else {
      return `${t} ${unitNames.seconds}`;
    }
  }

  /**
   * Formats an instruction to a human readable text
   */
  formatInstruction(instruction: IInstruction, index: number) {
    if (!isTextInstruction(instruction)) {
      const locale = this.options.locale ?? enLocale;
      return this.capitalize(
        L.Util.template(this.getInstructionTemplate(instruction, index), {
          ...instruction,
          ...{
            exitStr: instruction.exit
              ? locale.formatOrder(instruction.exit)
              : '',
            dir: locale.directions[instruction.direction],
            modifier: locale.directions[instruction.modifier],
          },
        }),
      );
    } else {
      return instruction.text;
    }
  }

  /**
   * Returns an icon name depending on the instruction type or modifier
   * If it's a simple text instruction, no icon is returned by default
   */
  getIconName(instruction: IInstruction, index: number) {
    if (!isDirectionInstruction(instruction)) {
      return '';
    }

    switch (instruction.type) {
      case InstructionType.Head:
        if (index === 0) {
          return 'depart';
        }
        break;
      case InstructionType.WaypointReached:
        return 'via';
      case InstructionType.Roundabout:
        return 'enter-roundabout';
      case InstructionType.DestinationReached:
        return 'arrive';
    }

    switch (instruction.modifier) {
      case InstructionModifier.Straight:
        return 'continue';
      case InstructionModifier.SlightRight:
        return 'bear-right';
      case InstructionModifier.Right:
        return 'turn-right';
      case InstructionModifier.SharpRight:
        return 'sharp-right';
      case InstructionModifier.TurnAround:
      case InstructionModifier.Uturn:
        return 'u-turn';
      case InstructionModifier.SharpLeft:
        return 'sharp-left';
      case InstructionModifier.Left:
        return 'turn-left';
      case InstructionModifier.SlightLeft:
        return 'bear-left';
    }
  }

  /**
   * Get the instruction for a specific direction by the instruction type.
   * If the type is something other than a direction, nothing is returned.
   * @param instructionType
   */
  getDirectionInstruction(instructionType: InstructionType) {
    const locale = this.options.locale ?? enLocale;
    switch (instructionType) {
      case InstructionType.Left:
        return locale.directions.Left ?? '';
      case InstructionType.Right:
        return locale.directions.Right ?? '';
      case InstructionType.SharpLeft:
        return locale.directions.SharpLeft ?? '';
      case InstructionType.SharpRight:
        return locale.directions.SharpRight ?? '';
      case InstructionType.SlightLeft:
        return locale.directions.SlightLeft ?? '';
      case InstructionType.SlightRight:
        return locale.directions.SlightRight ?? '';
      case InstructionType.TurnAround:
        return locale.directions.TurnAround ?? '';
      case InstructionType.Uturn:
        return locale.directions.Uturn ?? '';
      default:
        return '';
    }
  }

  capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.substring(1);
  }

  getInstructionTemplate(instruction: IDirectionInstruction, index: number) {
    const locale = this.options.locale ?? enLocale;
    let type = instruction.type;
    if (type === InstructionType.Straight) {
      if (index === 0) {
        type = InstructionType.Head;
      } else {
        type = InstructionType.Continue;
      }
    }

    let strings = locale.instructions[type];
    if (!strings) {
      strings = [
        this.getDirectionInstruction(type),
        ` ${locale.instructions.Onto}`,
      ];
    }

    return (
      strings[0] + (strings.length > 1 && instruction.road ? strings[1] : '')
    );
  }
}

/**
 * Instantiates a new formatter with the provided options
 */
export function formatter(options?: FormatterOptions) {
  return new Formatter(options);
}
