import {
	Alert,
	Button
} from "@mui/material";
import Window from "../shared/window/Window";
import useInput from "../hooks/useInput";
import InputText from "../shared/UI/inputs/InputText";
import {fetchLoginPOST} from "../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {Container, Flex, Form, LinkText} from "../style/style";
import isValid from "../helpers/isValidField";
import {Link} from "react-router-dom";
import {loginPattern, passwordPattern} from "../helpers/constants";
import AlertError from "../shared/UI/alerts/AlertError";

function Authorization() {
	const dispatch = useDispatch();
	const isLoginError = useSelector(state => state.login.isError);
	
	const login = useInput("", loginPattern);
	const password = useInput("", passwordPattern);

	function onSubmitLogin(e) {
		e.preventDefault();

		if (isValid(login) && isValid(password)) {
			const data = {
				login: login.value,
				password: password.value,
			};

			dispatch(fetchLoginPOST(data));

			login.setValue("");
			password.setValue("");
		}
	}

	return (
		<Container>
			<Window title={"Авторизация"}>
				{isLoginError && <AlertError title={"Ошибка авторизации!"} isActive={isLoginError} />}
				<Form onSubmit={onSubmitLogin}>
					<InputText field={login} label="Логин" errorText={"Невалидный логин!"} variant={"outlined"}/>
					<InputText field={password} label="Пароль" errorText={"Невалидный пароль!"} variant={"outlined"}/>
					<Button variant="contained" type={"submit"}>Войти</Button>
				</Form>
				<Flex>
					<Link to={"/registration"}>
						<LinkText>Зарегистрироваться</LinkText>
					</Link>
					<Link to={"/registration"}>
						<LinkText>Забыл пароль?</LinkText>
					</Link>
				</Flex>
			</Window>
		</Container>
	);
}

export default Authorization;