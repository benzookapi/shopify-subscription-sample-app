import {reactExtension} from '@shopify/ui-extensions-react/admin';
import PurchaseOptionsActionExtension from './PurchaseOptionsActionExtension.jsx';

export default reactExtension('admin.product-purchase-option.action.render', () => (
  <PurchaseOptionsActionExtension extension="admin.product-purchase-option.action.render" />
));