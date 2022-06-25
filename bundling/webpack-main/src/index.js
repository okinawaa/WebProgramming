// import { hello, add } from "./util";
import "./style.css";
import "./header.css";
import List from "./List";
import logo from "./images/angma.jpg";

// const text = hello("<h1>나는 코딩앙마!!~~</h1>");
// const num = add(1, 2);
const img = `<img src="${logo}" alt="코딩앙마" />`;

const users = [
  {
    id: 1,
    name: "블랙 위도우",
  },
  {
    id: 2,
    name: "아이언맨",
  },
  {
    id: 3,
    name: "헐크",
  },
  {
    id: 4,
    name: "스파이더맨",
  },
  {
    id: 5,
    name: "캡틴 아메리카",
  },
];

document.getElementById("root").appendChild(List({ userList: users }));
