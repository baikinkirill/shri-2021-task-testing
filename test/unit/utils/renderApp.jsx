import {CartApi} from "../../../src/client/api";
import {customApi} from "./customApi";
import {createMemoryHistory} from "history";
import {initStore} from "../../../src/client/store";
import {Router} from "react-router";
import {Provider} from "react-redux";
import {Application} from "../../../src/client/Application";
import {render} from "@testing-library/react";
import renderer from "react-test-renderer";

export async function renderApp(path = "/", cart = new CartApi(), api = new customApi("/hw/store", {})) {
	const history = createMemoryHistory({
		initialEntries: [path],
		initialIndex: 0
	});

	const store = initStore(api, cart);

	const application = (
		<Router history={history}>
			<Provider store={store}>
				<Application/>
			</Provider>
		</Router>
	);

	return {...render(application), history};
}

export function customRenderer(path = "/", cart = new CartApi(), api = new customApi("/hw/store", {})) {
	const history = createMemoryHistory({
		initialEntries: [path],
		initialIndex: 0
	});

	const store = initStore(api, cart);

	const application = (
		<Router history={history}>
			<Provider store={store}>
				<Application/>
			</Provider>
		</Router>
	);

	return renderer.create(application);
}
