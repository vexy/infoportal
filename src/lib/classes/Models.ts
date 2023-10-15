export class QuestionMeta {
    public owner: string;
    public title: string;
    public labels: string[];
    public scores: number[];
    public extras: number[];

    constructor(_owner: string, _title: string, _labels: string[], _scores: number[], _extras: number[]) {
        this.owner = _owner;
        this.title = _title;
        this.labels = _labels;
        this.scores = _scores;
        this.extras = _extras;
    }
}

export class QuestionInfoOutput {
    public id: number;
    public question: QuestionMeta;
    public totalVoters: number;
    public hasVoted: boolean;

    constructor(_id: number, _question: QuestionMeta, totalVoters: number, hasVoted: boolean) {
        this.id = _id;
        this.question = _question;
        this.totalVoters = totalVoters;
        this.hasVoted = hasVoted;
    }

    static default(): QuestionInfoOutput {
        return new QuestionInfoOutput(0, new QuestionMeta("", "", [], [], []) , 0, false);
    }
}

export class ScoresTransformer {
    public scoresRatio: number[] = [];
    public extrasRatio: number[] = [];

    constructor(questionInfo: QuestionInfoOutput) {
        // calculate scores vs total voters for each vote option
        this.scoresRatio = questionInfo.question.scores.map((aScore) => {
            return (aScore / questionInfo.totalVoters) * 100;
        })
        // calculate extras vs total voters for each extra option
        this.extrasRatio = questionInfo.question.extras.map((extraScore) => {
            return (extraScore / questionInfo.totalVoters) * 100;
        })
    }

    /**
     * @returns String containing text ready to be shared on social medias
     */
    public formulateShareText(questionInfo: QuestionInfoOutput): string {
        // get max score ratio
        const maxScoreRatio = Math.max(...this.scoresRatio);

        // pull out corresponding label index
        const maxIndex = this.scoresRatio.findIndex((v) => {v === maxScoreRatio});
        const topAnswerLabel = questionInfo.question.labels[maxIndex];
        
        return `Na pitanje '${questionInfo.question.title}' ${maxScoreRatio}% korisnika odgovara sa '${topAnswerLabel}'. Izvor: infoportal.app`;
    }
}

export class PlatformMeta {
    public totalUsers: number;
    public totalQuestions: number;
    public isRegistered: boolean;

    // provider related
    public hasMetamask = false;
    public isConnected = false;

    constructor(
        _totalUsers: number,
        _totalQuestions: number,
        _isRegistered: boolean,
        _hasMetamask: boolean,
        _isConnected: boolean
    ){
        this.totalUsers = _totalUsers;
        this.totalQuestions = _totalQuestions;
        this.isRegistered = _isRegistered;
        this.hasMetamask = _hasMetamask;
        this.isConnected = _isConnected;
    }
}