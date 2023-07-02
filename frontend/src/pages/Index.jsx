import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Page, Card, ResourceList, Icon, Text } from '@shopify/polaris';
import { CircleRightMajor } from '@shopify/polaris-icons';

// Index page for this subscription app setup
function Index() {
    const app = useAppBridge();
    const redirect = Redirect.create(app);    

    return (
        <Page>
            <Card>
                <Text>Index</Text>
            </Card>
            <Card>
                <Text>Index</Text>
            </Card>
            <Card>
                <Text>Index</Text>
            </Card>
            <Card>
                <Text>Index</Text>
            </Card>
        </Page>
    );
}

export default Index