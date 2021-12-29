import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Repo } from '../pages/Repo';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={Dashboard} path="/" exact />
      {/* Utiliza-se '+' para que o route desocnsidere tudo depois, assim 'rafanthx13/log-price/comparator'
          é tratado como uma cois só por esse componente */}
      <Route component={Repo} path="/repositories/:repository+" />
    </Switch>
  );
};
