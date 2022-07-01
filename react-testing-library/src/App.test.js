import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";
import React from "react";
import fetchMock from "jest-fetch-mock";
import mockResponse from "./__mocks__/subreddit-reactjs-response.json";

fetchMock.enableMocks();

function setup() {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
}
describe("Subreddit form", () => {
  test("loads posts and renders them on the page", async () => {
    fetch.once(JSON.stringify(mockResponse));
    setup();

    const subredditInput = screen.getByLabelText("r /");
    userEvent.type(subredditInput, "reactjs");

    const submitButton = screen.getByRole("button", { name: /search/i });
    userEvent.click(submitButton);

    expect(screen.getByText(/is loading/i)).toBeInTheDocument();

    expect(
      await screen.findByText(/Number of top posts: 24/i)
    ).toBeInTheDocument();

    screen.debug();

    expect(fetch).toHaveBeenCalledWith(
      "https://www.reddit.com/r/reactjs/top.json"
    );
  });
});
