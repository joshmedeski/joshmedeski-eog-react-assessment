import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

type OutlinedCardProps = {
  title: string;
};

export default function OutlinedCard(props: OutlinedCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="body2" component="p">
          {props.title}
        </Typography>
        <Typography variant="h4" component="h2">
          129838
        </Typography>
      </CardContent>
    </Card>
  );
}
