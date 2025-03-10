import Context from './context/Context';
import { Action, Props } from './types';

function chain(actions: Action[]) {
  if (!Array.isArray(actions))
    throw new TypeError('Chain stack must be an array!');
  for (const action of actions) {
    if (typeof action !== 'function')
      throw new TypeError('Chain must be composed of actions!');
  }

  return function Chain(context: Context, props: Props = {}): Action {
    // do immutable reverse
    const reversedAction = actions.slice().reverse();

    const boundActions = reversedAction.reduce(
      (acc: Action[], curr: Action) => {
        if (acc.length === 0) {
          return [
            curr.bind(null, context, {
              ...props,
            }),
          ];
        }
        return [
          curr.bind(null, context, {
            ...props,
            next: acc[0],
          }),
          ...acc,
        ];
      },
      []
    );

    return boundActions[0];
  };
}

export default chain;
