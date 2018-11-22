import React, {Component} from 'react';
import {InputField} from "@dhis2/d2-ui-core";
import {GroupEditor} from "@dhis2/d2-ui-group-editor";
import * as PropTypes from "prop-types";
import {inject, observer} from "mobx-react";

class Dashboards extends Component {
    store = null;

    constructor(props) {
        super(props);
        const {d2, store} = props;
        store.loadDashboards(d2);

        this.store = props;

        if (this.store.presentation) {
            console.log(this.store.presentation);
        }

        //Translations
        d2.i18n.translations['assign_all'] = "Assign All";

    }

    /*getChildContext() {
        return {d2: this.state.d2};
    }*/

    render() {
        const {store} = this.props;
        return <div className="smart-div">
            <InputField
                id="filter"
                label="Filter"
                type="text"
                fullWidth
                value={store.filterText}
                onChange={(value) => store.filterChange(value)}
            />
            <GroupEditor class="dashboard-list"
                         itemStore={store.itemStore}
                         assignedItemStore={store.assignedItemStore}
                         onAssignItems={store.assignItems}
                         onRemoveItems={store.unAssignItems}
                         height={150}
                         filterText={store.filterText}
            />

            {/*<pre>{JSON.stringify(store.presentation, null, 2)}</pre>*/}
        </div>
    }
}

Dashboards.propTypes = {
    d2: PropTypes.object.isRequired
};

export default inject("store")(observer(Dashboards));
