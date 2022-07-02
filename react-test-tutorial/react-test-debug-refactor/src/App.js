import React, { useState, useEffect } from "react";
import WeekdaySelect from "./WeekdaySelect";
import PostsTable from "./PostsTable";
import api from "./api";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function groupPostsByWeekday(posts) {
  return posts.reduce((postsByWeekday, post) => {
    const day = new Date(post.createdAt).getDay();
    const weekday = weekdays[day];
    return {
      ...postsByWeekday,
      [weekday]: (postsByWeekday[weekday] || []).concat(post),
    };
  }, {});
}

function App() {
  const [postsByWeekday, setPostsByWeekday] = useState([]);
  const [selectedWeekday, setSelectedWeekday] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getPosts().then((posts) => {
      const groupedPosts = groupPostsByWeekday(posts);
      setPostsByWeekday(groupedPosts);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Posts in /r/reactjs per weekday</h1>

      <WeekdaySelect
        weekdays={weekdays}
        selectedWeekday={selectedWeekday}
        setSelectedWeekday={setSelectedWeekday}
      />

      {isLoading && <div>Loading...</div>}

      {!isLoading && selectedWeekday && (
        <PostsTable posts={postsByWeekday[selectedWeekday]} />
      )}
    </div>
  );
}

export default App;
