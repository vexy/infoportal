import { BigNumber, ethers } from "ethers";
import { QuestionInfoOutput } from '$lib/classes/Models'
import { Provider } from "$lib/classes/Provider";
import { NoSignerError, ContractError, NonceError } from "$lib/classes/Errors";
import { PlatformStore } from "$lib/classes/UtilsStore";

class PlatformContract {
    private platformContract!: ethers.Contract;

    constructor() {
        // this.prepareContract();
        console.log("<PlatformContract> initialized.");
    }

    /** PRIVATE HELPER METHODS */
    private extractNumber(_bigNumber: BigNumber): number {
        return ethers.BigNumber.from(_bigNumber).toNumber();
    }

    /**
     * Awaits transaction confirmation on given object
     * @param responseObject An object to wait for transaction approval
     */
    private async confirmReceipt(contractMethod: any): Promise<string> {
        // await receipt confirmation on this object...
        const receipt = await contractMethod.wait();
        //... and check if we're successfull (success = 1)
        if(receipt.status !== 1) {  
            throw new ContractError("Method executed but no receipt received.");
        }
        // console.log(receipt);
        // console.log("Transaction confirmed, hash: ", receipt.transactionHash);
        return Promise.resolve(receipt.transactionHash);
    }

    /** Checks if given error object is of type `NoSignerError` */ 
    private rethrowIfNoSignerError(errorObject: unknown){
        if (errorObject instanceof NoSignerError) {
            throw new NoSignerError("Signer missing or no wallet connected.");
        }
    }
    
    // -----------------------------------------------
    /**     PLATFORM CONTRACT API ~ IMPLEMENTATION   */
    // -----------------------------------------------

    /**
     * @returns  Total number of registered users on platform
     * @throws `NoSignerError` if there's no current signer
     * @throws `ContractError` if any other contract error occurs
     */
    async totalUsers(): Promise<number> {
        let _totalUsers = 0;

        try {
            this.platformContract = Provider.fabricateContract();
            const resultBN = await this.platformContract.totalUsers();
            _totalUsers = this.extractNumber(resultBN);
        } catch (err) {
            this.rethrowIfNoSignerError(err);
            throw new ContractError(err.message);
        }

        // inform store on the fly
        PlatformStore.updateUserCount(_totalUsers);
        return Promise.resolve(_totalUsers);
    }

    /**
     * @returns Total number of questions available on the platform
     * @throws `NoSignerError` if there's no current signer
     * @throws `ContractError` if any other contract error occurs
     */
    async questionsCount(): Promise<number> {
        let _questionsCount = 0;

        try {
            this.platformContract = Provider.fabricateContract();
            const response = await this.platformContract.totalQuestions();
            _questionsCount = this.extractNumber(response);
        } catch (err) {
            this.rethrowIfNoSignerError(err);
            console.log("<PlatformContract::Error> Geting questions count. Reason:", err);
            throw new ContractError(err.message);
        }

        // inform store on the fly
        PlatformStore.updateQuestionsCount(_questionsCount);
        return Promise.resolve(_questionsCount);
    }

    /** 
     * @returns User balance points
     * @throws `NoSignerError` if there's no current signer
     * @throws `ContractError` if any other contract error occurs
     */
    async getUserBalance(): Promise<number> {
        let usersBalance = 0;

        try {
            this.platformContract = Provider.fabricateContract();
            const _address = Provider.signerAddress();
            const balanceBN = await this.platformContract.balanceOf(_address);
            usersBalance = this.extractNumber(balanceBN);
        } catch (err) {
            this.rethrowIfNoSignerError(err);
            console.log("<PlatformContract::Error> Getting user balance errored. Reason:", err);
            throw new ContractError(err.message);
        
        }
        return Promise.resolve(usersBalance);
    }

    /**
     * 
     * @returns `true` if user is registered, `false` otherwise
     * @throws `NoSignerError` if there's no current signer
     * @throws `ContractError` if any other contract error occurs
     */
    async isRegisteredUser(): Promise<boolean> {
        let response = false;

        try {
            this.platformContract = Provider.fabricateContract();
            response = await this.platformContract.isRegisteredUser();
        } catch (err) {
            this.rethrowIfNoSignerError(err);
            console.log("<PlatformContract::Error> Checking user registration status errored. Reason:", err);
            throw new ContractError(err.message);
        }

        // update store on the fly
        PlatformStore.registered(response);
        return Promise.resolve(response);
    }

    /**
     * Tries to register current user
     * @throws `NoSignerError` if there's no current signer
     * @throws `ContractError` if any other contract error occurs
     */
    async registerNewUser() {
        try {
            this.platformContract = Provider.fabricateContract();
            const response = await this.platformContract.register();

            // await for confirmation and update the platform store
            const confirmationHash = await this.confirmReceipt(response);
            console.debug("Registration confirmed; hash = ", confirmationHash);
            
            PlatformStore.registered(true);
        } catch (err) {
            // indicate we're not registered atm
            PlatformStore.registered(false);

            console.error("<PlatformContract::Error> Registration error. Reason:", err);
            if(err.code === -32603) { //nonce error
                throw new NonceError("NonceError, check your settings.");
            } 
            this.rethrowIfNoSignerError(err);
            throw new ContractError(err.message);
        }
    }
    
    /**
     * Tries to get all questions available on the platform
     * @returns `QuestionInfoOutput[]` array, containing all data
     * @throws `NoSignerError` if there's no current signer
     * @throws `ContractError` if any other contract error occurs
     */
    async getAllQuestions(): Promise<(QuestionInfoOutput[])> {
        const returnSet: QuestionInfoOutput[] = [];
        
        try {
            this.platformContract = Provider.fabricateContract();
            const qInfoArray = await this.platformContract.getAllQuestions();
            //
            for(const qInfo of qInfoArray) {
                // construct new questioninfo objects
                returnSet.push(new QuestionInfoOutput(
                    qInfo.id,
                    qInfo.question,
                    this.extractNumber(qInfo.totalVoters),
                    qInfo.hasVoted
                    ));
                }
                
                // update questions count on the fly
                PlatformStore.updateQuestionsCount(qInfoArray.length);
            } catch (err) {
                this.rethrowIfNoSignerError(err);
                console.log("<PlatformContract::Error> Getting questions errored. Reason:", err);
                throw new ContractError(err.message);
            }
        
        return Promise.resolve(returnSet);   
    }

    /**
     * Tries to get question metadata for given question ID
     * @param id ID of a question to get data for
     * @returns `QuestionInfoOutput` containing data
     * @throws `NoSignerError` if there's no current signer
     * @throws `ContractError` if any other contract error occurs
     */
    async getQuestionInfo(id: number): Promise<QuestionInfoOutput> {
        try{
            this.platformContract = Provider.fabricateContract();
            const qInfo: QuestionInfoOutput = await this.platformContract.getQuestionInfo(id);
            return Promise.resolve(qInfo);
        } catch (err) {
            this.rethrowIfNoSignerError(err);
            console.log(`<PlatformContract::Error> Getting question id: ${id} errored. Reason:`, err);
            throw new ContractError(err.message);
        }
    }

    /**
     * Tries to add a new question to the platform
     * @param questionTitle Title of new question
     * @param labels Array of `string[]` containing question voting options
     * @throws `NoSignerError` if there's no current signer
     * @throws `ContractError` if any other contract error occurs
     * @returns Confirmed trasaction hash
     */
    async addNewQuestion(questionTitle: string, labels: string[]): Promise<string> {
        try {
            this.platformContract = Provider.fabricateContract();
            // execute contract method and await for receipt
            const addQResponse = await this.platformContract.addQuestion(questionTitle, labels);
            const txHash = await this.confirmReceipt(addQResponse);
            return Promise.resolve(txHash);
        } catch (err) {
            this.rethrowIfNoSignerError(err);
            console.log("<PlatformContract::Error> Creating new question errored. Reason:", err);
            throw new ContractError(err.message);
        }
    }
    
    /**
     * Performs a voting procedure for on a given question
     * @param questionID ID of a question to vote for
     * @param score Voting option [0...4]
     * @throws `NoSignerError` if there's no current signer
     * @throws `ContractError` if any other contract error occurs
     * @returns Confirmed trasaction hash
     */
    async vote(questionID: number, score: number): Promise<string> {
        try {
            this.platformContract = Provider.fabricateContract();
            // execute contract method and await for receipt
            const voteResult = await this.platformContract.vote(questionID, score);
            const txHash = await this.confirmReceipt(voteResult);
            return Promise.resolve(txHash);
        } catch (err) {
            this.rethrowIfNoSignerError(err);
            console.log(`<PlatformContract::Error> Vote errored. Reason:`, vote_error);
            throw new ContractError(err.message);
        }
    }

    /**
     * Performs `extra` voting option over specific question
     * @param questionID ID of a question to provide extra options for
     * @param extraScore Value of the extra score (0...2)
     * @throws NoSignerException in case of errors
     * @throws `ContractError` if any other contract error occurs
     * @returns Confirmed trasaction hash
     */
    async provideExtra(questionID: number, extraScore: number): Promise<string> {
        try {
            this.platformContract = Provider.fabricateContract();

            // execute contract method and await for receipt
            const voteResult = await this.platformContract.voteExtra(questionID, extraScore);
            const txHash = await this.confirmReceipt(voteResult);
            return Promise.resolve(txHash);
        } catch (err) {
            this.rethrowIfNoSignerError(err);
            console.log(`<PlatformContract::Error> Extra voting options errored. Reason:`, e);
            throw new ContractError(err.message);
        }
    }
}

const Contract = new PlatformContract();
export default Contract;