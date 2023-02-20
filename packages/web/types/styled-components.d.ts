import 'styled-components';

import { colors, helpers } from '../components/Shared/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    helpers: typeof helpers;
    isDark?: boolean;
  };
}
