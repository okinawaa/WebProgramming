import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";

import App from "./App";
import mockPosts from "./__mocks__/mockPosts.json";

jest.mock("./api");

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getPostDay({ createdAt }) {
  return new Date(createdAt).getDay();
}

// sort posts by weekday (Sunday to Saturday)
mockPosts.sort((a, b) => getPostDay(a) - getPostDay(b));

test.each(weekdays)(
  "shows table containing correct posts for %s",
  async (weekday) => {
    const { getByText, getByRole, getByLabelText, getAllByRole, debug } =
      render(<App />);
    const select = getByLabelText(/Selected weekday/);
    fireEvent.change(select, { target: { value: weekday } });
    const day = weekdays.indexOf(weekday);
    await waitForElementToBeRemoved(() => getByText(/Loading/));
    getByRole("table");

    const rows = getAllByRole("row"); // aria
    const postsForWeekday = mockPosts.filter(
      (post) => getPostDay(post) === day
    );
    postsForWeekday.forEach((post, index) => {
      const row = rows[index + 1];
      within(row).getByText(post.author);
      within(row).getByText(post.title);
      within(row).getByText(post.score.toString());
    });
  }
);
