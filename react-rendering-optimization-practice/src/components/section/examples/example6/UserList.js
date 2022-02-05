import { useState } from "react";

import UserItem from "components/section/examples/example6/UserItem";
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
      {
        id: 2,
        name: "Jung",
        age: 30,
        score: 90,
      },
      ...users,
    ]);
  };

  return (
    <div>
      <Button
        value="배열의 맨 앞에 아이템 추가"
        disabled={users.length >= 3}
        onClick={addUser}
      />
      {users.map((user, index) => {
        return <UserItem key={index} user={user} />;
      })}
    </div>
  );
}

export default UserList;
