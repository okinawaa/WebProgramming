import styled from "styled-components";
import Sidebar from "./Components/Sidebar";
import {Route,Switch as Switching} from 'react-router'
import HomePage from "./Pages/HomePage";
import AboutPage from './Pages/AboutPage';
import ResumePage from './Pages/ResumePage';
import PortfoliosPage from './Pages/PortfoliosPage';
import BlogsPage from './Pages/BlogsPage';
import ContactPage from './Pages/ContactPage';
function App() {
  return (
      <div className="App">
          <Sidebar/>
            <MainContentStyled>
                <div className="lines">
                    <div className="line-1"></div>
                    <div className="line-2"></div>
                    <div className="line-3"></div>
                    <div className="line-4"></div>
                </div>
                <Switching>
                    <Route path="/" exact>
                        <HomePage />
                    </Route>
                    <Route path="/about" exact>
                        <AboutPage />
                    </Route>
                    <Route path="/resume" exact>
                        <ResumePage />
                    </Route>
                    <Route path="/portfolios" exact>
                        <PortfoliosPage />
                    </Route>
                    <Route path="/blogs" exact>
                        <BlogsPage />
                    </Route>
                    <Route path="/contact" exact>
                        <ContactPage />
                    </Route>
                </Switching>
            </MainContentStyled>
      </div>
  );
}

const MainContentStyled = styled.main`
  position: relative;
  margin-left: 16.3rem;
  min-height: 100vh;
  .lines{
    position: absolute;
    min-height: 100%;
    width:100%;
    display: flex;
    justify-content: space-evenly;
    z-index: -1;
    opacity: 0.4;
    
    
    .line-1, .line-2, .line-3, .line-4{
      width: 1px;
      min-height: 100vh;
      background-color: var(--border-color);
    }
  }
    
`;


export default App;
