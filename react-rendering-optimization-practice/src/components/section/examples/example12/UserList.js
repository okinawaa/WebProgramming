import { useState, useMemo, useCallback } from "react";

import Average from "components/section/examples/example12/Average";
import UserItem from "components/section/examples/example12/UserItem";
import Button from "components/atom/Button";

function UserList() {
  console.log("UserList component render");

  const [text, setText] = useState("");
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

  const average = useMemo(() => {
    console.log("calculate average. It takes long time !!");
    return users.reduce((result, user) => {
      return result + user.score / users.length;
    }, 0);
  }, [users]);

  const addUser = useCallback(() => {
    setUsers([
      {
        id: 2,
        name: "Jung",
        age: 30,
        score: 90,
      },
      ...users,
    ]);
  }, [users]);

  return (
    <div>
      <div>
        <input
          type="text"
          value={text}
          placeholder="아무 내용이나 입력하세요."
          onChange={event => setText(event.target.value)}
        />
      </div>
      <Button
        value="새 유저 생성"
        disabled={users.length >= 3}
        onClick={addUser}
        logRender
      />
      <Average average={average} />
      {users.map(user => {
        return <UserItem key={user.id} user={user} />;
      })}
    </div>
  );
}

export default UserList;
