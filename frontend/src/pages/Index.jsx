import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Page, VerticalStack, AlphaCard, Layout, Text, Link, Badge } from '@shopify/polaris';
import { CircleRightMajor } from '@shopify/polaris-icons';

import { _decodeSessionToken, _getAdminFromShop, _getShopFromQuery } from "../utils/my_util";

// Index page for this subscription app setup
function Index() {
    const app = useAppBridge();
    const redirect = Redirect.create(app);

    const shop = _getShopFromQuery(window);



    return (
        <Page title="How to try this app subscription">
            <VerticalStack gap="3">
                <AlphaCard padding="4">
                    <Layout>
                        <Layout.Section>
                            <Text as="h2" fontWeight="bold">Step 1. Create your plans for products</Text>
                        </Layout.Section>
                        <Layout.Section>
                            Go to <Link url={`https://${_getAdminFromShop(shop)}/products`} external={true}>Products</Link> and make your <Link url={`https://shopify.dev/docs/apps/selling-strategies/subscriptions/modeling#plan-setup`} external={true}>selling plans</Link> at <Badge status="info">[Purchase options] &gt; [Create a new option] in each product details</Badge> built as <Link url={`https://github.com/benzookapi/shopify-subscription-sample-app/blob/main/extensions/my-subscription-ext/src/index.jsx`} external={true}>Admin UI extension</Link>.
                        </Layout.Section>
                    </Layout>
                </AlphaCard>
                <AlphaCard padding="4">
                    <Layout>
                        <Layout.Section>
                            <Text as="h2" fontWeight="bold">Step 2. Insert your plan selector into the product detail page</Text>
                        </Layout.Section>
                        <Layout.Section>
                            Go to <Badge status="info"><Link url={`https://${shop}/admin/themes/current/editor?template=product&addAppBlockId=${SHOPIFY_CONTRACT_EXT_ID}%2Fapp-block&target=newAppsSection`} external={true}>Product detail page editor with this app block</Link></Badge> to enable the plan selector built as <Link url={`https://github.com/benzookapi/shopify-subscription-sample-app/blob/main/extensions/my-theme-contract-ext/blocks/app-block.liquid`} external={true}>Theme app extension</Link>.
                        </Layout.Section>
                    </Layout>
                </AlphaCard>
                <AlphaCard padding="4">
                    <Layout>
                        <Layout.Section>
                            <Text as="h2" fontWeight="bold">Step 3. Insert your customer portal (my page) into the customer login and account page</Text>
                        </Layout.Section>
                        <Layout.Section>
                            Go to <Badge status="info"><Link url={`https://${shop}/admin/themes/current/editor?template=customers%2Flogin&addAppBlockId=${SHOPIFY_CONTRACT_EXT_ID}%2Fmypage-block&target=newAppsSection`} external={true}>Customer page editor with this app block</Link></Badge> to enable the portal link built as <Link url={`https://github.com/benzookapi/shopify-subscription-sample-app/blob/main/extensions/my-theme-contract-ext/blocks/mypage-block.liquid`} external={true}>Theme app extension</Link>.
                        </Layout.Section>
                        <Layout.Section>
                            If you can't access to the customer account / order page in the editor, login from the customer login page first within the editor.
                        </Layout.Section>
                        <Layout.Section>
                            Also, check if <Link url={`https://${shop}/apps/mysubpage`} external={true}>your app proxy url</Link> works fine with a JSON response which provides the customer page under the shop domain.
                        </Layout.Section>
                    </Layout>
                </AlphaCard>
                <AlphaCard padding="4">
                    <Layout>
                        <Layout.Section>
                            <Text as="h2" fontWeight="bold">Step 4. Make your first order through the checkout to create the following ones as subscription</Text>
                        </Layout.Section>
                        <Layout.Section>
                            Go to <Badge status="info"><Link url={`https://${shop}`} external={true}>your online store</Link></Badge> to select the products with selling plans above chosen to checkout. In <Link url={`https://${_getAdminFromShop(shop)}/orders`} external={true}>Orders</Link>, you will see the latest order you made with <Badge status="info"><Link url={`https://shopify.dev/docs/apps/selling-strategies/subscriptions/contracts/create`} external={true}>your selling cotract links</Link></Badge>.
                        </Layout.Section>
                        <Layout.Section>
                            In the selling contract page linked above, you can see the contract details and make the next order with <Badge status="info">[Make a billing attempt]</Badge>. If the fulfillment checkbox selected, <Link url={`https://shopify.dev/docs/api/admin-graphql/2023-04/mutations/fulfillmentCreateV2`} external={true}>the fulfillment gets done automatically</Link> after the new order gets created.
                        </Layout.Section>
                        <Layout.Section>
                            In <Link url={`https://${_getAdminFromShop(shop)}/orders`} external={true}>Orders</Link> again, you will see the 2nd, 3rd, ... orders made by billing attempts to know how you should handle recursive process as real subscription based on customer's contracts.
                        </Layout.Section>
                    </Layout>
                </AlphaCard>
            </VerticalStack>
        </Page>
    );
}

export default Index