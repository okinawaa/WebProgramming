import React from "react";

const getResult = score => {
  if (score <= 70) {
    return { grade: "D", comment: "bad" };
  } else if (score <= 80) {
    return { grade: "C", comment: "good" };
  } else if (score <= 90) {
    return { grade: "B", comment: "great" };
  } else {
    return { grade: "A", comment: "excellent" };
  }
};

function UserItem({ user }) {
  console.log(`UserItem (id: ${user.id}) component render`);

  const { grade, comment } = getResult(user.score);

  return (
    <div className="user-item">
      <div>이름: {user.name}</div>
      <div>나이: {user.age}</div>
      <div>점수: {user.score}</div>
      <div>등급: {grade}</div>
      <div>평가: {comment}</div>
    </div>
  );
}

export default React.memo(UserItem);
