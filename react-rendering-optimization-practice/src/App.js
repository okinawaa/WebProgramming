import { useState, useMemo, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./App.css";
import Button from "components/atom/Button";
import Section from "components/section";
import pages from "config/pages";

function App() {
  const history = useHistory();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const page = history.location.pathname.split("/")[1];
    if (page === "") {
      history.push("/0");
      setPage(0);
    } else {
      setPage(Number(page));
    }
  }, [history]);
  const maxPage = useMemo(() => pages.length - 1, []);

  return (
    <div id="main">
      <Button
        value="이전"
        className="navigation-button"
        disabled={page === 0}
        onClick={() => {
          history.push(`/${page - 1}`);
          setPage(page - 1);
        }}
      />
      <Section page={page} />
      <Button
        value="다음"
        className="navigation-button"
        disabled={page === maxPage}
        onClick={() => {
          history.push(`/${page + 1}`);
          setPage(page + 1);
        }}
      />
    </div>
  );
}

export default App;
