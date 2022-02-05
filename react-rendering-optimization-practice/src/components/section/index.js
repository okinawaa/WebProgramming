import Header from "components/section/header";
import Example from "components/section/examples";

function Section({ page }) {
  return (
    <div id="section">
      <Header page={page} />
      <Example page={page} />
    </div>
  );
}

export default Section;
