import { useState, useCallback } from 'react';
import {
  useApi,
  AdminAction,
  BlockStack,
  Button,
  TextField,
  Text,
  Link,
  Banner,
  Section,
  InlineStack,
} from '@shopify/ui-extensions-react/admin';

// Read https://shopify.dev/docs/apps/build/purchase-options/purchase-options-extensions
export default function PurchaseOptionsActionExtension(extension) {
  // The useApi hook provides access to several useful APIs like i18n, close, and data.
  const { i18n, close, data } = useApi(extension);

  console.log(`data: ${JSON.stringify(data)}`);

  const productId = data.selected[0].id.indexOf('gid://shopify/Product/') === 0
    ? data.selected[0].id : '';
  const variantId = data.selected[0].id.indexOf('gid://shopify/ProductVariant/') === 0
    ? data.selected[0].id : '';

  const [title, setTitle] = useState('');
  const titleChange = useCallback((newTitle) => setTitle(newTitle), []);
  const [days, setDays] = useState(1);
  const daysChange = useCallback((newDays) => setDays(newDays), []);

  function handleSave() {
    const url = `/plans?event=create&product_id=${productId}&variant_id=${variantId}&title=${title}&days=${days}`;
    console.log(`Accessing... ${url}`);
    fetch(url, {
      method: "POST",
      /*headers: {
        Authorization: `Bearer ${token}`,
      },*/
    }).then(res => {
      res.json().then(json => {
        console.log(`json: ${JSON.stringify(json)}`);
        close();
      }).catch(e => {
        console.log(`${e}`);
      });
    }).catch(e => {
      console.log(`error: ${e}`);
    });
  }

  return (
    <AdminAction
      loading={true}
      title="My App Action"
      primaryAction={
        <Button onPress={handleSave}>Save</Button>
      }
      secondaryAction={
        <Button
          onPress={() => {
            close();
          }}
        >
          Cancel
        </Button>
      }
    >
      <BlockStack gap="large">
        <Text>{i18n.translate('welcome', extension)}</Text>
        <Text>This page is buit with <Link target="_blank" href="https://shopify.dev/docs/api/admin-extensions/unstable/components">
          Components for Admin UI Extensions</Link>.</Text>
        <Banner
          status="info"
          title="Creat a subscription plan"
        >
        </Banner>
        <Section heading="Your selected data">
          <InlineStack>
            <Text fontWeight="bold">Product: &nbsp;</Text><Text fontStyle="italic">{productId}</Text>
          </InlineStack>
          <InlineStack>
            <Text fontWeight="bold">Variant: &nbsp;</Text><Text fontStyle="italic">{variantId}</Text>
          </InlineStack>
        </Section>
        <Section heading="Input your subscription details">
          <InlineStack>
            <TextField
              label="Plan name"
              value={title}
              onChange={(value) => { titleChange(value); }}
            />
          </InlineStack>
          <InlineStack>
            <TextField
              label="Delivery frequency in DAYS"
              value={days}
              onChange={(value) => { daysChange(value); }}
            />
          </InlineStack>
        </Section>
      </BlockStack>
    </AdminAction>
  );
}