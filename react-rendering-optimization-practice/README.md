# React rendering optimization example and practice 👍

### 이젠 최적화를 고려해야할 때

항상 지금까지는 기능 구현에만 초점을 두었다.이제 웹 어플리케이션의 어느정도 기능은 구현할 수 있는 상태이며 최적화를 깊게 공부해보는 시간을 가졌다.

## 서론

이 글은 함수형 컴포넌트, 클래스형 컴포넌트 상관없이 공통적으로 적용되는 렌더링 최적화 이야기와 hooks를 사용하는 함수형 컴포넌트에서 구체적으로 어떤 기능들을 사용해 렌더링 최적화를 사용할 수 있는지를 작성해봤습니다. 클래스형 컴포넌트에서의 구체적인 기능들은 다루지 않습니다.


## 1. state 선언하는 위치 상위 컴포넌트 ? 하위 컴포넌트 ?

리액트는 특정 state가 변경되면 그 state가 선언된 컴포넌트와 그 하위 컴포넌트들을 모두 리렌더링 시킵니다. 따라서 state가 선언되는 위치를 잘 설계하는 것은 리렌더링 횟수에 엄청난 영향을 끼칩니다. 기본적으로 state의 선언위치는 이렇습니다. 해당 state를 사용하는 컴포넌트들을 잘 구분해놓은 뒤 그 컴포넌트들 중 가장 최상위 컴포넌트에 선언합니다. 만약 그 state를 사용하는 최상위 컴포넌트보다 더 상위 컴포넌트에 state를 선언하면 state를 사용하지 않는 더 많은 컴포넌트들이 state변경에 의해 불필요한 리렌더링을 겪게 됩니다.
폭포수 처럼 state 랜더링이 흐릅니다.

예를 들어 다음과 같은 컴포넌트 구조가 있다고 합시다.

```
Index
ㄴGroup
ㄴUserList
  ㄴUserItem
```

UserList와 UserItem에서만 사용되는 users state가 있습니다. 이 데이터는 두 컴포넌트(UserList,UserItem)에서만 사용하기 때문에 그 중 가장 상위 컴포넌트인 UserList에 선언해야 합니다.
어떤 state를 사용하는 컴포넌트 중에 가장 상위 컴포넌트입니다.


```javascript
- UserList.js
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

```

그런데 만약 이 users state를 UserList보다 더 상위 컴포넌트인 Index에 선언하면 어떻게 될까요?



users state가 변경되면 index.js가 리렌더링되고 그 하위 컴포넌트가 모두 리렌더링 됩니다. 이에 따라 이전과 다르게 users 데이터를 사용하지 않는 Index컴포넌트와 Group 컴포넌트까지 리렌더링이 발생하게 됩니다. 바람직하지 않죠.
이 때 저는 Index 만 리렌더링 된다고 생각했는데 당연히 Index 의 하위 컴포넌트인 Group 까지 리랜더링 되므로, 비효율적입니다.



## 2. 객체 타입의 state 는 최대한 분할하여 선언합니다.

제목만 보면 잘 이해가 안되실 수 있습니다.

객체가 크고 복잡한 구조인 경우 분할할 수 있는 만큼 최대한 분할하는 것이 좋습니다.
해당 state에서 일부의 프로퍼티만 사용하는 하위 컴포넌트가 있다면, 그 컴포넌트는 해당 프로퍼티가 변경될 때에만 리렌더링 되는 것이 바람직합니다.
만약 복잡한 객체로 선언된 state를 분할하지 않으면, 하위 컴포넌트가 사용하지 않는 다른 프로퍼티의 값이 업데이트될 때에도 리렌더링이 발생하므로 렌더링 최적화의 대상이 됩니다.



이전 예제에서 group data까지 state로 관리해봅시다.

다음과 같은 타입의 state를 가장 상위 컴포넌트인 index.js에 선언할 수 있습니다.


```javascript
- index.js

import { useState } from "react";

import Group from "components/section/examples/example3/Group";
import UserList from "components/section/examples/example3/UserList";

function Example3() {
  const [state, setState] = useState({
    group: {
      name: "coco",
      description: "rendering optimization pracitice",
    },
    users: [
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
    ],
  });

  return (
    <div>
      <Group group={state.group} />
      <UserList
        users={state.users}
        setUsers={newUsers => {
          setState({ ...state, users: newUsers });
        }}
      />
    </div>
  );
}

export default Example3;
```


여기서 만약 users 배열에 원소가 하나 추가되면 어떻게 될까요?

users데이터를 이용하는 UserList는 리렌더링되어야 합니다. 그런데 굳이 users데이터를 이용하지 않는 Group 컴포넌트까지도 state변경으로 인해 리렌더링 될 수 있습니다.



이번엔 group state와 users state를 나눠서 선언해보겠습니다.

```javascript
- index.js

import { useState } from "react";

import Group from "components/section/examples/example4/Group";
import UserList from "components/section/examples/example4/UserList";

function Example4() {
  const [group] = useState({
    name: "coco",
    description: "rendering optimization pracitice",
  });
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

  return (
    <div>
      <Group group={group} />
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
}

export default Example4;


```


이렇게 나눈 후 다시 users 배열에 원소를 하나추가하는 경우 어떻게 될까요?

이전과 마찬가지로 users state변화로 인해 index 컴포넌트가 리렌더링되고 이에 따라 하위 컴포넌트들이 리렌더링 되면서 Group컴포넌트까지도 리렌더링이 됩니다. 그러면 굳이 이렇게 state를 분할해야하는 이유는 무엇일까요?

그건 바로 이렇게 분할함으로써, 구조적으로 group state는 Group 컴포넌트에서만 사용하고, users state는 UserList 컴포넌트에서만 사용한다는 것이 명확하게 보이게 되고(가독성), 더 하위컴포넌트에 내려서 선언해야 할 필요성을 알게 되는 데에 의의가 있습니다. 우리는 state객체를 두개로 분할함으로써, 더 나은 설계를 할 수 있게 되었습니다. 그렇게 한 코드가 가장 첫 예시와 같습니다.


## 3. React.memo를 이용한 컴포넌트 메모이제이션 방법

>React.memo 는 useMemo 와 같지 않다는 것을 주의하셔야합니다 React.memo 는 HOC 이고, useMemo 는 hook 입니다!


React.memo는 컴포넌트를 래핑하여 props를 비교하여 리렌더링을 막을 수 있는 메모이제이션 기법을 제공하는 함수입니다. React.memo는 Hook이 아니기 떄문에 클래스형 컴포넌트에서도 사용할 수 있습니다. 함수형 컴포넌트에서는 shouldComponentUpdate를 사용할 수 없는데 리액트 공식 문서에서는 그 대안으로 React.memo를 제시하고 있습니다. React.memo는 콜백함수를 이용해 메모이제이션을 적용할지 여부를 판단할 수도 있습니다.

이번에는 Group이 없는 더 단순한 컴포넌트 구조의 예시를 봅시다.

```javascript
Index
ㄴUserList
  ㄴUserItem
```



React.memo를 이용해 UserList의 길이가 변할 때(UserList 라는 객체배열에 하나의 객체가 더 추가될 때) 새로 변경된 UserItem만 렌더링하고 기존에 이미 렌더링된 UserItem들은 리렌더링 되지 않도록 만들어봅니다. ( 기존의 length 가 5개인데 6개가 되면 리렌더링 되지 않도록)

```javascript
- UserList.js

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
```


```javascript
- UserItem.js

import React from "react";

function UserItem({ user }) {
  console.log(`UserItem (id: ${user.id}) component render`);

  return (
    <div className="user-item">
      <div>이름: {user.name}</div>
      <div>나이: {user.age}</div>
      <div>점수: {user.score}</div>
    </div>
  );
}

export default React.memo(UserItem);
```


메모이제이션 기법을 적용했으므로 새 유저 생성 버튼을 눌러 users배열의 길이를 변화시켜 UserList.js를 리렌더링 시키더라도 새로 추가된 UserItem만 새로 렌더되고 이미 렌더된 UserItem들은 리렌더링 되지 않습니다.

## 4. 컴포넌트를 매핑할 때에는 key값으로 index를 사용하지 않습니다.

항상 제가 .. 이래왔던것 같습니다.. 학부 강의를 들을 때에도 교수님이 고유한 수를 생성해내는 것도 꽤 expensive 하다고 하신 것이 기억이납니다.
DB 에서 고유한 id 가 있다면, 굳이 front 에서 또 한번 만들필요가 없다는 것은 당연하기도 하죠

리액트에서 컴포넌트를 매핑할 때에는 반드시 고유 key를 부여하도록 강제하고 있습니다. 저는 얼마 전까지만 해도 key값으로 배열의 index값을 버릇처럼 넣었었는데 어느날 이게 얼마나 안좋은 습관인지 알게되었습니다. 어떤 배열에 중간에 어떤 요소가 삽입되면 그 중간보다 이후에 위치한 요소들은 전부 인덱스가 변경됩니다. 이로 인해 key값이 변경되고 리마운트가 일어나게 되죠. 또한, 데이터가 key와 매치가 안되어 서로 꼬이는 부작용도 발생합니다.

이번에는 UserList에서 UserItem을 매핑할때 key에 users 배열의 index를 넣어주고, 배열의 맨 앞에 원소를 추가하는 버튼을 만들어봅니다.

```javascript
- UserList.js

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
    setUsers([ // 앞에 아이템을 추가합니다 인덱스가 꼬입니다,,
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
```

배열의 맨 앞에 아이템 추가 버튼을 눌러봅니다.

기존에 key=0과 key=1에 매치되어있던 UserItem 컴포넌트들이 연결이 끊기고 각각 key=1, key=2에 새로 매치됩니다. 이로 인해 UserItem에는 메모이제이션이 적용되었음에도 불구하고 key값이 달라졌기 때문에 새로 마운트 됩니다. 즉, 메모이제이션이 쓸모가 없어지는 것이죠.



그런데 key값에 고유 id를 넣어주면, 배열의 중간에 어떤 요소가 삽입되더라도 기존에 있는 원소들이 가지고 있는 key가 끊어질 위험이 없습니다.

이번 섹션에 대한 전체 예시코드는 Example6 과 Example7 에서 볼 수 있습니다.


## 5. useMemo ❤



만약 컴포넌트 내에 어떤 함수가 값을 리턴하는데 많은 시간을 소요한다면 이 컴포넌트가 리렌더링 될 때마다 함수가 호출되면서 많은 시간을 소요하게 될 것입니다. 그리고 그 함수가 반환하는 값을 하위 컴포넌트가 사용한다면 그 하위 컴포넌트는 매 함수호출마다 새로운 값을 받아 리렌더링할 것입니다. useMemo는 종속 변수들이 변하지 않으면 함수를 굳이 다시 호출하지 않고 이전에 반환한 참조값을 재사용합니다. 즉, 함수 호출 시간도 세이브할 수 있고 같은 값을 props로 받는 하위 컴포넌트의 리렌더링도 방지할 수 있습니다.

useMemo 는 값을 리턴한다는것을 기억합시다.
굳이 다른게 바꼈는데 이게 다시 계산돼? 라는 마음입니다.


이번에는 Average 컴포넌트를 추가해보겠습니다.


```javascript
Index
ㄴUserList
  ㄴAverage
  ㄴUserItem
```


Average는 유저들의 평균점수를 출력하고 싶습니다. users데이터가 변할 때마다 새로 평균값을 계산하여 Average에 평균값을 전달하는 방식입니다.

```javascript
- UserList.js

import { useState } from "react";

import Average from "components/section/examples/example8/Average";
import UserItem from "components/section/examples/example8/UserItem";
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

  const average = (function () {
    console.log("calculate average. It takes long time !!"); // 오랜시간이 걸린다고 생각합시다

    return users.reduce((result, user) => {
      return result + user.score / users.length;
    }, 0);
  })();

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
      />
      <Average average={average} />
      {users.map(user => {
        return <UserItem key={user.id} user={user} />;
      })}
    </div>
  );
}

export default UserList;
```


이 예제에서 평균값을 구하는 함수는 간단한 함수이지만, 실제로 이 평균값을 구하는 연산이 엄청 오랜 시간이 걸린다고 가정해봅시다. 그러면 UserList 컴포넌트가 리렌더링 될 때마다 매번 이 비싼 연산을 수행해야만 합니다. 비효율적이죠 최적화가 필요합니다.



조금더 와닿는 예제가 되기 위해 input 태그를 추가했습니다. input에 텍스트를 입력할때마다 text state가 변화하도록 했습니다. 텍스트를 마구마구 입력해보세요. 그때마다 average를 매번 새로구하고 있습니다.



이제 useMemo를 적용해보겠습니다. 이것을 적용하면 dependencies에 있는 데이터가 변할 때에만 평균을 구하는 연산을 수행하도록 할 수 있습니다. dependencies에는 users state를 넣어줄 것입니다. 그러면 input에 아무리 텍스트를 입력하여 text state를 변화시키더라도 average를 구하는 함수는 실행되지 않습니다.

```javascript
 const average = useMemo(() => {        // input 이 아무리 변해도 이건 다시 계산되지 않는다
    console.log("calculate average. It takes long time !!");
    return users.reduce((result, user) => {
      return result + user.score / users.length;
    }, 0);
  }, [users]);
```


이제 useMemo를 이용해 불필요한 함수의 재실행은 방지했습니다. 하지만 그래도 input에 타이핑할 때마다 UserList가 리렌더링되고 그에 따라 하위컴포넌트인 Average 컴포넌트도 리렌더링됩니다. average를 구하는 연산을 수행하지 않았는데도 불필요하게 말이죠. 따라서 Average 컴포넌트에 React.memo를 이용해 메모이제이션을 적용해줍니다.

Average 는 자신이 받는 props average 가 변할 때만 리랜더링 되도록 처리해줄겁니다!

```javascript
- Average.js

import React from "react";

function Average({ average }) {
  console.log("Average component render");

  return <div>평균: {average}</div>;
}

export default React.memo(Average);
```

자 이제 users state가 변할때에만 average 구하는 함수가 수행되고 average값이 바뀌었을 때에만 Average 컴포넌트가 리렌더링됩니다.



이번 섹션에 대한 전체 예시코드는 Example8, Example9, Example10 에서 볼 수 있습니다.

## 6. useCallback 😎

useCallback도 같은 매커니즘으로 렌더링 최적화에 활용할 수 있습니다. 상위 컴포넌트에서 하위컴포넌트로 함수를 props로 넘겨줄 때 상위 컴포넌트가 리렌더링 될 때마다 상위 컴포넌트 안에 선언된 함수를 새로 생성하기 때문에 그때마다 새 참조 함수를 하위 컴포넌트로 넘겨주게 됩니다. 이에 따라 하위 컴포넌트도 props가 달라졌으므로 또다시 리렌더링 하게 되는 것이죠. 그러나 useCallback으로 함수를 선언해주면 종속 변수들이 변하지 않으면 굳이 함수를 재생성하지 않고 이전에 있던 참조 변수를 그대로 하위 컴포넌트에 props로 전달하여 하위 컴포넌트도 props가 변경되지 않았다고 인지하게 됩니다. 이에 따라 하위 컴포넌트의 리렌더링을 방지할 수 있습니다.



이번에는 Button 컴포넌트에 React.memo를 적용시켰습니다. Button 컴포넌트는 onClick 함수를 props로 받습니다. 마찬가지로 React.memo 랑 같이 써야 시너지 효과가 좋습니다.

```javascript
- Button.js

import React from "react";

function Button({ value, className, disabled, onClick, logRender }) {
  if (logRender) {
    console.log("Button component render");
  }

  return (
    <button
      type="button"
      className={`${className} btn btn-light`}
      disabled={disabled}
      onClick={event => {
        event.preventDefault();
        onClick && onClick();
      }}>
      {value}
    </button>
  );
}

export default React.memo(Button);
```

그리고 onClick 함수는 UserList에서 전달해주고 있습니다.

UserList는 input에 타이핑을 할때마다 리렌더링이 발생합니다. (이전 예제 참고)

그런데 리렌더링마다 addUser라는 함수를 새로 생성하여 Button 컴포넌트에 props로 전달해주고 있습니다. 이에 따라 Button 컴포넌트도 같이 덩달아 리렌더링 되는 것이죠.

`아무리 Button 컴포넌트에 메모이제이션을 적용해도 소용없습니다. 왜냐하면 함수는 객체이고 새로 생성된 함수는 다른 참조 값을 가지기 때문에 Button 입장에서는 새로 생성된 함수를 받을 때 props가 변한 것으로 인지합니다.`



그래서 UserList가 리렌더될때마다 addUser함수를 재생성하는 것을 막고싶습니다. 이때 useCallback을 사용하면 됩니다.

```javascript
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
```
input에 타이핑을 마구 해보세요. 이제 UserList가 리렌더되어도 Button 컴포넌트는 props에 변화가 없으므로 리렌더링되지 않습니다.
즉, 같은 함수객체를 참조합니다^^



이번 섹션에 대한 전체 예시코드는 Example11, Example12 에서 볼 수 있습니다.


## 결론



리액트는 단방향 하향식 데이터 흐름을 가지고 있습니다. 즉, 데이터는 부모 컴포넌트에서 자식 컴포넌트 방향으로 흘러갑니다. 이 데이터들(props, state)의 변화는 컴포넌트를 리렌더링시킵니다. state는 그것이 선언된 컴포넌트 내에서 사용되고, props는 부모 컴포넌트로부터 받은 데이터입니다.



따라서, 이미 만들어진 프로젝트에서의 렌더링 최적화는 첫째, state와 props의 변경을 최소화하는 것과 둘째, state와 props의 변경에 의해 불필요한 하위 컴포넌트 리렌더링을 최소화하는 것 두 가지 방향으로 진행됩니다.



이미 만들어지지 않은 프로젝트에서의 렌더링 최적화는 프로젝트 설계가 중요합니다. UI측면에서는 아토믹 디자인을 적극적으로 활용하여 컴포넌트 구조를 명확하고 직관적이고 최소화시키는 것이 좋습니다. 이것을 잘하면 컴포넌트 리렌더링 횟수는 획기적으로 줄일 수 있고 구조 자체가 명확하기 때문에 코드도 쉬워지고 유지보수성도 월등하게 좋아집니다. 데이터 측면에서는 state의 적절한 설계, API 설계가 중요하게 작용합니다. state에서는 UI에서 사용하기 편리한 데이터 구조를 선언하는 것이 좋습니다. API도 화면기획을 기반으로 의미론적으로 잘 분리된 형태로 쪼개서 만들어야 컴포넌트에서 API로  요청할 때, 불필요한 데이터를 응답데이터로 받지 않고 필요한 데이터만 적절하게 받아 리소스와 로직 낭비를 하지 않을 수 있습니다.





### 참조자료

- [cocoder16](https://cocoder16.tistory.com/36) 님의 리액트 렌더링 최적화하는 8가지 방법과 고찰 글에 의존되어있습니다.