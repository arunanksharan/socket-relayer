import { BigNumber, ethers } from 'ethers';
import { UserOperationType } from '../../types';

// data response type that external simulation serivcereturns
export type ExternalSimulationResponseType = {
  isSimulationSuccessful: boolean;
  msgFromSimulation: string;
  gasLimitFromSimulation: number | BigNumber;
};

export type AASimulationDataType = {
  userOp: UserOperationType;
  entryPointContract: ethers.Contract;
  chainId: number;
};

// data response type that simulation service returns
export type SimulationResponseType = {
  isSimulationSuccessful: boolean;
  gasLimitFromSimulation: number | BigNumber;
  msgFromSimulation: string;
};
