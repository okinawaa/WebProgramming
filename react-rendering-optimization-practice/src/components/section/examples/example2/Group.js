import { useState } from "react";

function Group() {
  console.log("Group component render");

  const [name] = useState("coco");
  const [description] = useState("rendering optimization pracitice");

  return (
    <div>
      <div>그룹: {name}</div>
      <div>{description}</div>
    </div>
  );
}

export default Group;
