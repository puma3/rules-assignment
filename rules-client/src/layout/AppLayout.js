import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';

const AppLayout = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default AppLayout
