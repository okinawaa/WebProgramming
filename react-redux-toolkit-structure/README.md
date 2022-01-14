# REDUX TOOLKIT USAGE WITH TYPESCRIPT


### 동기
리액트로 꽤 다양한 프로젝트를 진행했지만, 항상 쓰던 기술만 사용했었다. 항상 `useEffect` , `useState` hook 으로만 상태관리를 하였기 때문에 처음에는 쉽고 코드가 깔끔해도 점점 프로젝트가 커지면 커질수록 나의 코드를 팀원이 봤을때 이해할거라는 확신이 없었다. 그렇게 `Redux` 를 배워야겠다고 생각하는 찰나에 체계화 되어있는 팀에서 Instagram Clone Coding 프로젝트를 진행하게 되었고 Redux Toolkit 을 사용하기로하여 사용법을 익혀보았다. 

### Folder Structure

```
./app/store
├── ducks
│   ├── auth
│   │   ├── authSlice.ts // slice
│   │   ├── authThunk.ts // thunk
│   │   ├── authThunk.type.ts // thunk의 request type 선언
│   │   └── index.js // import, export를 편하게 하기 위한 파일
│   ├── community
│   │   ├── communitySlice.ts
│   │   ├── communityThunk.ts
│   │   └── index.js
│   ├── persist
│   │   ├── index.js
│   │   └── persistSlice.ts
│   ├── reservation
│   │   ├── index.js
│   │   ├── reservationSlice.ts
│   │   └── reservationThunk.ts
│   └── root
│       ├── index.js
│       └── rootSlice.ts
├── hooks.ts
├── index.ts
└── rootReducer.ts
```

Ducks Pattern

리덕스를 사용하기 위해선 항상 actionTypes, actions, reducer 이 셋을 다함께 추가해야하고, (redux 튜토리얼대로 한다면) actions와 reducer를 다른 파일에서 관리하지만 거의 대부분 actions와 reducer는 하나의 짝이 돼서 함께 동작합니다.

그렇기에 actionTypes, actions, reducer를 한 곳으로 모아 하나의 모듈로 관리하자는 것이 Ducks Pattern의 핵심입니다.

참고로 Ducks Pattern의 이름의 유래는 다음과 같습니다.

```Java has jars and beans. Ruby has gems. I suggest we call these reducer bundles “ducks”, as in the last syllable of “redux”.```


### Thunk 만들기


자신의 모듈의 폴더에 <모듈이름>Thunk.ts 파일을 만듭니다.

다음과 같이 작성해주세요.

아래 예제는 비동기 처리할 경우에 유용한 예제입니다. 비동기 처리가 아니라 순수함수/ 동기적 함수는 기본 redux 처럼 reducer 에서 처리해 줍니다.
```tsx
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunkFunctionName = createAsyncThunk<
	responseType, 
	payloadType
>("prefix", (payload, ThunkOptions) => {
	// Todo Something
})
```

createAsyncThunk 메소드를 통해서 함수를 선언합니다. 

어떤 payload를 받아서 요청을 처리할 것인지 최종 반환해야 하는 타입은 어떤 타입인지를 명시해줍니다. 
이때 타입의 순서는 반환타입부터 그리고 payload 의 타입을 선언합니다.

다음은 [reqres.in](http://reqres.in) 의 로그인을 활용한 더미 로그인 예제 입니다.

![image](https://user-images.githubusercontent.com/69495129/149430744-507fb0c6-aaa6-4cbb-8d4e-2df9e3ec5dc9.png)

이메일과 비밀번호를 payload로 넘겨주면

token이 담긴 data 가 온다는 것을 알 수 있습니다.

```tsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const signIn = createAsyncThunk<
	{
		"token": string
	}, 
	{
		"email": string,
		"password": string
	}
>("auth/signIn", async (payload, ThunkOptions) => {
	try {
		const { data } = await axios.post("https://reqres.in/api/login", payload);
		return data;
	}
	catch (error) {
		return ThunkOptions.rejectWithValue(error);
	}	
})
```

위 작업을 타입 선언을 나누게 되면 다음과 같아집니다.

```tsx
export interface SignInRequestType {
	email: string;
	password: string;
}

export interface SignInResponse {
	token: string
}
```

### 데이터 저장하기, 불러오기, 에러처리하기

해당 모듈의 slice 파일을 엽니다. 현재 home 모듈이라면 `homeSlice` 가 될 것입니다!

```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn } from './authThunk';

export interface stateType {
  loading: boolean;
  error: boolean;
	token: string;
}

const initialState: stateType = {
  loading: false,
  error: false,
	token: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: build => {
    build     // 세가지 상태 존재
			// start
      .addCase(signIn.pending, state => {
        state.loading = true;
				state.error = false;
      })
			// end
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
			// error 
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
```

`extraReducers` 를 통해서 해당 thunk 가 실행될 때 state를 변화시킬 수 있도록 각각의 case 를 선언할 수 있습니다. 

promise 에서의 3가지 상태를 생각하면 이해하기 편합니다!

pending case 일 때는 요청을 보내고 응답이 오기 전까지의 상태라 loading 을 true 로 변화시켜주고 error 상태를 초기화 시켜주었습니다.

fulfilled case 일 때는 요청에 대한 응답이 온 것이기 때문에 loading 을 false 로 변화시켜주고 응답으로 온 값을 

담아주었습니다.

### 컴포넌트에서 thunk 실행시키기

useAppDispatch를 통해 reducer의 함수를 실행시키는 과정과 똑같습니다.

useAppDispatch 와 useAppSelector 를 hooks 폴더에 미리 선언해두는것은 엄청난 도움이 됩니다. 자주사용됩니다 Typescript 와 redux toolkit 을 사용할때

```tsx
// hooks.ts

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

```

```tsx
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { signIn } from '~/store/ducks/auth/authThunk';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();      // hooks 폴더에서 선언한거 사용

  const { loading, error, token } = useAppSelector(({ auth }) => auth);

	// useCallback으로 최적화 작업을 해주셔도 됩니다.(하는 것을 권장)
  const handleSignIn = async () => {
			await dispatch(signIn({ email, password }); // 부르자! 
	  );
  };
	// Some TSX...
}
```


### Trouble shotting 

위 예제처럼 createAsyncThunk 를 통해서 순수 상태만 변경시켜주려는 경우 응답하지 않는 문제가 발생했다.
자문을 구한결과 `extrareducer` 는 비동기 함수만 처리하고 기본 순수함수/동기함수 같은 경우는 일반적으로 reducer 에서 처리하면 된다고 한다.
예를 들면 일반적으로 boolean 값을 변화시켜서 모달을 보여주고 모달을 숨기고 하는걸 `redux` 에서 처리한다고 하겠다.

![image](https://user-images.githubusercontent.com/69495129/149431361-a79a0bea-ed48-4593-9177-b6e9e5ba8d30.png)

위 사진은 보는것과 같이 reducers 안에 선언되어있다.
위 두 actions 를 export 시켜주고, 사용할 컴포넌트에서 dispatch(액션이름) 을 수행시켜주면 상태관리가 잘된다! 
넘겨줄 파라미터는 action.payload 로 넘어가서 reducers 내부에서 사용할 수 있다.


### 참조자료
- [김민수님의 디스코드 강의](https://github.com/orgs/Instagram-Clone-Coding/people/minsoo-web)
- [김민수님 폴더구조](https://minsooweb.notion.site/Redux-Toolkit-with-Typescript-51341c42ab164f44ac02509dd65b2b2c#10d2a216dc8d4aba9dadcc2748230edc)
- [김영인님의 리듀서와 엑스트라리듀서 차이 설명](https://github.com/orgs/Instagram-Clone-Coding/people/kimyoungyin)
