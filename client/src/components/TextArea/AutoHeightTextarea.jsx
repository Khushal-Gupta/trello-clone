import clsx from "clsx";
import { forwardRef, useCallback, useEffect, useRef } from "react";
import mergeRefs from "react-merge-refs";

import classes from "./AutoHeightTextarea.module.css";

const AutoHeightTextarea = (
  {
    id,
    className,
    onChange,
    onBlur,
    onFocus,
    defaultValue,
    placeholder,
    autoFocus = false,
    value,
    rows,
    spellCheck = false,
  },
  ref
) => {
  const localRef = useRef(null);
  const handleAutoHeight = useCallback(() => {
    if (localRef?.current) {
      localRef.current.style.height = "auto";
      localRef.current.style.height = localRef.current.scrollHeight + "px";
    }
  }, [localRef]);
  useEffect(() => {
    if (localRef?.current) {
      localRef.current.selectionStart = localRef.current.value.length;
    }
    handleAutoHeight();
  }, [handleAutoHeight, localRef]);

  return (
    <textarea
      ref={mergeRefs([localRef, ref])}
      id={id}
      className={clsx(className, classes.textarea)}
      onChange={(event) => {
        const value = event.target.value;
        handleAutoHeight();
        onChange?.(value);
      }}
      onBlur={(event) => {
        onBlur?.(event.target.value);
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
