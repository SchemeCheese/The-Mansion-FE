import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Transitions } from 'types';

import transitions, { classNames } from './transitions';

type TransitionNodeRef = ReturnType<typeof React.createRef<HTMLDivElement>>;

interface Props {
  appear: boolean;
  children: React.ReactNode;
  className?: string;
  enter: boolean;
  exit: boolean;
  style?: React.CSSProperties;
  timeout: number;
  transition: Transitions;
}

function Transition({ children, className, style, transition, ...rest }: Props) {
  const nodeRefs = React.useRef<Record<string, TransitionNodeRef>>({});
  const Component = transitions[transition];

  if (!Component) {
    console.error(`Invalid transition: ${transition}`); // eslint-disable-line no-console

    return null;
  }

  return (
    <TransitionGroup className={className} style={style}>
      {React.Children.toArray(children)
        .filter(child => !!child)
        .map((child, index) => {
          const childKey =
            React.isValidElement(child) && child.key !== null ? String(child.key) : String(index);

          if (!nodeRefs.current[childKey]) {
            nodeRefs.current[childKey] = React.createRef<HTMLDivElement>();
          }

          const nodeRef = nodeRefs.current[childKey];

          return (
            <CSSTransition
              key={childKey}
              classNames={classNames[transition]}
              nodeRef={nodeRef}
              {...rest}
            >
              <Component ref={nodeRef}>{child}</Component>
            </CSSTransition>
          );
        })}
    </TransitionGroup>
  );
}

Transition.defaultProps = {
  appear: true,
  enter: true,
  exit: true,
  timeout: 300,
  transition: 'fade',
};

export default Transition;
