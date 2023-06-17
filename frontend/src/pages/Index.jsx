import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Page, Card, ResourceList, Icon, Text } from '@shopify/polaris';
import { CircleRightMajor } from '@shopify/polaris-icons';

// Index for all sample UIs using ResourceList as a link list.
// See https://polaris.shopify.com/components/resource-list
function Index() {
    const app = useAppBridge();
    const redirect = Redirect.create(app);

    // Redirect to the external mock service login to connect the current shop and their users by Session Token validation.
    if (new URLSearchParams(window.location.search).get("external") != null) {
        getSessionToken(app).then((sessionToken) => {
            redirect.dispatch(Redirect.Action.REMOTE, `https://${window.location.hostname}/mocklogin?sessiontoken=${sessionToken}`);
        });
        return (<span></span>);
    }

    return (
        <Page>
            <Card>
                <ResourceList
                    showHeader={true}
                    items={[
                        
                    ]}
                    renderItem={(item) => {
                        const { id, onClick, name, location } = item;
                        const media = <Icon source={CircleRightMajor} />;
                        return (
                            <ResourceList.Item id={id} onClick={onClick} media={media} >
                                <Text variant="bodyMd" fontWeight="bold" as="h3">
                                    {name}
                                </Text>
                                <div>{location}</div>
                            </ResourceList.Item>
                        );
                    }}
                />
            </Card>
        </Page>
    );
}

export default Index