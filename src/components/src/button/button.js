// @flow

import type { Node, ComponentType } from 'react';
import classNames from 'classnames';

import Spinner from '../spinner/spinner';
import styles from './button.module.css';

type Props = {
  +'children': Node,
  +'variant'?: 'primary' | 'secondary' | 'white' | 'danger',
  +'type'?: 'button' | 'submit',
  +'onClick'?: () => void,
  +'isLoading'?: boolean,
  +'size'?: 'small' | 'normal',
  +'aria-label'?: string,
  +'as'?: ComponentType<any> | string,
  +'fullWidth'?: 'all' | 'mediumMobile',
};

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  size = 'normal',
  isLoading,
  as = 'button',
  fullWidth,
  ...rest
}: Props): Node {
  const Component = as;
  return (
    <Component
      disabled={isLoading}
      type={type}
      className={classNames(
        `${styles.btn} ${styles[`btn--${size}`]} ${styles[`btn--${variant}`]}`,
        {
          [`${styles['btn--full-width']}`]: fullWidth === 'all',
          [`${styles['btn--full-with-until-medium-mobile']}`]: fullWidth === 'mediumMobile',
        },
      )}
      {...rest}
    >
      {isLoading === true ? <Spinner size="small" color="white" /> : children}
    </Component>
  );
}
