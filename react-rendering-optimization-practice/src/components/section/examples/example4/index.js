import { useState } from "react";

import Group from "components/section/examples/example4/Group";
import UserList from "components/section/examples/example4/UserList";

function Example4() {
  const [group] = useState({
    name: "coco",
    description: "rendering optimization pracitice",
  });
  const [users, setUsers] = useState([
    {
      id: 0,
      name: "Kim",
      age: 27,
    },
    {
      id: 1,
      name: "Jo",
      age: 25,
    },
  ]);

  return (
    <div>
      <Group group={group} />
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
}

export default Example4;
