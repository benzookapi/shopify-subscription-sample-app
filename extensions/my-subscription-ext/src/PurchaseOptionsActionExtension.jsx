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

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const titleChange = useCallback((newTitle) => setTitle(newTitle), []);
  const [days, setDays] = useState(1);
  const daysChange = useCallback((newDays) => setDays(newDays), []);

  function handleSave() {
    setLoading(true);
    const url = `/plans?event=create&product_id=${productId}&variant_id=${variantId}&title=${title}&days=${days}`;
    console.log(`Accessing... ${url}`);
    fetch(url, {
      method: "POST",
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
      loading={loading}
      title={i18n.translate('title')}
      primaryAction={
        <Button onPress={handleSave}>{i18n.translate('save')}</Button>
      }
      secondaryAction={
        <Button
          onPress={() => {
            close();
          }}
        >
          {i18n.translate('cancel')}
        </Button>
      }
    >
      <BlockStack gap="large">
        <Text>{i18n.translate('welcome', extension)}</Text>
        <Text>{i18n.translate('description')} <Link target="_blank" href="https://shopify.dev/docs/api/admin-extensions/unstable/components">
          {i18n.translate('component')}</Link></Text>
        <Banner
          status="info"
          title={i18n.translate('banner')}
        >
        </Banner>
        <Section heading={i18n.translate('heading1')}>
          <InlineStack>
            <Text fontWeight="bold">{i18n.translate('product')}: &nbsp;</Text><Text>{productId}</Text>
          </InlineStack>
          <InlineStack>
            <Text fontWeight="bold">{i18n.translate('variant')}: &nbsp;</Text><Text>{variantId}</Text>
          </InlineStack>
        </Section>
        <Section heading={i18n.translate('heading2')}>
          <InlineStack>
            <TextField
              label={i18n.translate('label1')}
              value={title}
              onChange={(value) => { titleChange(value); }}
            />
          </InlineStack>
          <InlineStack>
            <TextField
              label={i18n.translate('label2')}
              value={days}
              onChange={(value) => { daysChange(value); }}
            />
          </InlineStack>
        </Section>
      </BlockStack>
    </AdminAction>
  );
}