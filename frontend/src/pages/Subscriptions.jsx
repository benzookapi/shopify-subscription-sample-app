import { useState } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from '@shopify/app-bridge/actions';
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Page, Card, Layout, Stack, Link, Badge, Text, Spinner } from '@shopify/polaris';
import { CircleRightMajor } from '@shopify/polaris-icons';

import { _getParamValueFromQuery } from "../utils/my_util";

// Subscription contract admin link
// See https://shopify.dev/docs/apps/selling-strategies/subscriptions/contracts/create
function Subscriptions() {
    const app = useAppBridge();

    const customer_id = _getParamValueFromQuery(window, 'customer_id');
    const id = _getParamValueFromQuery(window, 'id');

    const [res, setRes] = useState('');

    authenticatedFetch(app)(`/subscriptions?customer_id=${customer_id}&id=${id}`).then((response) => {
        response.json().then((json) => {
            console.log(JSON.stringify(json, null, 4));
            setRes(JSON.stringify(json.result, null, 4));
        }).catch((e) => {
            console.log(`${e}`);
            setRes(``);
        });
    });

    return (
        <Page title="Selected selling contract details">
            <Layout>
                <Layout.Section>
                    <Stack spacing="loose">
                        <Text as='h2'>Contract id:</Text>
                        <Badge status='info'>{id}</Badge>
                    </Stack>
                </Layout.Section>
                <Layout.Section>
                    <Card>
                        <APIResult res={res} />
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}

function APIResult(props) {
    if (Object.keys(props.res).length === 0) {
        return <Spinner accessibilityLabel="Calling Order GraphQL" size="large" />;
    }
    return (<pre>{props.res}</pre>);
}

export default Subscriptions