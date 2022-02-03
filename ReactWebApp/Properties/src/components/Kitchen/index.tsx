import * as React from "react";
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import KitchenHeader from './KitchenHeader'
import KitchenBody from './KitchenBody'

const KitchenIndex = (props) => {
    const  id : any  = useParams();
    return(
        <Router>
            {/* KITCHEN HEADER */}
            <KitchenHeader kitchenId={id}/>
            {/* KITCHEN BODY */}
            <KitchenBody kitchenId={id}/>
        </Router>
    );
}

export default withRouter(KitchenIndex);