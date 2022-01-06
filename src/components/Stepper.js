import * as dayjs from 'dayjs';

import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

import { IconRoot, CustomStep, Connector } from './styles';

function StepIcon(props) {
  const { active, completed, className } = props;

  return (
    <IconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <CheckIcon /> : null}
    </IconRoot>
  );
}

export function CustomSteppers({ activeStep, steps }) {
  const verifyDelay = (date) => {
    const dispatchDay = dayjs(date);
    const now = dayjs();
    const hours = now.diff(dispatchDay, 'hour');
    const days = Math.floor(hours / 24);
    return days;
  };

  const renderMessage = (date, id) => {
    let thisDate = date || dayjs();

    const formattedDate = dayjs(thisDate).format('DD/MM/YYYY');
    const delay = verifyDelay(date);

    const activeStepIsCompletedWithDate = date && id < activeStep;
    const isCurrentStep = date && id === activeStep;

    return (
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            pt: '10px',
            ml: activeStepIsCompletedWithDate || isCurrentStep ? 0 : '20px',
            gap: '5px',
          }}
          justifyContent="center"
        >
          <Typography
            variant="caption"
            textAlign="center"
            fontWeight="900"
            sx={{
              visibility: date ? 'visible' : 'hidden',
              lineHeight: '16px',
            }}
          >
            {formattedDate}
          </Typography>
          {isCurrentStep ? (
            <AccessAlarmIcon
              color="warning"
              sx={{
                fontSize: '20px',
                pb: '2px',
                visibility: isCurrentStep ? 'visible' : 'hidden',
              }}
            />
          ) : (
            <CheckIcon
              color="success"
              sx={{
                fontSize: '20px',
                pb: '2px',
                visibility: activeStepIsCompletedWithDate
                  ? 'visible'
                  : 'hidden',
              }}
            />
          )}
        </Stack>
        {delay > 0 && activeStepIsCompletedWithDate ? (
          <Typography
            variant="caption"
            textAlign="center"
            fontWeight="400"
            sx={{ display: 'block' }}
          >
            {`(${delay} dias de atraso)`}{' '}
          </Typography>
        ) : (
          <Typography
            variant="caption"
            textAlign="center"
            fontWeight="400"
            sx={{ visibility: 'hidden' }}
          >
            {`(alguns dias de atraso)`}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<Connector />}
      >
        {steps.map(({ name, date, id }) => {
          const labelProps = {
            optional: (
              <Box alignItems="center" justifyContent="center" display="flex">
                <Typography
                  variant="caption"
                  textAlign="center"
                  sx={{ paddingBottom: '18px' }}
                >
                  {name}
                </Typography>
              </Box>
            ),
          };

          return (
            <CustomStep key={name}>
              <StepLabel StepIconComponent={StepIcon} {...labelProps} />
              {renderMessage(date, id)}
            </CustomStep>
          );
        })}
      </Stepper>
    </Stack>
  );
}
