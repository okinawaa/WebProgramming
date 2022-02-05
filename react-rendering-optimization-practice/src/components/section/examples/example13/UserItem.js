import React from "react";

function UserItem({ user, result }) {
  console.log(`UserItem (id: ${user.id}) component render`);

  return (
    <div className="user-item">
      <div>이름: {user.name}</div>
      <div>나이: {user.age}</div>
      <div>점수: {user.score}</div>
      <div>등급: {result.grade}</div>
      <div>평가: {result.comment}</div>
    </div>
  );
}

export default React.memo(UserItem);
