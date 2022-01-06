import { styled } from '@mui/material/styles';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import Step from '@mui/material/Step';
import Button, { buttonClasses } from '@mui/material/Button';

export const Connector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: '45%',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,#409A3C 0%,#409A3C 50%,rgb(242,113,33)100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: '#409A3C',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    width: 'calc(100% - 20px)',
    margin: '0 auto',
    border: 0,
    backgroundColor: '#DEE1E3',
    borderRadius: '9px',
  },
}));

export const IconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: '#DEE1E3',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',

  '& > .MuiSvgIcon-root': {
    fontSize: '2.5rem',
  },

  ...(ownerState.active && {
    background: '#FF7C1A',
  }),
  ...(!ownerState.active && {
    background: '#DEE1E3',
  }),
  ...(ownerState.completed && {
    background: '#409A3C',
  }),
}));

export const CustomStep = styled(Step)(({ theme }) => ({
  '& > .MuiStepLabel-alternativeLabel': {
    flexDirection: 'column-reverse',
  },

  '& > span.step-label': {
    paddingBottom: '18px',
  },
}));
