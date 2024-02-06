import { Router } from 'express';
import { transactionStatusApi, requestHandler } from '../../controllers';
import { simulateTransaction } from '../../controllers/simulate';
import { transactionResubmitApi } from '../../controllers/transaction-resubmit';
import {
  validateRelayRequest,
  validateTransactionStatus,
  validateTransactionResubmit,
} from '../../middleware';

export const relayApiRouter = Router();

relayApiRouter.get('/status', validateTransactionStatus, transactionStatusApi);

relayApiRouter.post(
  '/',
  validateRelayRequest(),
  simulateTransaction(),
  requestHandler
);

relayApiRouter.post(
  '/resubmit',
  validateTransactionResubmit,
  transactionResubmitApi
);
