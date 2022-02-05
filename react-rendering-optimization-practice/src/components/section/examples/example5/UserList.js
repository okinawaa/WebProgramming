import { useState } from "react";

import UserItem from "components/section/examples/example5/UserItem";
import Button from "components/atom/Button";

function UserList() {
  console.log("UserList component render");

  const [users, setUsers] = useState([
    {
      id: 0,
      name: "Kim",
      age: 27,
      score: 80,
    },
    {
      id: 1,
      name: "Jo",
      age: 25,
      score: 70,
    },
  ]);

  const addUser = () => {
    setUsers([
      ...users,
      {
        id: 2,
        name: "Jung",
        age: 30,
        score: 90,
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
        return <UserItem key={user.id} user={user} />;
      })}
    </div>
  );
}

export default UserList;
