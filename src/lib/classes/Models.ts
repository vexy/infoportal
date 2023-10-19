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
    public shareText = '';

    constructor(questionInfo: QuestionInfoOutput) {
        let maxScoreRatio = 0;
        let maxScoreLabel = '';

        // calculate score vs total voters and max score
        for(let idx = 0; idx < questionInfo.question.scores.length; idx++) {
            // calculate scores vs total voters
            const scoreRatio = (questionInfo.question.scores[idx] / questionInfo.totalVoters) * 100;
            this.scoresRatio.push(scoreRatio);

            // check for biggest score and coresponding label
            if(scoreRatio > maxScoreRatio) {
                maxScoreRatio = scoreRatio;
                maxScoreLabel = questionInfo.question.labels[idx];
            }
        }
        //
        this.shareText = this.formulateShareText(questionInfo.question.title, maxScoreRatio, maxScoreLabel);

        // calculate extras vs total voters for each extra option
        this.extrasRatio = questionInfo.question.extras.map((extraScore) => {
            return (extraScore / questionInfo.totalVoters) * 100;
        })
    }

    /**
     * @returns String containing text ready to be shared on social medias
     */
    public formulateShareText(title: string, topScore: number, topOption: string): string {
        const roundedScore = topScore.toFixed(1);
        return `Na pitanje "${title}" ${roundedScore}% korisnika platforme odgovara sa '${topOption}'.\n\nIzvor: https://infoportal.app`;
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