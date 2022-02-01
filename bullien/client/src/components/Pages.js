import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LandingSection from "./pages/landingSection/LandingSection";
import NotFound from "./pages/notFound/NotFound";
import ArchivingSection from "./pages/archivingSection/ArchivingSection";
import Contact from "./pages/contactSection/Contact";
import AboutSection from "./pages/aboutSection";

function Pages(props) {
    const clickNavBanner = props.clickNavBanner
    return (
        <Switch>
            <Route path="/" exact render={(props) => <LandingSection clickNavBanner={clickNavBanner} {...props}/>}/>
            <Route path="/archive" exact component={ArchivingSection}/>
            <Route path="/about" exact component={AboutSection}/>
            <Route path="/contact" exact component={Contact}/>
            <Route path="*" exact component={NotFound}/>
        </Switch>

    )
}

export default Pages