// @flow

import { type Node, type Element, useState, useCallback, Children } from 'react';
import { MdMenu } from 'react-icons/md';
import classNames from 'classnames';

import styles from './navbar.module.css';
import Box from '../box/box';
import useMatchMedia from '../use-match-media';
import { breakpoints } from '../breakpoints';
import IconButton from '../button/icon-button';

type Props = {
  +brand: Element<any>,
  +left?: Node,
  +right?: Node,
  +menuAriaLabel?: string,
};

export default function Navbar({ brand, left, right, menuAriaLabel = 'Menu' }: Props): Node {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const onNavLinkClick = (e: SyntheticEvent<HTMLElement>) => {
    // $FlowExpectedError[prop-missing]
    if (e.target.tagName === 'A') {
      setIsExpanded(false);
    }
  };

  const onMatchMediaChange = useCallback((matches) => {
    setIsDesktop(matches);
    if (matches) {
      setIsExpanded(false);
    }
  }, []);

  useMatchMedia(breakpoints.desktop, onMatchMediaChange);
  return (
    <nav
      className={classNames(styles.Navbar, styles.Navbar__header, {
        [styles['Navbar__header--expanded']]: isExpanded,
      })}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <div className={styles.Navbar__brand}>{brand}</div>
          {isDesktop && <div>{left}</div>}
        </Box>
        {isDesktop ? (
          <div>{right}</div>
        ) : (
          <span className={styles['Navbar__Burger-wrapper']}>
            <IconButton aria-label={menuAriaLabel} onClick={() => setIsExpanded((state) => !state)}>
              <MdMenu />
            </IconButton>
          </span>
        )}
      </Box>
      <div
        className={classNames(styles['Navbar__expanded-container'], {
          [styles['Navbar__expanded-container--visible']]: isExpanded,
        })}
      >
        {isExpanded && (
          <div className={styles.Navbar__expanded} onClick={onNavLinkClick}>
            <Box>
              {Children.map(left, (child) => (
                <div className={styles['Navbar__expanded-link-wrapper']}>{child}</div>
              ))}
              {Children.map(right, (child) => (
                <div className={styles['Navbar__expanded-link-wrapper']}>{child}</div>
              ))}
            </Box>
          </div>
        )}
      </div>
    </nav>
  );
}
