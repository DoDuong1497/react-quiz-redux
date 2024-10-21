import React from "react"

export const useDebounce = (value: string, delay: number = 500) => {
  const [debounceValue, setDebounceValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    }
  }, [value, delay])

  return debounceValue;
}