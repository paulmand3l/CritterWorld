const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const RUNNING = 'RUNNING';

const Status = {
  SUCCESS,
  FAILURE,
  RUNNING,
}

const isSuccess = (status) => status === SUCCESS;
const isFailure = (status) => status === FAILURE;
const isRunning = (status) => status === RUNNING;

export {
  SUCCESS,
  FAILURE,
  RUNNING,

  isSuccess,
  isFailure,
  isRunning,
}

export default Status;
