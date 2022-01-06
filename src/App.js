import './App.css';

import * as React from 'react';
import * as dayjs from 'dayjs';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { CustomSteppers } from './components/Stepper';

const steps = [
  {
    id: 0,
    name: 'Roteirização coleta',
    date: null,
    completed: true,
  },
  {
    id: 1,
    name: 'Despachar pedido',
    date: '2021-12-26',
    completed: false,
  },
  {
    id: 2,
    name: 'Em transporte',
    date: null,
    completed: false,
  },
  {
    id: 3,
    name: 'Entregue',
    date: '2022-02-25',
    completed: false,
  },
];

function App() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [stepData, setStepData] = React.useState(steps);

  React.useEffect(() => {
    stepData.forEach((step) => {
      if (step.completed) {
        setActiveStep(step.id);
      }
    });
  }, [stepData]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="App">
      <CustomSteppers activeStep={activeStep} steps={stepData} />

      <div className="container">
        <Stack direction="row" spacing={2}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            color="secondary"
            variant="contained"
          >
            Back
          </Button>

          <Button
            onClick={activeStep === stepData.length ? () => {} : handleNext}
            color="primary"
            variant="contained"
          >
            {activeStep === stepData.length ? 'Finish' : 'Next'}
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default App;
