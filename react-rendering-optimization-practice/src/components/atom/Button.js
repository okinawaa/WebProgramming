import React from "react";

function Button({ value, className, disabled, onClick, logRender }) {
  if (logRender) {
    console.log("Button component render");
  }

  return (
    <button
      type="button"
      className={`${className} btn btn-light`}
      disabled={disabled}
      onClick={event => {
        event.preventDefault();
        onClick && onClick();
      }}>
      {value}
    </button>
  );
}

export default React.memo(Button);
