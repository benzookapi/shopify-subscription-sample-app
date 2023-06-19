import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Page, Card, ResourceList, Icon, Text } from '@shopify/polaris';
import { CircleRightMajor } from '@shopify/polaris-icons';

import { _getParamValueFromQuery } from "../utils/my_util";

// Subscription contract admin link
// See https://shopify.dev/docs/apps/selling-strategies/subscriptions/contracts/create
function Subscriptions() {
    const app = useAppBridge();
    const redirect = Redirect.create(app);    

    const customer_id = _getParamValueFromQuery(window, 'customer_id');
    const id = _getParamValueFromQuery(window, 'id');

    return (
        <Page>
            <Card>
                <Text>Subscriptions</Text>
                <Text>{customer_id} {id}</Text>
            </Card>
        </Page>
    );
}

export default Subscriptions