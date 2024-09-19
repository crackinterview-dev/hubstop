// src/App.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import { CssBaseline, Typography } from '@mui/material';

const App = () => {
  const { t } = useTranslation();

  return (
    <div>
      <CssBaseline />
      <header>
        <LanguageSwitcher />
      </header>
      <main>
        <Typography variant="h3">{t('welcome')}</Typography>
      </main>
    </div>
  );
};

export default App;
