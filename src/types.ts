export type LimitHand = {
	name: string;
	han: string;
	baseValue: number;
}

export type AppState = {
	isDealer: boolean;
	isDelta: boolean;
	repeatCount: number;
}

export type AppActions = {
	setIsDealer: (isDealer: boolean) => void;
	setIsDelta: (isDelta: boolean) => void;
	setRepeatCount: (repeatCount: number) => void;
}
