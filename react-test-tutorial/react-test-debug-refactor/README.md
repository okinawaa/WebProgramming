## React 에서 testing library debug and refactor

## 동기

회사에서 진행하는 프로젝트를 유지보수 까지 하게 되었고, 개발 완료 일정상 TDD를 진행하진 못했지만, 기능 확장성, 유지보수를 용이하게 하기 위해서 해당 웹사이트에 해당하는 테스트코드를 구현하고자 하였다. 이때 어떠한 부분을 프론트엔드에서 테스트 해야하는지 그리고 어떻게 테스트하는지를 배우기 위해서 한 튜토리얼을 진행하고자 하였다. 테스트 코드를 작성하는 법을 배우면서 디버깅과 리팩토링을 어떻게 하는지 학습함을 통해 더욱 빠른 개발 속도를 얻고자 함에 있다.

## 배운점

- 테스트 코드 내부에서 돔을 확인하는 방법(개발자 도구 필요 X)
  - 암흑 속에서 구현하지 말자!
- 한 요소가 사라질때까지 기다리는 방법(loading)
- testing-library 의 within method
  - 특별한 컨테이너 없이 사용될 수 있음.

example

```
import {render, within} from '@testing-library/react'

const {getByText} = render(<MyComponent />)
const messages = getByText('messages')
const helloMessage = within(messages).getByText('hello')
```

[Inside a dev's mind - Refactoring and debugging a React test ](https://jkettmann.com/refactoring-and-debugging-a-react-test) 를 참조하여 연습 진행하였습니다.
