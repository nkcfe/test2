### [과제] 숙련주차 과제 답

### github link

https://github.com/nkcfe/test2.git

### vercel link

https://test2-tau-amber.vercel.app/

## Q1. 추가하기 버튼을 클릭해도 추가한 아이템이 화면에 표시되지 않음.

Form.jsx에서 onSubmitHandler 호출 시 dispatch함수가 작성이 되어있지않았습니다.
아래 코드를 추가하였습니다.

```
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (todo.title.trim() === "" || todo.body.trim() === "") return;

    // onSubmit 호출 시 dispatch가 없었다.
    const newTodo = {
      id: id,
      title: todo.title,
      body: todo.body,
      isDone: false,
    };
    dispatch(addTodo(newTodo));

    setTodo({
      id: 0,
      title: "",
      body: "",
      isDone: false,
    });
  };
```

## Q2. 추가하기 버튼 클릭 후 기존에 존재하던 아이템들이 사라짐.

우선 initialState에서 todos가 아닌 todo객체를 삭제시켜주었습니다.
다음으로 reducer쪽에서 ADD_TODO가 실행될 경우 todos를 새로운 항목으로 덮어 씌우고
있었습니다. 이를 스프레드 연산자를 작성해 기존항목을 유지하면서 새로운 항목을
추가하는 코드를 추가하였습니다.

```
case ADD_TODO:
  return {
    ...state.todos,
    // ...state.todos로 기존 항목 유지
    todos: [...state.todos, action.payload],
  };
```

## Q3. 삭제 기능이 동작하지 않음.

reducer에 case DELETE_TODO 로직이 구현되어있지 않아 추가하였습니다.

```
// reducer에 delete_todo 추가
case DELETE_TODO:
  return {
    ...state,
    todos: state.todos.filter((todo) => todo.id !== action.payload),
  };
```

## Q4. 상세 페이지에 진입하였을 때 데이터가 업데이트 되지 않음.

1. useSelector에 작성된 코드에 오류가 있었습니다. todo가 아닌 todos로 수정
2. params로 넘겨받은 id와 reducer에서 관리하는 todos에서 id가 같은 항목 가져오는 코드 추가하였습니다.
3. 해당 항목으로 출력하였습니다.

```
// 전체코드
const Detail = () => {
  const dispatch = useDispatch();
  // 일단 todo가 아니라 todos.
  const todos = useSelector((state) => state.todos.todos);

  const { id } = useParams();

  // params로 넘겨받은 id와 reducer의 state에서 일치하는 id 항목 가져오기
  const selectedTodo = todos.filter((todo) => todo.id === id);

  const navigate = useNavigate();

  return (
    <StContainer>
      <StDialog>
        <div>
          <StDialogHeader>
            <div>ID :{selectedTodo[0].id}</div>
            <StButton
              borderColor="#ddd"
              onClick={() => {
                navigate("/");
              }}
            >
              이전으로
            </StButton>
          </StDialogHeader>
          <StTitle>{selectedTodo[0].title}</StTitle>
          <StBody>{selectedTodo[0].body}</StBody>
        </div>
      </StDialog>
    </StContainer>
  );
};

export default Detail;
```

## Q5. 완료된 카드의 상세 페이지에 진입하였을 때 올바른 데이터를 불러오지 못함.

완료된 항목의 상세 페이지 Link에서 params로 넘겨줄 값이 id가 아닌index로 잘못 작성되어있어 수정하였습니다.

```
<StLink to={`/${todo.id}`} key={todo.id}>
  <div>상세보기</div>
</StLink>
```

## Q6. 취소 버튼 클릭시 기능이 작동하지 않음.

취소 onClick 이벤트에 todo.id가 전달되지 않아 reducer로 dispatch 시에 payload가 전달되지 않아 수정하였습니다.

```
<StButton borderColor="green" onClick={() => onToggleStatusTodo(todo.id)} >
  {todo.isDone ? "취소!" : "완료!"}
</StButton>
```
