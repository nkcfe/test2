const initialState = {
  todos: [
    {
      id: 1,
      title: "리액트",
      body: "리액트를 배워봅시다",
      isDone: false,
    },
    {
      id: 2,
      title: "리액트",
      body: "리액트를 배워봅시다",
      isDone: false,
    },
    {
      id: 3,
      title: "리액트",
      body: "리액트를 배워봅시다",
      isDone: false,
    },
    {
      id: 4,
      title: "리액트",
      body: "리액트를 배워봅시다",
      isDone: false,
    },
  ],
};

console.log(initialState.todos.filter((todo) => todo.id !== 1));
