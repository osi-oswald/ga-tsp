/**
 * prevent default
 */
export function pd<T extends Function>(handler: T) {
  return (e: { preventDefault: Function }) => {
    e.preventDefault();
    handler(e);
  };
}
