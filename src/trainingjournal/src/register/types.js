// @flow

export type DayRegister = {
  +id: number,
  +start_time: string,
  +end_time: string,
  +day_program: DayProgram,
};

export type DayProgram = {
  +id: number,
  +name: string,
};

export type ExerciseRegister = {
  +note: string,
  +reps: number,
  +weight: string,
};
