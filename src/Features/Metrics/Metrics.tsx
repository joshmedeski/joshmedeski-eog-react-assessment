/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { createClient, useQuery, Provider } from 'urql';
import { IState } from '../../store';
import { actions } from './reducer';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress, Box } from '@material-ui/core';
import MetricCard from '../../components/MetricCard';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query {
  getMetrics
}
`;

const getMetrics = (state: IState) => {
  const metrics = state.metrics;
  return metrics;
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
  }),
);

export default () => {
  return (
    <Provider value={client}>
      <MetricSelector />
    </Provider>
  );
};

const MetricSelector = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const metrics = useSelector(getMetrics);
  const metricCards = metrics.selected.map(selection => <MetricCard title={selection} />);
  const [result] = useQuery({ query });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(actions.setMetricsOptions(getMetrics));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={metrics.options}
        filterSelectedOptions
        onChange={(_, selectedOptions) => {
          dispatch(actions.setMetricsSelected(selectedOptions));
        }}
        renderInput={params => <TextField {...params} variant="outlined" label="Metrics" placeholder="Favorites" />}
      />
      <Box display="flex" flexWrap="wrap">
        {metricCards}
      </Box>
    </div>
  );
};
