import React from 'react'
import {
  render,
  extend,
  useExtensionApi,
  useData,
  useSessionToken,
  Card,
  BlockStack,
  InlineStack,
  Text,
  TextBlock,
  TextField,
  Button,
  Banner,
  Link
} from '@shopify/admin-ui-extensions-react'

// Your extension must render all four modes
extend(
  'Admin::Product::SubscriptionPlan::Add',
  render(() => <App />),
)
extend(
  'Admin::Product::SubscriptionPlan::Create',
  render(() => <Create />),
)
extend(
  'Admin::Product::SubscriptionPlan::Remove',
  render(() => <App />),
)
extend(
  'Admin::Product::SubscriptionPlan::Edit',
  render(() => <App />),
)

function App() {
  const { extensionPoint } = useExtensionApi();
  return <Text>Welcome to the {extensionPoint} extension!</Text>
}

function Create() {
  const { extensionPoint } = useExtensionApi();
  const data = useData();
  const { getSessionToken } = useSessionToken();

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
      <Card title="Input the delivery cycle" sectioned="true">
        <InlineStack spacing="loose">
          <TextField
            type="number"
            label="Delivery frequency in DAYS"
          />
        </InlineStack>
        <InlineStack spacing="loose" inlineAlignment="trailing">
          <Button title="Cancel"></Button>
          <Button kind="primary" title="Create a plan"></Button>
        </InlineStack>
      </Card>
    </BlockStack>
  );

}