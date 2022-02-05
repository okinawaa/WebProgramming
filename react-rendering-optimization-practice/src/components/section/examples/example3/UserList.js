import UserItem from "components/section/examples/example3/UserItem";
import Button from "components/atom/Button";

function UserList({ users, setUsers }) {
  console.log("UserList component render");

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
