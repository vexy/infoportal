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

export interface MainPlatformInterface extends utils.Interface {
  functions: {
    "addQuestion(string,string[])": FunctionFragment;
    "getAllQuestions()": FunctionFragment;
    "owner()": FunctionFragment;
    "register()": FunctionFragment;
    "scoresFor(uint256)": FunctionFragment;
    "totalQuestions()": FunctionFragment;
    "totalUsers()": FunctionFragment;
    "userBalance(address)": FunctionFragment;
    "vote(uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addQuestion"
      | "getAllQuestions"
      | "owner"
      | "register"
      | "scoresFor"
      | "totalQuestions"
      | "totalUsers"
      | "userBalance"
      | "vote"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addQuestion",
    values: [PromiseOrValue<string>, PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllQuestions",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "register", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "scoresFor",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalQuestions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalUsers",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "userBalance",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "addQuestion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllQuestions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "scoresFor", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalQuestions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalUsers", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "userBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;

  events: {};
}

export interface MainPlatform extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MainPlatformInterface;

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
    addQuestion(
      title: PromiseOrValue<string>,
      labels: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAllQuestions(overrides?: CallOverrides): Promise<[string[]]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    register(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    scoresFor(
      questionID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[]]>;

    totalQuestions(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalUsers(overrides?: CallOverrides): Promise<[BigNumber]>;

    userBalance(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    vote(
      questionID: PromiseOrValue<BigNumberish>,
      voteOption: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addQuestion(
    title: PromiseOrValue<string>,
    labels: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAllQuestions(overrides?: CallOverrides): Promise<string[]>;

  owner(overrides?: CallOverrides): Promise<string>;

  register(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  scoresFor(
    questionID: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[string[], BigNumber[]]>;

  totalQuestions(overrides?: CallOverrides): Promise<BigNumber>;

  totalUsers(overrides?: CallOverrides): Promise<BigNumber>;

  userBalance(
    _address: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  vote(
    questionID: PromiseOrValue<BigNumberish>,
    voteOption: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addQuestion(
      title: PromiseOrValue<string>,
      labels: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllQuestions(overrides?: CallOverrides): Promise<string[]>;

    owner(overrides?: CallOverrides): Promise<string>;

    register(overrides?: CallOverrides): Promise<void>;

    scoresFor(
      questionID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[]]>;

    totalQuestions(overrides?: CallOverrides): Promise<BigNumber>;

    totalUsers(overrides?: CallOverrides): Promise<BigNumber>;

    userBalance(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    vote(
      questionID: PromiseOrValue<BigNumberish>,
      voteOption: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    addQuestion(
      title: PromiseOrValue<string>,
      labels: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAllQuestions(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    register(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    scoresFor(
      questionID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalQuestions(overrides?: CallOverrides): Promise<BigNumber>;

    totalUsers(overrides?: CallOverrides): Promise<BigNumber>;

    userBalance(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    vote(
      questionID: PromiseOrValue<BigNumberish>,
      voteOption: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addQuestion(
      title: PromiseOrValue<string>,
      labels: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAllQuestions(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    register(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    scoresFor(
      questionID: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalQuestions(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalUsers(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    userBalance(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    vote(
      questionID: PromiseOrValue<BigNumberish>,
      voteOption: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}