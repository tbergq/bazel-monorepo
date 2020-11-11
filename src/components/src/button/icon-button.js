// @flow

import { type Node, type Element, cloneElement } from 'react';
import { create } from '@adeira/sx';

// TODO: Allow more types and sizes
type Props = {
  +'children': Element<any>,
  +'onClick'?: () => void,
  +'aria-label': string,
};

export default function IconButton({ children, ...rest }: Props): Node {
  return (
    <button {...rest} type="button" className={styles('button', 'primary', 'normal')}>
      {cloneElement(children, { className: styles('icon') })}
    </button>
  );
}

const styles = create({
  button: {
    'position': 'relative',
    'color': 'var(--color-white)',
    'border': 'none',
    'borderRadius': '50%',
    'outline': 'none',
    'fontFamily': 'inherit',
    'transition': 'transform .3s',
    'cursor': 'pointer',
    ':hover': {
      transform: 'translateY(-3px)',
    },
    ':active:hover': {
      transform: 'translateY(-1px)',
    },
  },
  primary: {
    'backgroundColor': 'var(--color-primary)',
    ':focus': {
      boxShadow: 'var(--color-primary-focus) 0px 0px 0px 0.2rem',
    },
  },
  normal: {
    fontSize: '1.6rem',
    height: '4rem',
    width: '4rem',
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});