import clsx from "clsx";
import { forwardRef, useCallback, useEffect } from "react";

import classes from "./AutoHeightTextarea.module.css";

const AutoHeightTextarea = (
  { id,
    className,
    onChange,
    onBlur,
    onFocus,
    defaultValue,
    placeholder,
    autoFocus,
    value,
    rows,
    spellCheck
  },
  ref
) => {
  const handleAutoHeight = useCallback(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [ref]);
  useEffect(() => {
    handleAutoHeight();
  }, [handleAutoHeight]);

  return (
    <textarea
      ref={ref}
      id={id}
      className={clsx(className, classes.textarea)}
      onChange={(event) => {
        const value = event.target.value;
        handleAutoHeight();
        onChange(value);
      }}
      onBlur={(event) => {
        const value = event.target.value;
        onBlur(value);
      }}
      rows={rows}
      onFocus={onFocus}
      placeholder={placeholder}
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      spellCheck={spellCheck}
      value={value}
    />
  );
};

export default forwardRef(AutoHeightTextarea);
