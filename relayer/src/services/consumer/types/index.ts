import { ICacheService } from '../../../../../common/cache';
import { IQueue } from '../../../../../common/queue';
import {
  AATransactionMessageType,
  EntryPointMapType,
  EVMRawTransactionType,
  TransactionQueueMessageType,
} from '../../../../../common/types';
import { IEVMAccount } from '../../account';
import { IRelayerManager } from '../../relayer-manager';
import { ITransactionService } from '../../transaction-service';

export type AAConsumerParamsType = {
  queue: IQueue<AATransactionMessageType>;
  relayerManager: IRelayerManager<IEVMAccount, EVMRawTransactionType>;
  transactionService: ITransactionService<IEVMAccount, EVMRawTransactionType>;
  cacheService: ICacheService;
  options: {
    chainId: number;
    entryPointMap: EntryPointMapType;
  };
};

export type SocketConsumerParamsType = {
  queue: IQueue<TransactionQueueMessageType>;
  options: {
    chainId: number;
    wssUrl: string;
    EVMRelayerManagerMap: {
      [name: string]: {
        [chainId: number]: IRelayerManager<IEVMAccount, EVMRawTransactionType>;
      };
    };
  };
};
