import pages from "config/pages";

function Header({ page }) {
  const id = pages[page].id;
  const title = pages[page].title;
  const explanation = pages[page].explanation;

  return (
    <div id="header">
      <h1>{`Example ${id + 1}`}</h1>
      <h2>{title}</h2>
      <ul>
        {explanation.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default Header;
