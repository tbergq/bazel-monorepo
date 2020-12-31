// @flow

import { type Node } from 'react';
import { Box } from '@tbergq/components';
import { create } from '@adeira/sx';
import { fbt } from 'fbt';

import type { Exercise } from '../../types';

type Props = {
  +exercise: Exercise,
  +onClick: (Exercise) => void,
};

export default function DayExercise({ exercise, onClick }: Props): Node {
  return (
    <button onClick={() => onClick(exercise)} type="button" className={styles('button')}>
      <Box title={exercise.base_exercise.name} ellipsisContainer={true}>
        {exercise.base_exercise.name}
      </Box>
      <Box
        justifyContent="flex-end"
        ellipsisContainer={true}
        flexGrow="1"
        flexShrink="0"
        display="flex"
      >
        <Box>{exercise.set}</Box>
        <Box>&nbsp;&times;&nbsp;</Box>
        <Box>{exercise.reps}</Box>
        <Box>
          &nbsp;-&nbsp;{exercise.break_time} <fbt desc="minute abbreviation">min</fbt>
        </Box>
      </Box>
    </button>
  );
}

const hoverFocus = {
  backgroundColor: 'var(--color-gray-light)',
};
const styles = create({
  button: {
    'background': 'none',
    'border': 'none',
    'outline': 'none',
    'display': 'flex',
    'width': '100%',
    'padding': 'var(--space-normal) 0',
    'cursor': 'pointer',
    ':hover': hoverFocus,
    ':focus': hoverFocus,
    ':not(:last-of-type)': {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'var(--color-gray-light)',
    },
  },
});
