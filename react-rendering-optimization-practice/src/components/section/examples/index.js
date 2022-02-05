import Example1 from "components/section/examples/example1";
import Example2 from "components/section/examples/example2";
import Example3 from "components/section/examples/example3";
import Example4 from "components/section/examples/example4";
import Example5 from "components/section/examples/example5";
import Example6 from "components/section/examples/example6";
import Example7 from "components/section/examples/example7";
import Example8 from "components/section/examples/example8";
import Example9 from "components/section/examples/example9";
import Example10 from "components/section/examples/example10";
import Example11 from "components/section/examples/example11";
import Example12 from "components/section/examples/example12";
import Example13 from "components/section/examples/example13";
import Example14 from "components/section/examples/example14";

function Example({ page }) {
  switch (page) {
    case 0:
      return <Example1 />;
    case 1:
      return <Example2 />;
    case 2:
      return <Example3 />;
    case 3:
      return <Example4 />;
    case 4:
      return <Example5 />;
    case 5:
      return <Example6 />;
    case 6:
      return <Example7 />;
    case 7:
      return <Example8 />;
    case 8:
      return <Example9 />;
    case 9:
      return <Example10 />;
    case 10:
      return <Example11 />;
    case 11:
      return <Example12 />;
    case 12:
      return <Example13 />;
    case 13:
      return <Example14 />;
    default:
      return <div />;
  }
}

export default Example;
