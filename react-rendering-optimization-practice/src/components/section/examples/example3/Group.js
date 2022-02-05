function Group({ group }) {
  console.log("Group component render");

  return (
    <div>
      <div>그룹: {group.name}</div>
      <div>{group.description}</div>
    </div>
  );
}

export default Group;
