import { RANK_LABELS } from './const'

export type Replace<T, U> = Omit<T, keyof U> & U

export type LimitHand = {
	name: string;
	han: number;
	hanLabel: string;
	baseValue: number;
}

export type PointComponents = {
	key: string;
	han: number;
	fu: number;
	baseValue: number;
}

export type Condition = {
	simpleRon: PointComponents | null;
	directRon: PointComponents | null;
	tsumo: PointComponents | null;
}

export type PointCalculation = {
	oyaRon: number;
	koRon: number;
	oyaTsumo: number;
	koTsumo: number;
	oyaGainsByRon: number;
	oyaGainsByTsumo: number;
	koGainsByRon: number;
	koGainsVsOyaByTsumo: number;
	koGainsVsKoByTsumo: number;
}

export type Score = number | null
export type Rank = typeof RANK_LABELS[number]

export type RankedDelta = {
	delta: Score;
	rankIndex: number | null;
}

export type ScoreState = {
	scores: Score[];
	dealerIndex: number;
	repeatCount: number;
	leftoverCount: number;
}

export type AppState = ScoreState & {
	isDealer: boolean;
	isDelta: boolean;
	isLightMode: boolean;
	isMenuOpen: boolean;
	isResetting: boolean;
}

export type AppActions = {
	setIsDealer: (isDealer: boolean) => void;
	setIsDelta: (isDelta: boolean) => void;
	setIsLightMode: (isLightMode: boolean) => void;
	setIsMenuOpen: (isMenuOpen: boolean) => void;
	setRepeatCount: (repeatCount: number) => void;
	setLeftoverCount: (leftoverCount: number) => void;
	setDealerIndex: (dealerIndex: number) => void;
	setScore: (index: number, score: number | null) => void;
	setPovIndex: (index: number) => void;
	setIsResetting: (isResetting: boolean) => void;
	resetComparison: (score: Score) => void;
}
