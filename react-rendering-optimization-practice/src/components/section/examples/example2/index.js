import { useState } from "react";

import Group from "components/section/examples/example2/Group";
import UserList from "components/section/examples/example2/UserList";

function Example2() {
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
      <Group />
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
}

export default Example2;
