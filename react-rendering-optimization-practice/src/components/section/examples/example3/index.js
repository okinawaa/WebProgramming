import { useState } from "react";

import Group from "components/section/examples/example3/Group";
import UserList from "components/section/examples/example3/UserList";

function Example3() {
  const [state, setState] = useState({
    group: {
      name: "coco",
      description: "rendering optimization pracitice",
    },
    users: [
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
    ],
  });

  return (
    <div>
      <Group group={state.group} />
      <UserList
        users={state.users}
        setUsers={newUsers => {
          setState({ ...state, users: newUsers });
        }}
      />
    </div>
  );
}

export default Example3;
