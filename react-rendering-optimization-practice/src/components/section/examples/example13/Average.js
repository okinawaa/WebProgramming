import React from "react";

function Average({ average }) {
  console.log("Average component render");

  return <div>평균: {average}</div>;
}

export default React.memo(Average);
