import { useState } from "react";

import UserItem from "components/section/examples/example1/UserItem";
import Button from "components/atom/Button";

function UserList() {
  console.log("UserList component render");

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

  const addUser = () => {
    setUsers([
      ...users,
      {
        id: 2,
        name: "Jung",
        age: 30,
      },
    ]);
  };

  return (
    <div>
      <Button
        value="새 유저 생성"
        disabled={users.length >= 3}
        onClick={addUser}
      />
      {users.map(user => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            name={user.name}
            age={user.age}
          />
        );
      })}
    </div>
  );
}

export default UserList;
