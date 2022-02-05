const Page = (function () {
  let id = 0;

  return function Page({ title, explanation }) {
    this.id = id;
    this.title = title;
    this.explanation = explanation;

    id += 1;
  };
})();

const pages = [
  new Page({
    title: "1. state 선언 위치",
    explanation: [
      "해당 state를 사용하는 컴포넌트 중 가장 상위 컴포넌트에 state를 선언합니다.",
      '개발자 도구 콘솔창을 키고 "새 유저 생성" 버튼을 눌러 어떤 컴포넌트들이 리렌더링 되는지 확인하세요.',
    ],
  }),
  new Page({
    title: "1. state 선언 위치",
    explanation: [
      "더 상위 컴포넌트에 state를 선언하면 불필요한 리렌더링을 하는 컴포넌트들이 생깁니다.",
      '개발자 도구 콘솔창을 키고 "새 유저 생성" 버튼을 눌러 users state를 사용하지 않는 Group 컴포넌트도 리렌더링 되는 것을 확인하세요.',
    ],
  }),
  new Page({
    title: "2. state가 객체라면 되도록 분할을 합니다.",
    explanation: [
      "하나의 객체에 모든 데이터를 저장한 state입니다.",
      '개발자 도구 콘솔창을 키고 "새 유저 생성" 버튼을 눌러 users state값을 변경시키고 users state를 사용하지 않는 Group 컴포넌트도 리렌더링 되는 것을 확인하세요.',
    ],
  }),
  new Page({
    title: "2. state가 객체라면 되도록 분할을 합니다.",
    explanation: [
      "같은 index.js에 선언했지만, group과 users로 객체를 나누어 데이터를 저장한 state입니다.",
      '개발자 도구 콘솔창을 키고 "새 유저 생성" 버튼을 눌러 users state값을 변경시키고 어떤 컴포넌트들이 리렌더링 되는지 확인하세요.',
      "state를 분할한 것만으로는 Group 컴포넌트도 같이 리렌더링 되는 것을 막을 수는 없습니다.",
      "하지만 이 state들을 필요 이상으로 상위컴포넌트에 선언했다는 것을 발견할 수가 있습니다. 즉, 하위 컴포넌트로 내려서 선언할 여지를 발견할 수 있습니다.",
      "state를 쪼개서 하위 컴포넌트로 내려서 선언한 예제가 Example1입니다. Example1의 코드를 다시 확인해보세요.",
      "막 쪼개는게 아니라 컴포넌트별로 사용하는 데이터를 기준으로 쪼개야 합니다.",
    ],
  }),
  new Page({
    title: "3. React.memo를 통해 컴포넌트를 메모이제이션 합니다.",
    explanation: [
      "React.memo를 사용하여 컴포넌트를 메모이제이션하면 해당 컴포넌트는 props가 변경되지 않는 경우 리렌더링을 하지 않습니다.",
      '개발자 도구 콘솔창을 키고 "아이템 추가" 버튼을 눌러 어떤 컴포넌트들이 리렌더링 되는지 확인하세요.',
      "이전에는 모든 UserItem들이 새로 리렌더링 되었으나, 이번에는 새로 추가된 UserItem만 추가 렌더링됩니다.",
    ],
  }),
  new Page({
    title:
      "4. 컴포넌트를 매핑할 때에는 배열의 index를 key값으로 사용하는 것을 피합니다.",
    explanation: [
      "Example5에서 배열의 index를 UserItem의 key값으로 사용한 경우입니다.",
      '개발자 도구 콘솔창을 키고 "배열의 맨 앞에 아이템 추가" 버튼을 눌러 어떤 컴포넌트들이 리렌더링 되는지 확인하세요.',
      "아이템 추가 전에 있던 UserItem들의 key값들이 변경되면서 기존의 key와의 연결이 끊깁니다. 이에 따라 메모이제이션이 되지 않습니다.",
      "또한 렌더링 최적화 관점이 아니어도 데이터들이 기존에 key값에 저장되어 있는 상태에서 key값이 변경되면 데이터가 서로 꼬이면서 부작용이 생길 수도 있습니다.",
    ],
  }),
  new Page({
    title:
      "4. 컴포넌트를 매핑할 때에는 배열의 index를 key값으로 사용하는 것을 피합니다.",
    explanation: [
      "이번에는 배열의 index가 아닌 고유 id를 key값으로 사용한 경우입니다.",
      '개발자 도구 콘솔창을 키고 "배열의 맨 앞에 아이템 추가" 버튼을 눌러 어떤 컴포넌트들이 리렌더링 되는지 확인하세요.',
      "이번에는 아이템이 추가되어도 각 아이템들이 기존에 가지고 있는 자기만의 고유 키를 유지하기 때문에 메모이제이션이 적용됩니다.",
      "또한 key값 변경에 따라 데이터가 꼬이는 부작용도 없습니다.",
    ],
  }),
  new Page({
    title: "5. useMemo를 이용한 렌더링 최적화",
    explanation: [
      "이번에는 유저들의 평균을 계산해서 보여주고 있습니다.",
      "이것은 간단한 예제이므로 사실 평균을 구하는데에는 그리 오랜 시간이 걸리지 않지만, 실제로 이 평균값을 구하는 연산이 엄청 오랜 시간이 걸린다고 가정해봅시다.",
      "개발자 도구 콘솔창을 키고 input에 아무 내용이나 타이핑을 해보세요. 컴포넌트가 리렌더링 될 때마다 평균을 새로 계산하고 있습니다.",
    ],
  }),
  new Page({
    title: "5. useMemo를 이용한 렌더링 최적화",
    explanation: [
      "useMemo를 이용하면 평균을 구하는 연산을 dependencies에 있는 데이터가 변할 때에만 수행하도록 할 수 있습니다.",
      "dependencies에 users를 넣어주면, users가 변할 때에만 useMemo안에 있는 함수를 실행하여 평균값을 반환합니다.",
      "개발자 도구 콘솔창을 키고 input에 아무 내용이나 타이핑을 해보세요. users가 변하지 않으므로 평균을 구하는 useMemo안에 생성함수를 실행하지 않습니다.",
      '이번에는 "새 유저 생성" 버튼을 눌러보세요. users가 변할 때에만 평균을 구하는 useMemo안에 생성함수를 실행합니다.',
    ],
  }),
  new Page({
    title: "5. useMemo를 이용한 렌더링 최적화",
    explanation: [
      "useMemo를 이용해 불필요한 함수의 실행은 방지했으나, 그럼에도 불구하고 input에 타이핑할 때마다 Average 컴포넌트를 리렌더링했습니다.",
      "users가 변경되지 않았을 때, Average 컴포넌트의 리렌더링까지 방지하고 싶다면 Average 컴포넌트에 React.memo를 적용하면 됩니다.",
    ],
  }),
  new Page({
    title: "6. useCallback을 이용한 렌더링 최적화",
    explanation: [
      "이번에는 Button 컴포넌트가 리렌더링 될때마다 콘솔창에 기록되도록 하였습니다.",
      "개발자 도구 콘솔창을 키고 input에 아무 내용이나 타이핑을 해보세요.",
      "Button 컴포넌트에는 React.memo가 적용되었지만 타이핑할 때마다 리렌더링이 발생하고 있습니다.",
      "Button 컴포넌트에 props로 전달하는 onClick에 할당되는 addUser라는 함수가 UserList 컴포넌트가 리렌더링될 때마다 재생성되고 있기 때문입니다.",
    ],
  }),
  new Page({
    title: "6. useCallback을 이용한 렌더링 최적화",
    explanation: [
      "addUser함수를 useCallback을 통해 메모이제이션할 수 있습니다. dependencies가 변경될 때에만 함수를 새로 생성합니다.",
      "개발자 도구 콘솔창을 키고 input에 아무 내용이나 타이핑을 해보세요.",
      "UserList 컴포넌트가 리렌더링 되어도 addUser 함수는 useCallback으로 인해 재생성되지 않기 때문에 Button컴포넌트에 전달되는 함수는 변경되지 않습니다.",
      "즉, Button 컴포넌트의 props에는 변화가 없으므로 Button 컴포넌트의 리렌더링은 발생하지 않습니다.",
    ],
  }),
  new Page({
    title:
      "7. state를 이용해 새로 정제하여 만든 객체를 props로 전달하는 것은 하지 말아야 합니다.",
    explanation: [
      "이번에는 UserList에서 getResult 함수를 통해 { grade, comment } 객체를 구해 UserItem의 props로 넘겨주고 있습니다.",
      "그 덕에 UserList가 리렌더링 될 때마다 객체 리터럴로 새 객체가 생성되면서 UserItem이 리렌더링 되고 있습니다. (앞서 적용한 모든 렌더링 최적화 기법이 적용되었음에도 말이죠)",
      "grade, comment는 score에 의존적인 값이므로 굳이 state로 따로 선언해줄 필요는 없습니다. 하지만 그렇다고 UserList가 리렌더링 될 때마다 매번 새로 객체를 생성하는 것도 안좋아 보입니다.",
      "개발자 도구 콘솔창을 키고 input에 아무 내용이나 타이핑을 해보세요.",
    ],
  }),
  new Page({
    title:
      "7. state를 이용해 새로 정제하여 만든 객체를 props로 전달하는 것은 하지 말아야 합니다.",
    explanation: [
      "해결책은 grade와 comment를 구하는 함수는 useCallback을 이용해 UserItem의 props로 전달하거나 UserItem내부에서 선언해주고, score만 props로 정확히 전달해주는 것입니다.",
      "이 예제의 경우 getResult는 UserItem에서만 사용하는 함수이므로 UserItem에서 선언해 사용하겠습니다.",
      "정확히는 UserItem.js에서 UserItem컴포넌트 밖에 선언하려고 합니다. 이렇게 하면 UserItem에서 해당 함수를 참조할 수 있으면서, UserItem이 리렌더링할 때마다 해당 함수를 재생성하는 것도 막을 수 있습니다.",
      "개발자 도구 콘솔창을 키고 input에 아무 내용이나 타이핑을 해보세요.",
    ],
  }),
];

export default pages;
