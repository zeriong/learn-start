const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos";
let toDos = []; // let 선언하여 바뀐 데이터를 재저장할 수 있도록 한다.

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    /* 로컬스토리지에 "todos" 키를, 제이슨스트링기파이로 문자열로된 변수 toDos 를 셋팅한다
       로컬스토리지에는 스트링형태로만 저장된다. 그래서 스트링기파이를 넣은 것. */
}

function deleteToDo(e) {
    const li = e.target.parentElement;
    li.remove();
    /* e = 삭제버튼요소 -> 타겟.부모요소를 선택해서 li 요소 자체를 remove() 로 삭제해준다.
       버튼이 li 안쪽에 위치하기때문에 부모요소를 선택하면 li 가 선택된다. */

    toDos = toDos.filter((eToDo) => eToDo.id !== parseInt(li.id));
    saveToDos();
    /*이 함수가 실행됐을때 필터를 이용하여 toDos 의 배열에 필터를 건다.
      필터내부에 eToDo 라는 자체변수를 선언해주고(this 와 같다) eToDo.id는 Number 로
      저장되어있고, li.id 는 함수순서 handleToDoSubmit -> saveToDos = JSON.stringify(toDos)
      되었기때문에 String 형태로 있다. 그래서 식이 맞지 아니함으로 parseInt 를 사용하여 같은형식의
      Number 로 만들준다. 그러면 식이 일치하고 filter 가 작동하여 클릭한 녀석을 제외한 아이템들을 배열에
      남긴 후 saveToDos() 를 이용하여 로컬스토리지에 저장한다. 그러면 클릭한 녀석은 로컬스토리지에서
      사라지게 된다.
    */
}

function paintToDo(newTodo){
    const li = document.createElement('li');
    const span = document.createElement('span');
    const btn = document.createElement('button');
    btn.innerText = "X";
    btn.addEventListener('click',deleteToDo);
    li.appendChild(span);
    li.appendChild(btn);
    /* 어펜드차일드는 가장 뒷요소로 배치하기 때문에 순서에 유의하자. */

    li.id = newTodo.id;
    /* paintToDo 에 전달인자에서 가져온 아이디를 li 요소에 똑같이 추가해준다.
      이후 함수 deleteToDo 에서 이용된다. */

    span.innerText = newTodo.text;
    /* 전달인자에서 가져온 값이 오브젝트이기 때문에 오브젝트에서 "text" 키를 가져온다.
      키의 벨류는 String 이다. 그래서 스판에 innerText 가 잘 적용이 되게 만든다. */

    toDoList.appendChild(li);
    /* 투두리스트를 작성하면 가장 밑쪽에 계속 추가된다. */
}

function handleToDoSubmit(e){
    e.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    /* 서브밋 되었을때 함수이므로 서브밋이 되었을때, 빈문자열로 만들어준다. */

    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    /* 일반적인 문자열로는 많은 활용을 할 수 없다. 오브젝트 형태로 만들어
       키와 값을 이용해야 하기때문에 반드시 전달인자는 배열 혹은 오브젝트를 사용하자. */

    toDos.push(newTodoObj);
    /* 투두스 배열에 오브젝트인 뉴투두옵젝을 추가한다. */

    paintToDo(newTodoObj);
    /* 함수 페인트투두에 오브젝트형태의 전달인자를 보내준다. */

    saveToDos();
    /* String 형태로 로컬스토리지에 셋아이템 한다. (대충 저장한다는 뜻) */
}

toDoForm.addEventListener("submit",handleToDoSubmit);
/* 투두리스트의 서브밋 이벤트. */

const savedToDos = localStorage.getItem(TODOS_KEY);
/* "todos" 키를 가져온다. */

if (savedToDos !== null){
    /* savedToDos 에서 가져온 키가 null 이 아니고 한개라도 있다면 */

    const parsedToDos = JSON.parse(savedToDos);
    /* parsedToDos 를 선언하여 savedToDos 의 아이템들을 다시 오브젝트로 변환하여 저장한다.

       기존에 배열 toDos 에 저장되었던건 문자열이다. 로컬스토리지에는 문자열만 저장되기때문에
       문자열로 변환하여 저장했지만, 브라우저가 다시 시작될 경우 빈배열로 시작되기 때문에
       "toDos"를 let 으로 선언했고, 이후 하나라도 데이터가 있다면 다시 배열의 아이템들을
       배치해야 하기때문에 JSON.parse 사용하여 배열화 시키고 아래 작동을 구현시킨다. */

    toDos = parsedToDos;
    /* toDos 스토리지에 있던 문자열 savedToDos 를 배열화 된 parsedToDos 를 저장시킨다. */

    parsedToDos.forEach(paintToDo);
    /* 배열화 된 아이템들에게 함수 paintToDo 를 적용시켜 초기화를 막는다. */
}