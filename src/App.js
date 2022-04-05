import {useEffect, useRef} from "react";
import io from "socket.io-client";
import "./index.css";
import Registration from "./pages/Registration";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsersGET, setAuth, setCurrentUser, setCurrentUserId, setToken} from "./store/actions";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link, Redirect
} from "react-router-dom";
import Authorization from "./pages/Authorization";
import Main from "./pages/Main";
import jwt_decode from "jwt-decode";

function App() {
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.main.isAuth);
	const token = useSelector(state => state.main.token);
	const users = useSelector(state => state.user.users);
	const currentUserId = useSelector(state => state.user.currentUserId);
	const socketRef = useRef(null);

	useEffect(() => {
		// создаем экземпляр сокета, передаем ему адрес сервера
		// и записываем объект с названием комнаты в строку запроса "рукопожатия"
		// socket.handshake.query.roomId
		// socketRef.current = io(SERVER_URL);

		// отправляем событие добавления пользователя,
		// в качестве данных передаем объект с именем и id пользователя
		// socketRef.current.emit("connection",{
		//   query: { "roomId": "asd" },
		//   test: "asd"
		// });

		// обрабатываем получение списка пользователей
		// socketRef.current.on("users", (users) => {
		//   // обновляем массив пользователей
		//   // setUsers(users);
		// });

		// отправляем запрос на получение сообщений
		// socketRef.current.emit("message:get");

		// обрабатываем получение сообщений
		// socketRef.current.on("messages", (messages) => {
		//   // определяем, какие сообщения были отправлены данным пользователем,
		//   // если значение свойства "userId" объекта сообщения совпадает с id пользователя,
		//   // то добавляем в объект сообщения свойство "currentUser" со значением "true",
		//   // иначе, просто возвращаем объект сообщения
		//   const newMessages = messages.map((msg) => (msg.userId === userId ? { ...msg, currentUser: true } : msg));
		//   // обновляем массив сообщений
		//   setMessages(newMessages);
		// });

		return () => {
			// при размонтировании компонента выполняем отключение сокета
			// socketRef.current.disconnect();
		};
	}, []);

	return (
		<div className="App">
			<Router>
				{isAuth
					?
					<Switch>
						<Route exact path="/">
							<Main/>
						</Route>
						<Redirect to={"/"}/>
					</Switch>
					:
					<Switch>
						<Route exact path="/registration">
							<Registration/>
						</Route>
						<Route exact path="/login">
							<Authorization/>
						</Route>
						<Redirect to={"/registration"}/>
					</Switch>
				}
			</Router>,
		</div>
	);
}

export default App;
