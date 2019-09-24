// counter.test.js
import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import reducer, { initialState } from "../store/reducer";
import App from "../App";
import Search from "../components/Search";
import { async } from "q";

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, applyMiddleware(thunk)) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

test("Loader appears with 3 or more letters", () => {
  const { getByPlaceholderText, queryByRole } = renderWithRedux(<App />);
  const input = getByPlaceholderText(/Search your favorite cocktail/i);
  fireEvent.change(input, { target: { value: "gi" } });
  expect(queryByRole("loader")).toBeNull();
  fireEvent.change(input, { target: { value: "gin" } });
  expect(queryByRole("loader")).toBeTruthy();
});

test("Clear button", async () => {
  const { getByPlaceholderText, queryByTestId, getByTestId } = renderWithRedux(
    <Search />
  );

  const input = getByPlaceholderText(/Search your favorite cocktail/i);
  const button = queryByTestId("clear");

  expect(button).toBeNull();

  fireEvent.change(input, { target: { value: "gi" } });
  expect(await waitForElement(() => getByTestId("clear"))).toBeTruthy();

  fireEvent.click(await waitForElement(() => getByTestId("clear")));

  expect(input).toHaveProperty("value", "");
});

test("List render data", async () => {
  const { getByPlaceholderText, getByTestId } = renderWithRedux(
    <App />
  );

  const input = getByPlaceholderText(/Search your favorite cocktail/i);
  fireEvent.change(input, { target: { value: "gin" } });
  expect(await waitForElement(() => getByTestId("drink-list"))).toBeTruthy();
});
