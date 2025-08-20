const createOn = (componentNode) => {
  // listen to an event
  const on = (event, eventListener) => {
    if (typeof event !== 'string' || typeof eventListener !== 'function') {
      throw new TypeError('event has to be a string and event handler has to be a function');
    }

    if (!componentNode._events) {
      componentNode._events = {};
    }

    if (!componentNode._events[event]) {
      componentNode._events[event] = [];
    }

    const listeners = componentNode._events[event];
    const has = listeners.find((listener) => listener === eventListener);
    !has && listeners.push(eventListener);
  };

  const off = (event, eventListener) => {
    const listeners = componentNode?._events?.[event];
    const index = listeners?.findIndex((listener) => listener === eventListener);
    listeners.splice(index, 1);
  };

  componentNode.$on = on;
  componentNode.$off = off;
  return componentNode;
};

/**
 * Dispatches an event upward through the component node's parent chain.
 *
 * @param {Object} curComponentNode - The current component node to start dispatching from.
 * @param {string} event - The name of the event to dispatch.
 * @param {Array} args - The arguments to pass to the event listeners.
 *
 * The function traverses up the parent chain (_parent) of the component node.
 * For each node, if there are listeners for the event, it calls them in order.
 * If any listener returns a truthy value, propagation stops immediately.
 */
const dispatch = (curComponentNode, event, args) => {
  while (curComponentNode) {
    const eventListeners = curComponentNode._events?.[event];
    if (eventListeners && eventListeners.length) {
      for (let i = 0; i < eventListeners.length; i++) {
        if (eventListeners[i](...args)) return;
      }
    }
    curComponentNode = curComponentNode._parent;
  }
};

const createDispatch = (componentNode) => {
  // trigger an event
  componentNode.$dispatch = (event, ...args) => {
    dispatch(componentNode, event, args);
  };

  return componentNode;
};

/**
 * Traverses downward through all descendants of the given component node,
 * broadcasting an event to each child node recursively.
 *
 * For each child node, if there are listeners for the specified event,
 * each listener is called in order with the provided arguments.
 * If any listener returns a truthy value, propagation to further descendants stops immediately.
 *
 * @param {Object} curComponentNode - The current component node to start broadcasting from.
 * @param {string} event - The name of the event to broadcast.
 * @param {Array} args - The arguments to pass to the event listeners.
 */

const broadcase = (curComponentNode, event, args) => {
  const { _children } = curComponentNode;
  if (_children) {
    for (let child of _children) {
      const { _events = {} } = child;
      const eventListeners = _events[event] ?? [];
      for (let eventListener of eventListeners) {
        const returnedValue = eventListener(...args);
        if (returnedValue) return;
      }

      broadcase(child, event, args);
    }
  }
};

const createBroadcast = (componentNode) => {
  // trigger an event
  componentNode.$broadcast = (event, ...args) => {
    broadcase(componentNode, event, args);
  };

  return componentNode;
};

const createEmit = (componentNode) => {
  // trigger an event
  componentNode.$emit = (event, ...args) => {
    dispatch(componentNode, event, args);
    broadcase(componentNode, event, args);
  };

  return componentNode;
};

export { createOn, createEmit, createBroadcast, createDispatch };
