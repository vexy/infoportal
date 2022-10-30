/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface QuestionInterface extends utils.Interface {
  functions: {
    "accept(uint256)": FunctionFragment;
    "editLabel(uint256,string)": FunctionFragment;
    "getLabels()": FunctionFragment;
    "getScores()": FunctionFragment;
    "score(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "accept"
      | "editLabel"
      | "getLabels"
      | "getScores"
      | "score"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "accept",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "editLabel",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "getLabels", values?: undefined): string;
  encodeFunctionData(functionFragment: "getScores", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "score",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "accept", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "editLabel", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getLabels", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getScores", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "score", data: BytesLike): Result;

  events: {};
}

export interface Question extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: QuestionInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    accept(
      element: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    editLabel(
      element: PromiseOrValue<BigNumberish>,
      newLabel: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getLabels(overrides?: CallOverrides): Promise<[string[]]>;

    getScores(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    score(
      element: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  accept(
    element: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  editLabel(
    element: PromiseOrValue<BigNumberish>,
    newLabel: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getLabels(overrides?: CallOverrides): Promise<string[]>;

  getScores(overrides?: CallOverrides): Promise<BigNumber[]>;

  score(
    element: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    accept(
      element: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    editLabel(
      element: PromiseOrValue<BigNumberish>,
      newLabel: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getLabels(overrides?: CallOverrides): Promise<string[]>;

    getScores(overrides?: CallOverrides): Promise<BigNumber[]>;

    score(
      element: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    accept(
      element: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    editLabel(
      element: PromiseOrValue<BigNumberish>,
      newLabel: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getLabels(overrides?: CallOverrides): Promise<BigNumber>;

    getScores(overrides?: CallOverrides): Promise<BigNumber>;

    score(
      element: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    accept(
      element: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    editLabel(
      element: PromiseOrValue<BigNumberish>,
      newLabel: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getLabels(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getScores(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    score(
      element: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}