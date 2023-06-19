import { useState, useCallback } from 'react';
import {
  render,
  extend,
  useExtensionApi,
  useData,
  useSessionToken,
  useContainer,
  Card,
  BlockStack,
  InlineStack,
  Text,
  TextBlock,
  TextField,
  Button,
  Banner,
  Link
} from '@shopify/admin-ui-extensions-react';

// Your extension must render all four modes
extend(
  'Admin::Product::SubscriptionPlan::Add',
  render(() => <App />),
);
extend(
  'Admin::Product::SubscriptionPlan::Create',
  render(() => <Create />),
);
extend(
  'Admin::Product::SubscriptionPlan::Remove',
  render(() => <App />),
);
extend(
  'Admin::Product::SubscriptionPlan::Edit',
  render(() => <App />),
);

// *NOTE THAT The raw app url as the backend is not configurable unlike other extensions
//const APP_URL = `YOUR_APP_URL_IN_APP_SETTINGS (https://xxxxxxx without the last slash '/')`;
const APP_URL = `https://bef2-2400-2410-2fc0-fb00-31fd-5cf1-c6e6-1d1b.ngrok-free.app`;

// See https://shopify.dev/docs/apps/selling-strategies/purchase-options/app-extensions/extension-points#product-details-page
function App() {
  const { extensionPoint } = useExtensionApi();
  const data = useData();
  const { getSessionToken } = useSessionToken();
  const { close, done } = useContainer();

  return (
    <BlockStack>
      <TextBlock>Welcome to the {extensionPoint} extension!</TextBlock>
      <TextBlock>For selling plan Add / Edit / Remove, refer to <Link external="true" url="https://shopify.dev/docs/apps/selling-strategies/subscriptions/selling-plans/manage">
        Shopify dev. site tutorials</Link> to integrate them.</TextBlock>
      <Card title="Your selected data" sectioned="true">
        <InlineStack spacing="loose">
          <Text appearance="subdued" strong>Product:</Text><Text appearance="code">{data.productId}</Text>
        </InlineStack>
        <InlineStack spacing="loose">
          <Text appearance="subdued" emphasized>Variant:</Text><Text appearance="code">{data.variantId}</Text>
        </InlineStack>
        <InlineStack spacing="loose">
          <Text appearance="subdued" strong>Selling Plan Group:</Text><Text appearance="code">{data.sellingPlanGroupId}</Text>
        </InlineStack>
        <InlineStack spacing="loose">
          <Text appearance="subdued" emphasized>Variants:</Text><Text appearance="code">{data.variantIds}</Text>
        </InlineStack>
      </Card>
    </BlockStack>
  );
}

// See https://shopify.dev/docs/apps/selling-strategies/purchase-options/app-extensions
// See https://shopify.dev/docs/api/admin-extensions
// Sample: https://github.com/Shopify/admin-ui-extensions-template/blob/main/scripts/generate/templates/PRODUCT_SUBSCRIPTION/react.template.js
function Create() {
  const { extensionPoint } = useExtensionApi();
  const data = useData();
  const { getSessionToken } = useSessionToken();
  const { close, done } = useContainer();

  const [title, setTitle] = useState('');
  const titleChange = useCallback((newTitle) => setTitle(newTitle), []);
  const [days, setDays] = useState(1);
  const daysChange = useCallback((newDays) => setDays(newDays), []);

  return (
    <BlockStack>
      <TextBlock>Welcome to the {extensionPoint} extension!</TextBlock>
      <TextBlock>This page is buit with <Link external="true" url="https://shopify.dev/docs/api/admin-extensions/components">
        Components for Admin UI Extensions</Link>.</TextBlock>
      <Banner
        status="info"
        title="Creat a subscription plan"
      >
      </Banner>
      <Card title="Your selected data" sectioned="true">
        <InlineStack spacing="loose">
          <Text appearance="subdued" strong>Product:</Text><Text appearance="code">{data.productId}</Text>
        </InlineStack>
        <InlineStack spacing="loose">
          <Text appearance="subdued" emphasized>Variant:</Text><Text appearance="code">{data.variantId}</Text>
        </InlineStack>
      </Card>
      <Card title="Input your subscription details" sectioned="true">
        <InlineStack spacing="loose">
          <TextField
            type="text"
            label="Plan name"
            value={title}
            onChange={titleChange}
          />
        </InlineStack>
        <InlineStack spacing="loose">
          <TextField
            type="number"
            label="Delivery frequency in DAYS"
            value={days}
            onChange={daysChange}
          />
        </InlineStack>
        <InlineStack spacing="loose" inlineAlignment="trailing">
          <Button title="Cancel" onPress={() => { close(); }}></Button>
          <Button kind="primary" title="Create a plan" onPress={() => {
            getSessionToken().then((token) => {
              const url = `${APP_URL}/create?token=${token}&product_id=${data.productId}&variant_id=${typeof data.variantId === 'undefined' ? '' : data.variantId}&title=${title}&days=${days}`;
              console.log(`Accessing... ${url}`);
              fetch(url, {
                method: "POST"
              }).then(res => {
                res.json().then(json => {
                  console.log(`json: ${JSON.stringify(json)}`);
                  done();
                }).catch(e => {
                  console.log(`${e}`);
                });
              }).catch(e => {
                console.log(`error: ${e}`);
              });
            });
          }}></Button>
        </InlineStack>
      </Card>
    </BlockStack>
  );

}