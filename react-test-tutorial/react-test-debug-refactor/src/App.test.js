import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import mockPosts from "./__mocks__/mockPosts.json";

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
    const { getByText, getByRole, getAllByRole } = render(<App />);

    const weekdayButton = getByText(weekday);
    fireEvent.click(weekdayButton);

    const day = weekdays.indexOf(weekday);
    const postIndex = mockPosts.findIndex((post) => getPostDay(post) === day);

    getByRole("table");
    const rows = getAllByRole("row");

    for (let i = 0; i < rows.length; i += 1) {
      const post = mockPosts[postIndex + i];
      getByText(post.author);
      getByText(post.title);
      getByText(post.score.toString());
    }
  }
);
