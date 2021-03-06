// @flow

import { Schema, Model, type MongoId } from 'mongoose';

import connection from '../connection';
import WeekModel, { WeekSchema } from './week';

const ProgramSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  weeks: [WeekSchema],
});

type CreateProgramArgs = {
  +name: string,
  +user: string,
};

type AddWeekArgs = {
  +programId: string,
  +user: string,
  +weekName: string,
};

type AddDayArgs = {
  +programId: string,
  +user: string,
  +weekId: string,
  +dayName: string,
};

type AddSetArgs = {
  +user: MongoId,
  +dayId: MongoId,
  +set: $ReadOnly<{
    exercise: MongoId,
    sets: string,
    reps: string,
    breakTime: string,
    group?: string,
  }>,
};

export type DeletedReturn = {
  +deletedCount: number,
  ...
};

class ProgramModel extends Model {
  _id: MongoId;
  name: string;
  user: MongoId;
  weeks: $ReadOnlyArray<WeekModel>;

  static createProgram(program: CreateProgramArgs): Promise<this> {
    return this.create(program);
  }

  static getPrograms(user: MongoId): Promise<$ReadOnlyArray<this>> {
    return this.find({ user });
  }

  static getByIds(
    programIds: $ReadOnlyArray<string>,
    user: ?string,
  ): Promise<$ReadOnlyArray<this>> {
    return this.find({ _id: { $in: programIds }, user });
  }

  static addWeek({ programId, user, weekName }: AddWeekArgs): Promise<?this> {
    try {
      return this.findOneAndUpdate(
        { user, _id: programId },
        { $push: { weeks: { name: weekName } } },
        { new: true },
      );
    } catch {
      return Promise.resolve(null);
    }
  }

  static async addDay({ programId, user, weekId, dayName }: AddDayArgs): Promise<?this> {
    try {
      const data = await this.findOneAndUpdate(
        { user, '_id': programId, 'weeks._id': weekId },
        { $push: { 'weeks.$.days': { name: dayName } } },
        { new: true },
      );
      return data;
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  static getDayByIds(dayIds: $ReadOnlyArray<string>, user: ?string): Promise<$ReadOnlyArray<this>> {
    return this.find({ 'weeks.days._id': { $in: dayIds }, user });
  }

  static addSet({ user, dayId, set }: AddSetArgs): Promise<?this> {
    try {
      return this.findOneAndUpdate(
        { user, 'weeks.days._id': dayId },
        { $push: { 'weeks.$.days.$[day].sets': set } },
        { new: true, arrayFilters: [{ 'day._id': dayId }] },
      );
    } catch {
      return Promise.resolve(null);
    }
  }

  static deleteProgram(id: string, user: string): Promise<DeletedReturn> {
    return this.deleteOne({ _id: id, user });
  }

  static deleteWeek(weekId: string, user: string): Promise<DeletedReturn> {
    return this.deleteOne({
      'weeks._id': weekId,
      user,
    });
  }

  static deleteDay(dayId: string, user: string): Promise<DeletedReturn> {
    return this.deleteOne({
      'weeks.days._id': dayId,
      user,
    });
  }

  static deleteSet(setId: string, user: string): Promise<DeletedReturn> {
    return this.deleteOne({
      'weeks.days.sets._id': setId,
      user,
    });
  }
}

ProgramSchema.loadClass(ProgramModel);

const program: Class<ProgramModel> = connection.model('programs', ProgramSchema);

export default program;
